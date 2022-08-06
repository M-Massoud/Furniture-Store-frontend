import { useState } from 'react';
import axiosInstance from '../../network/Config';
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';

// props
function EditUserProfileForm(props) {
   
    const [formDetails, setFormDetails] = useState({
      userID:props.location.state._id,
    firstName: props.location.state.firstName ,
    lastName: props.location.state.lastName ,
    userPhone:  props.location.state.mobile,
    street: props.location.state.address.street,
    city: props.location.state.address.city,
    building: props.location.state.address.building ,
    cardType: props.location.state.payment.cardType,
    cardNumber: props.location.state.payment.cardNumber
    
  });
  const [formError, setFormerror] = useState({
    firstNameError: '',
    lastNameError: '',
    userPhoneError: '',
    streetError: '',
    cityError: "",
    buildingError: "",
    cardTypeError: "",
    cardNumberError: "",
  });
  function handelFormchange(e) {
    // console.log(e.target.id, e.target.value,formDetails);
    setFormDetails({
      ...formDetails,
      [e.target.id]: e.target.value,
    });
    ErrorHandling(e.target.id, e.target.value);
    // console.log(formDetails);
  } // handelFormchange function
  const handleSubmit = e => {
    console.log(e)
    let message = [];
    for (let item in formError) {
      message.push(formError[item])
    }
    console.log(message.length);
    for (let i of message ){
      if (message[i] !== "" ) {
        e.preventDefault();
      }
    }
    
  }; //handleSubmit function
  // console.log(formError.firstNameError)
  const editUserData = () => {

    // return if there's any errors
    for (let index = 0; index <  Object.values(formError).length; index++) {
      if( Object.values(formError)[index] ) return          
     }

    axiosInstance
      .put(
        `/user/${token.id}`,
     {
          id: token.id, 
          firstName: formDetails.firstName,   
          lastName: formDetails.lastName,
          mobile: formDetails.userPhone,
          address: {
            "city": formDetails.city,
              "street":formDetails.street,
              "building":formDetails.building
         },
         payment: {
             'cardType': formDetails.cardType, 'cardNumber': formDetails.cardNumber
         },
         
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(res => console.log('Done'))
      .catch(error => console.log(error, formDetails));
  }; // Editing func
  /////////////////////////////////////////////
  const ErrorHandling = (input, value) => {
    let phonPatern = new RegExp("[0-9]");
    let namePatern =new RegExp(/^[A-Z]+$/i);
    switch (input) {
      //regex = new Regex("[0-9]");

      case 'firstName':
        setFormerror({
          ...formError,
          firstNameError: value.length === 0 ? 'This field is required' : !namePatern.test(value) ? "FirstName must be Characters with no spacing": value.length < 3 ? "FirstName should not be less than (3) characters" : value.length > 12 ?  "FirstName should not be less than (12) characters" :""
        });
        break;
      case 'lastName':
        setFormerror({
          ...formError,
          lastNameError: value.length === 0 ? 'This field is required' : !namePatern.test(value) ? "FirstName must be Characters with no spacing" :value.length < 3 ? "lastName should not be less than (3) characters" : value.length > 12 ?  "last name should not be less than (12) characters" :"",
        });
        break;
      case 'userPhone':
        setFormerror({
          ...formError,
          userPhoneError: value.length === 0 ? 'This field is required' : !phonPatern.test(value) ? "Phone Number must be Numbers" : value.length < 10 || value.length > 14 ? "Phone Number Should be between 10 and 14 length" : "",
        });
        break;
      case 'street':
        setFormerror({
          ...formError,
          streetError: value.length === 0 ? 'This field is required' : '',
        });
            break;
        case 'city':
                setFormerror({
                  ...formError,
                  cityError: value.length === 0 ? 'This field is required' : '',
                });
        break;
        case 'building':
                setFormerror({
                  ...formError,
                  buildingError: value.length === 0 ? 'This field is required' : '',
                });
            break;
            case "cardType":
                setFormerror({
                    ...formError,
                    cardTypeError: value.length === 0 ? "This field is required" : "",
                });
                break;
            case "cardNumber":
                setFormerror({
                    ...formError,
                    cardNumberError: value.length === 0 ? "This field is required" : /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value) ? "" : "Field must be at banking card numbers format",
                });
                break;
      default:
        setFormerror({
          ...formError,
        });
    } //value.length === 0 ? "This field is required" : "",
  }; // ErrorHandling function
  ////////////////////////////////////////////////
  return (
    <>
      <div className="col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-4 col-lg-6 m-lg-auto my-lg-4">
        <h3 className="text-center mt-2"> User Profile Edit form </h3>
        <form
          className={`co-12  row m-auto `}
          onSubmit={e => handleSubmit(e)}
          encType="multipart/form-data" >
          {/* //// */}
          <label htmlFor="userId" className="form-label mt-2">
            User ID
          </label>
          <input
            type="text"
                      value={formDetails.userID }
            disabled
            id={'userId'}
            name={'userId'}
            className={`form-control `}
            onChange={e => handelFormchange(e)}/>
          {/* //// */}
          <label htmlFor="firstName" className="form-label mt-2">
            First Name
          </label>
          <input
            type="text"
            id={'firstName'}
            name={'firstName'}
            value={formDetails.firstName}
            className={`form-control ${
              formError.firstNameError && 'border-danger'} `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.firstNameError}
          </div>
          {/* //// */}
          <label htmlFor="lastName" className="form-label mt-2">
            Last Name
          </label>
          <input
            type="text"
            id={'lastName'}
            name={'lastName'}
            value={formDetails.lastName}
            className={`form-control ${
              formError.lastNameError && 'border-danger'} `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.lastNameError}
          </div>
          {/* ////// */}
          <label htmlFor="userPhone" className="form-label mt-2">
           User Phone
          </label>
          <input
            type="text"
            id={'userPhone'}
            name={'userPhone'}
            value={formDetails.userPhone}
            className={`form-control ${
              formError.userPhoneError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.userPhoneError}
          </div>
          {/* //// */}
          <label htmlFor="street" className="form-label   mt-2 mb-2">
           Street Name
          </label>
          <input
            type="text"
            id={'street'}
            name={'street'}
            value={formDetails.street}
            className={`form-control ${
              formError.streetError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}
          />
          <div id="nameHelp" className="form-text text-danger">
            {formError.streetError}
          </div>
          {/* //// */}
          <label  htmlFor='city' className="form-label  mt-2 mb-2" value={formDetails.city}> City Name </label >
          <input
            type="text"
            id="city"
            name="city"
            value={formDetails.city}
            className={`form-control mb-2 ${
              formError.cityError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}  />
          {/* //// */}
          <label htmlFor="building" className="form-label  mt-2 ">
            Building Number
          </label>
          <input
            type="number"
            min={1}
            id="building"
            name="building"
            value={formDetails.building}
            className={`form-control mb-2 ${
              formError.buildingError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)} />
          <div id="nameHelp" className="form-text text-danger">
            {formError.buildingError}
          </div>
                  {/* //// */}
                  <div className="mb-3 col-6">
                  <label htmlFor="cardType" className="form-label font-bold">Card Type</label>
                        <select className={`form-select ${formError.cardTypeError ? "is-invalid" : ""}`} name="cardType" id='cardType' aria-describedby="cardTypeHelp" value={formDetails.cardType}  onChange={ (e)=> handelFormchange(e)} required>  
                            <option value="visa">Visa</option>
                            <option value="mastercard">Master Card</option>
                            <option value="meza">Meza</option>
                        </select>
                        <div id="cardTypeHelp" className="form-text text-danger">{formError.cardTypeError}</div>
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="cardNumber" className="form-label font-bold">Card Number</label>
                      <input type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" className={`form-control ${formError.cardNumberError ? "is-invalid" : ""}`} name="cardNumber" id="cardNumber" aria-describedby="cardNumberHelp" value={formDetails.cardNumber} onChange={ (e)=> handelFormchange(e)}  required />
                        <div id="cardNumberHelp" className="form-text text-danger">{formError.cardNumberError}</div>
                    </div>
           {/* //// */}
          <div className="border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap">
            <input
              type="submit"
              value={'Edit'}
              className="btn btn-success col-8 mt-2 col-sm-5 col-md-3"
              onClick={() => editUserData()} />  
           
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserProfileForm;
