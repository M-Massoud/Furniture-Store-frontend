import { useState } from 'react';
import axiosInstance from '../../network/Config';
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';

// props
function EditAdminProfileForm(props) {
   
    const [formDetails, setFormDetails] = useState({
    firstName: props.location.state.firstName ,
    lastName: props.location.state.lastName ,
   
    
  });
  const [formError, setFormerror] = useState({
    firstNameError: '',
    lastNameError: '',
   
  });
  function handelFormchange(e) {
    // console.log(e.target.id, e.target.value,formDetails);
    setFormDetails({
      ...formDetails,
      [e.target.id]: e.target.value,
    });
    ErrorHandling(e.target.id, e.target.value);
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
  const editAdminData = () => {
    axiosInstance
      .put(
        `/admin`,
     {
          id: token.id, 
          firstName: formDetails.firstName,   
          lastName: formDetails.lastName,
         
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
    // let imgURl = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
    // let phonPatern = new RegExp("[0-9]");
    let namePatern =new RegExp(/^[A-Z]+$/i);
    switch (input) {
      //regex = new Regex("[0-9]");

      case 'firstName':
        setFormerror({
          ...formError,
          firstNameError: value.length === 0 ? 'This field is required' : !namePatern.test(value) ? "FirstName must be Characters with no spacing": value.length < 3 ? "FirstName should not be less than (3) characters" : "",
        });
        break;
      case 'lastName':
        setFormerror({
          ...formError,
          lastNameError: value.length === 0 ? 'This field is required' : !namePatern.test(value) ? "FirstName must be Characters with no spacing" :value.length < 3 ? "lastName should not be less than (3) characters" : "",
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
                      value={token.id }
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
          
          <div className="border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap">
            <input
              type="submit"
              value={'Edit'}
              className="btn btn-success col-8 mt-2 col-sm-5 col-md-3"
              onClick={() => editAdminData()} />  
           
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAdminProfileForm;
