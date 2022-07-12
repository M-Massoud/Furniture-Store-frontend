import { useState } from 'react';
function Form(props) {
    const [formDetails, setFormDetails] = useState({
        fname: "",
        lname: "",
        street: "",
        city: "",
        phone:""
    });
    const [formError, setFormerror] = useState({
        fnameError: '',
        lnameError: '',
        streetError: '',
        cityError: '',
        phoneError:''
        
    });
    function handelFormchange(e) {
        // console.log(e.target.id, e.target.value);
        // console.log(formDetails)
        setFormDetails({
            ...formDetails,
            [e.target.id]: e.target.value
        });
       ErrorHandling(e.target.id, e.target.value);
    };// handelFormchange function
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formDetails);
    };//handleSubmit function
    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => {

        let phonPatern =new RegExp("[0-9]");
        switch (input) {
            //regex = new Regex("[0-9]");
            case 'fname':
                setFormerror({
                    ...formError,
                    fnameError: value.length === 0 ? "This field is required" : "",
                });
                break;
            case 'lname':
                    setFormerror({
                        ...formError,
                        lnameError: value.length === 0 ? "This field is required" : "",
                    });
                break;
            case 'street':
                    setFormerror({
                        ...formError,
                        streetError: value.length === 0 ? "This field is required": "" ,
                    });
                break;
            case 'city':
                    setFormerror({
                        ...formError,
                        cityError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'phone':
                    setFormerror({
                        ...formError, 
                        phoneError: value.length === 0 ? "This field is required" : phonPatern.test(value) ? "" : "Phone number must be Numbers",
                    });
                break;
            default:
                setFormerror({
                    ...formError
                })
        }  //value.length === 0 ? "This field is required" : "",
    }// ErrorHandling function
    ////////////////////////////////////////////////
    return (
        <>
            <form className={`co-12  row m-auto ${props.hide? "d-none":""} ${props.hide2? "d-none":""}` }  onSubmit={(e)=> handleSubmit(e)}>
                                  <label  htmlFor='fname' className="form-label mt-2"> First Name</label >
                <input type='text' id={'fname'} name={'fname'} className={`form-control ${formError.fnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.fnameError}</div>
                                  <label  htmlFor='lname' className="form-label   mt-2 mb-2"> Last Name</label >
                <input type='text' id={'lname'} name={'lname'} className={`form-control ${formError.lnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.lnameError}</div>
                                  <label  htmlFor='street' className="form-label  mt-2 mb-2"> Street Address</label >
                <input type='text' id={'street'} name={'street'} className={`form-control ${formError.streetError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.streetError}</div>
                                  <label  htmlFor='city' className="form-label  mt-2 mb-2"> City </label >
                                  <select className={ `form-select ${formError.cityError && "border-danger" } `} id={'city'} name={'city'}   onChange={ (e)=> handelFormchange(e)}>
                                         <option value="Cairo">Open this select menu</option>
                                         <option value="Dammietta">Dammietta</option>
                                         <option value="Mansaura">Mansaura</option>
                                          <option value="Cairo">Cairo</option>
                                          <option value="Alexandria">Alexandria</option>
                                          <option value="Aswan">Aswan</option>
                                          <option value="Minia">Minia</option>
                </select>
                <div id="nameHelp" className="form-text text-danger">{formError.cityError}</div>

                                  <label  htmlFor='phone' className="form-label  mt-2 "> Phone Number</label >
                <input type='text' id='phone' name='phone' className={`form-control mb-2 ${formError.phoneError && "border-danger"} `} placeholder="01000000000" onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.phoneError}</div>
                              </form>
        
        </>
    );
    
};

export default Form;