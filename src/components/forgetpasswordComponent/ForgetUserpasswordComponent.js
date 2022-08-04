import { useState } from 'react';
function ForgetUserPasswordPage(props) {
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        userEmail:"",
        userPassword: "",
        userPhon:""
    });
    const [formError, setFormerror] = useState({
        firstNameError: '',
        lastNameError: '',
        userEmailError: '',
        userPasswordError: '',
        userPhonError:''
        
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

        let phonPatern = new RegExp("[0-9]");
        let namePatern = new RegExp(/^[A-Z]+$/i);
        let emailPatern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
        let passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/im)
        switch (input) {
            //regex = new Regex("[0-9]");
            case 'firstName':
                setFormerror({
                    ...formError,
                    firstNameError: value.length === 0 ? "This field is required" : namePatern.test(value) ? "":"FirstName must be Characters",
                });
                break;
            case 'lastName':
                    setFormerror({
                        ...formError,
                        lastNameError: value.length === 0 ? "This field is required" : namePatern.test(value) ? "":"LastName must be Characters",
                    });
                break;
            case 'userEmail':
                    setFormerror({
                        ...formError,
                        userEmailError: value.length === 0 ? "This field is required": emailPatern.test(value) ?  "" : "Email must be in form (example@gmail.com)"  ,
                    });
                break;
            case 'userPassword':
                    setFormerror({
                        ...formError,
                        userPasswordError: value.length === 0 ? "This field is required" :  passwordPattern.test(value) ? " ":" Password must be strong in form (Test25!)",
                    });
                break;
                case 'userPhon':
                    setFormerror({
                        ...formError, 
                        userPhonError: value.length === 0 ? "This field is required" : !phonPatern.test(value) ? "Phone Number must be Numbers" : value.length > 11 ? "Phone Number Should not be greater than 11 number": "",
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
            <div className='p-5 border m-auto row container-fluid'>
               
                <form className={`col-12 col-sm-10 col-md-8 col-lg-5 p-5  row m-auto border shadow rounded `} onSubmit={(e) => handleSubmit(e)}>
                <h4 className='border text-center shadow rounded p-2 mb-3'> Creat New password</h4>
                                  <label  htmlFor='firstName' className="form-label mt-2"> First Name</label >
                <input type='text' id={'firstName'} name={'firstName'} className={`form-control ${formError.firstNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.firstNameError}</div>
                                  <label  htmlFor='lastName' className="form-label   mt-2 mb-2"> Last Name</label >
                <input type='text' id={'lastName'} name={'lastName'} className={`form-control ${formError.lastNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.lastNameError}</div>
                                  <label  htmlFor='userEmail' className="form-label  mt-2 mb-2"> User Email</label >
                    <input type='email' id={'userEmail'} name={'userEmail'} className={`form-control ${formError.userEmailError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.userEmailError}</div>
                                  <label  htmlFor='userPassword' className="form-label  mt-2 mb-2"> New Password</label >
                <input type='password' id={'userPassword'} name={'userPassword'} className={`form-control `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.userPasswordError}</div>

                                  <label  htmlFor='userPhon' className="form-label  mt-2 "> Phone Number</label >
                <input type='text' id='userPhon' name='userPhon' className={`form-control mb-2 ${formError.userPhonError && "border-danger"} `} placeholder="01000000000" onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.userPhonError}</div>
                    <button className='btn btn-success col-4 m-auto fw-bolder mt-4'> Creat </button>
                              </form>

            </div>
            
        
        </>
    );
    
};

export default ForgetUserPasswordPage;