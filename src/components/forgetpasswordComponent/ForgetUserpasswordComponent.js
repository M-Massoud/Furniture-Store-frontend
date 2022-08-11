import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgetUserPasswordPage({ title }) {
    document.title = title;
    const history = useHistory();

    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        userPhone: "",
        userEmail: "",
        userPassword: "",
        userPasswordConfirm: "",
    });

    const [formError, setFormerror] = useState({
        firstNameError: '',
        lastNameError: '',
        userEmailError: '',
        userPhoneError: '',
        userPasswordError: '',
        userPasswordConfirmError: "",
    });

    const [isShownPassword, setIsShownPassword] = useState(false);
    const [isShownConfitmPassword, setIsShownConfitmPassword] = useState(false);

    function tooglePasswordEncrypt() {
        isShownPassword ? setIsShownPassword(false) : setIsShownPassword(true);
    }

    function toogleConfirmPasswordEncrypt() {
        isShownConfitmPassword ? setIsShownConfitmPassword(false) : setIsShownConfitmPassword(true);
    }

    function handelFormchange(e) {
        setFormDetails({
            ...formDetails,
            [e.target.id]: e.target.value
        });
        ErrorHandling(e.target.id, e.target.value);
    };// handelFormchange function

    const ErrorHandling = (id, value) => {

        let namePatern = new RegExp(/^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/);
        let emailPatern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
        let passwordPattern = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/);
        let phonPatern = new RegExp(/^01[0125][0-9]{8}$/);

        switch (id) {
            case 'firstName':
                setFormerror({
                    ...formError,
                    firstNameError: value.length === 0 ? "This field is required" : namePatern.test(value) ? "" : "FirstName must be Characters",
                });
                break;
            case 'lastName':
                setFormerror({
                    ...formError,
                    lastNameError: value.length === 0 ? "This field is required" : namePatern.test(value) ? "" : "LastName must be Characters",
                });
                break;
            case 'userPhone':
                setFormerror({
                    ...formError,
                    userPhoneError: value.length === 0 ? "This field is required" : !phonPatern.test(value) ? "Phone Number must be Numbers" : "",
                });
                break;
            case 'userEmail':
                setFormerror({
                    ...formError,
                    userEmailError: value.length === 0 ? "This field is required" : emailPatern.test(value) ? "" : "Email must be in form (example@gmail.com)",
                });
                break;
            case 'userPassword':
                setFormerror({
                    ...formError,
                    userPasswordError: value.length === 0 ? "This field is required" : passwordPattern.test(value) ? "" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            case "userPasswordConfirm":
                setFormerror({
                    ...formError,
                    userPasswordConfirmError: value.length === 0 ? "This field is required" : passwordPattern.test(value) ? (formDetails.userPassword === value) ? "" : "Must Match Previous Password" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            default:
                setFormerror({
                    ...formError
                })
        }
    }// ErrorHandling function

    // validate the required values on submit
    const valdiateForm = () => {
        if (!formDetails.firstName)
            setFormerror({
                ...formError,
                firstNameError: "This field is required"
            });
        if (!formDetails.lastName)
            setFormerror({
                ...formError,
                lastNameError: "This field is required"
            });
        if (!formDetails.userPhone)
            setFormerror({
                ...formError,
                userPhoneError: "This field is required"
            });
        if (!formDetails.userEmail)
            setFormerror({
                ...formError,
                userEmailError: "This field is required"
            });
        if (!formDetails.userPassword)
            setFormerror({
                ...formError,
                userPasswordError: "This field is required"
            });
        if (!formDetails.userPasswordConfirm)
            setFormerror({
                ...formError,
                userPasswordConfirmError: "This field is required"
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        valdiateForm();
        for (let index = 0; index < Object.values(formError).length; index++) {
            if (Object.values(formError)[index]) return
        }
        axiosInstance
            .post('/forgotUserPassword', {
                firstName: formDetails.firstName,
                lastName: formDetails.lastName,
                email: formDetails.userEmail,
                mobile: formDetails.userPhone,
                newPassword: formDetails.userPassword,
            })
            .then(response => {
                Store.addNotification({
                    title: "Status",
                    message: "Password Reset Successfully, You Can Login Now",
                    type: "success",
                    container: "top-center",
                    dismiss: {
                        duration: 2000,
                    },
                });
                history.push('/login-user');
            })
            .catch(error => {
                Store.addNotification({
                    title: "Status",
                    message: `${error.response.data.message.split(':')[1]}`,
                    type: "danger",
                    container: "top-center",
                    dismiss: {
                        duration: 2000,
                    },
                });
                console.log(error);
            });
    };//handleSubmit function

    return (
        <>
            <div className='p-5 border m-auto row container-fluid'>
                <form className={`col-12 col-sm-10 col-md-8 col-lg-5 p-5  row m-auto border shadow rounded `} onSubmit={(e) => handleSubmit(e)}>
                    <h4 className='border text-center shadow rounded p-2 mb-3'>Forgot User password</h4>
                    <label htmlFor='firstName' className="form-label mt-2"> First Name</label >
                    <input type='text' id={'firstName'} name={'firstName'} className={`form-control ${formError.firstNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.firstNameError}</div>
                    <label htmlFor='lastName' className="form-label   mt-2 mb-2"> Last Name</label >
                    <input type='text' id={'lastName'} name={'lastName'} className={`form-control ${formError.lastNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.lastNameError}</div>
                    <label htmlFor='userPhone' className="form-label  mt-2 "> Phone Number</label >
                    <input type='text' id='userPhone' name='userPhone' className={`form-control mb-2 ${formError.userPhoneError && "border-danger"} `} placeholder="01000000000" onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.userPhoneError}</div>
                    <label htmlFor='userEmail' className="form-label mt-2 mb-2"> User Email</label >
                    <input type='email' id={'userEmail'} name={'userEmail'} className={`form-control ${formError.userEmailError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.userEmailError}</div>
                    <div className="form-group mb-3 p-0">
                        <label htmlFor='userPassword' className="form-label mx-3 mt-2 mb-2"> New Password</label >
                        <div className="input-group relativePosition">
                            <input type={isShownPassword ? "text" : "password"} className={`form-control ${formError.userPasswordError ? "border-danger" : ""}`} id={'userPassword'} name={'userPassword'} aria-describedby="userPasswordHelp" value={formDetails.userPassword} onChange={(event) => { handelFormchange(event) }} required />
                            {isShownPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} />}
                        </div>
                        <div id="nameHelp" className="form-text text-danger">{formError.userPasswordError}</div>
                    </div>
                    <div className="form-group mb-3 p-0">
                        <label htmlFor='userPasswordConfirm' className="form-label mx-3 mt-2 mb-2">Confirm New Password</label >
                        <div className="input-group relativePosition">
                            <input type={isShownConfitmPassword ? "text" : "password"} className={`form-control ${formError.userPasswordConfirmError ? "border-danger" : ""}`} id={'userPasswordConfirm'} name={'userPasswordConfirm'} aria-describedby="userPasswordConfirmHelp" value={formDetails.userConfirmPassword} onChange={(event) => { handelFormchange(event) }} required />
                            {isShownConfitmPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} />}
                        </div>
                        <div id="nameHelp" className="form-text text-danger">{formError.userPasswordConfirmError}</div>
                    </div>
                    <button className='btn btn-success col-4 m-auto fw-bolder mt-4'>Reset Password</button>
                </form>
            </div>
        </>
    );
};

export default ForgetUserPasswordPage;