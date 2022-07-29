import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../network/Config";
import './RegisterationAdminComponentStyle.css';

export default function RegisterationAdminForm() {

    const history = useHistory();

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        adminEmail: "",
        adminPassword: "",
        adminPasswordConfirm: "",
    });

    const [registerDataErrors, setRegisterDataErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        adminEmailError: "",
        adminPasswordError: "",
        adminPasswordConfirmError: "",
    });

    const [isShownPassword, setIsShownPassword] = useState(false);
    const [isShownConfitmPassword, setIsShownConfitmPassword] = useState(false);

    function changeRegisterData(event) {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        });
        handleValidation(event.target.name, event.target.value);
    }

    function tooglePasswordEncrypt() {
        isShownPassword ? setIsShownPassword(false) : setIsShownPassword(true);
    }

    function toogleConfirmPasswordEncrypt() {
        isShownConfitmPassword ? setIsShownConfitmPassword(false) : setIsShownConfitmPassword(true);
    }

    function handleValidation(name, value) {
        switch (name) {
            case "firstName":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    firstNameError: value.length === 0 ? "This field is required" : /^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/.test(value) ? "" : "Field must be characters only",
                });
                break;
            case "lastName":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    lastNameError: value.length === 0 ? "This field is required" : /^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/.test(value) ? "" : "Field must be characters only",
                });
                break;
            case "adminEmail":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    adminEmailError: value.length === 0 ? "This field is required" : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "" : "Field must be at email format",
                });
                break;
            case "adminPassword":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    adminPasswordError: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) ? "" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            case "adminPasswordConfirm":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    adminPasswordConfirmError: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) ? (registerData.adminPassword === value) ? "" : "Must Match Previous Password" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            default:
                setRegisterDataErrors({
                    ...registerDataErrors,
                });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post("/admin", {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.adminEmail,
            password: registerData.adminPassword,
        },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            },
        )
            .then((response) => {
                history.push('/');
            })
            .catch((error) => {
                (error.response.data.message).includes('email_1 dup key') ? setRegisterDataErrors({ ...registerDataErrors, adminEmailError: 'email registered before' }) : setRegisterDataErrors({ ...registerDataErrors });
                switch (error.response.data.message) {
                    case "Internal ErrorError: firstName length should be between 1 and 12 numbers ":
                        {
                            setRegisterDataErrors({
                                ...registerDataErrors,
                                firstNameError: 'firstName length should be between 1 and 12 numbers',
                            });
                        }
                        break;
                    case "Internal ErrorError: lastName length should be between 1 and 12 numbers ":
                        {
                            setRegisterDataErrors({
                                ...registerDataErrors,
                                lastNameError: 'lastName length should be between 1 and 12 numbers',
                            });
                        }
                        break;
                    default:
                        setRegisterDataErrors({
                            ...registerDataErrors,
                        });
                }
            })
    }
    return (
        <div className="col-md-9 mx-auto my-5 p-5 border-1 shadow-lg rounded">
            <h2 className="text-main mb-5">Create New Admin Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label font-bold">First Name</label>
                    <input type="text" className={`form-control ${registerDataErrors.firstNameError ? "is-invalid" : ""}`} name="firstName" aria-describedby="firstNameHelp" value={registerData.firstName} onChange={(event) => { changeRegisterData(event) }} required />
                    <div id="firstNameHelp" className="form-text text-danger">{registerDataErrors.firstNameError}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label font-bold">Last Name</label>
                    <input type="text" className={`form-control ${registerDataErrors.lastNameError ? "is-invalid" : ""}`} name="lastName" aria-describedby="lastNameHelp" value={registerData.lastName} onChange={(event) => { changeRegisterData(event) }} required />
                    <div id="lastNameHelp" className="form-text text-danger">{registerDataErrors.lastNameError}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="adminEmail" className="form-label font-bold">Email Address</label>
                    <input type="email" className={`form-control ${registerDataErrors.adminEmailError ? "is-invalid" : ""}`} name="adminEmail" aria-describedby="adminEmailHelp" value={registerData.email} onChange={(event) => { changeRegisterData(event) }} placeholder="example@email.com" required />
                    <div id="adminEmailHelp" className="form-text text-danger">{registerDataErrors.adminEmailError}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="adminPassword" className="form-label font-bold">Password</label>
                    <div className="input-group relativePosition">
                        <input type={isShownPassword ? "text" : "password"} className={`form-control ${registerDataErrors.adminPasswordError ? "border-danger" : ""}`} name="adminPassword" aria-describedby="adminPasswordHelp" value={registerData.password} onChange={(event) => { changeRegisterData(event) }} required />
                        {isShownPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} />}
                    </div>
                    <div id="adminPasswordHelp" className="form-text text-danger">{registerDataErrors.adminPasswordError}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="adminPasswordConfirm" className="form-label font-bold">Confirm Password</label>
                    <div className="input-group relativePosition">
                        <input type={isShownConfitmPassword ? "text" : "password"} className={`form-control ${registerDataErrors.adminPasswordConfirmError ? "border-danger" : ""}`} name="adminPasswordConfirm" aria-describedby="adminPasswordConfirmHelp" value={registerData.confirmPassword} onChange={(event) => { changeRegisterData(event) }} required />
                        {isShownConfitmPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} />}
                    </div>
                    <div id="adminPasswordConfirmHelp" className="form-text text-danger">{registerDataErrors.adminPasswordConfirmError}</div>
                </div>
                <button type="submit" className="btn white bg-secondary-1">Create An Account</button>
            </form>
        </div>
    );
}