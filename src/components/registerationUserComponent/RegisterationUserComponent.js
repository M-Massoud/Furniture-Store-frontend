import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../network/Config";
import './RegisterationUserComponentStyle.css';

export default function RegisterationUserForm({ title }) {
    document.title = title;
    const history = useHistory();

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        city: "",
        street: "",
        building: "",
        cardType: "visa",
        cardNumber: "",
        userEmail: "",
        userPassword: "",
        userPasswordConfirm: "",
    });

    const [registerDataErrors, setRegisterDataErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        mobileError: "",
        cityError: "",
        streetError: "",
        buildingError: "",
        cardTypeError: "",
        cardNumberError: "",
        userEmailError: "",
        userPasswordError: "",
        userPasswordConfirmError: "",
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
            case "mobile":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    mobileError: value.length === 0 ? "This field is required" : /^01[0125][0-9]{8}$/.test(value) ? "" : "Field must be at mobile format",
                });
                break;
            case "city":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    cityError: value.length === 0 ? "This field is required" : /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/.test(value) ? "" : "Field must be at city format",
                });
                break;
            case "street":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    streetError: value.length === 0 ? "This field is required" : "",
                });
                break;
            case "building":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    buildingError: value.length === 0 ? "This field is required" : /^[1-9]\d*(?: ?(?:[a-z]|[/-] ?\d+[a-z]?))?$/.test(value) ? "" : "Field must be building number",
                });
                break;
            case "cardType":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    cardTypeError: value.length === 0 ? "This field is required" : "",
                });
                break;
            case "cardNumber":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    cardNumberError: value.length === 0 ? "This field is required" : /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value) ? "" : "Field must be at banking card numbers format",
                });
                break;
            case "userEmail":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    userEmailError: value.length === 0 ? "This field is required" : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "" : "Field must be at email format",
                });
                break;
            case "userPassword":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    userPasswordError: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) ? "" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            case "userPasswordConfirm":
                setRegisterDataErrors({
                    ...registerDataErrors,
                    userPasswordConfirmError: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) ? (registerData.userPassword === value) ? "" : "Must Match Previous Password" : "Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character",
                });
                break;
            default:
                setRegisterDataErrors({
                    ...registerDataErrors,
                });
        }
    }

    // validate the required values on submit
    const valdiateForm = () => {

        if (!registerData.firstName)
            setRegisterDataErrors({
                ...registerDataErrors,
                firstNameError: "This field is required"
            });
        if (!registerData.lastName)
            setRegisterDataErrors({
                ...registerDataErrors,
                lastNameError: "This field is required"
            });
        if (!registerData.mobile)
            setRegisterDataErrors({
                ...registerDataErrors,
                mobileError: "This field is required"
            });
        if (!registerData.city)
            setRegisterDataErrors({
                ...registerDataErrors,
                cityError: "This field is required"
            });
        if (!registerData.street)
            setRegisterDataErrors({
                ...registerDataErrors,
                streetError: "This field is required"
            });
        if (!registerData.building)
            setRegisterDataErrors({
                ...registerDataErrors,
                buildingError: "This field is required"
            });
        if (!registerData.cardType)
            setRegisterDataErrors({
                ...registerDataErrors,
                cardTypeError: "This field is required"
            });
        if (!registerData.cardNumber)
            setRegisterDataErrors({
                ...registerDataErrors,
                cardNumberError: "This field is required"
            });
        if (!registerData.userEmail)
            setRegisterDataErrors({
                ...registerDataErrors,
                userEmailError: "This field is required"
            });
        if (!registerData.userPassword)
            setRegisterDataErrors({
                ...registerDataErrors,
                userPasswordError: "This field is required"
            });
        if (!registerData.userPasswordConfirm)
            setRegisterDataErrors({
                ...registerDataErrors,
                userPasswordConfirmError: "This field is required"
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        valdiateForm();
        for (let index = 0; index < Object.values(registerDataErrors).length; index++) {
            if (Object.values(registerDataErrors)[index]) return
        }
        axiosInstance.post("/users", {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.userEmail,
            password: registerData.userPassword,
            mobile: registerData.mobile,
            address: { 'city': registerData.city, 'street': registerData.street, 'building': registerData.building },
            payment: { 'cardType': registerData.cardType, 'cardNumber': registerData.cardNumber },
        })
            .then((response) => {
                history.push('/login-user');
            })
            .catch((error) => {
                console.log(error.response.data.message);
                (error.response.data.message).includes('email_1 dup key') ? setRegisterDataErrors({ ...registerDataErrors, userEmailError: 'email registered before' }) : setRegisterDataErrors({ ...registerDataErrors });
                (error.response.data.message).includes('mobile_1 dup key') ? setRegisterDataErrors({ ...registerDataErrors, mobileError: 'mobile registered before' }) : setRegisterDataErrors({ ...registerDataErrors });
                (error.response.data.message).includes('cardNumber_1 dup key') ? setRegisterDataErrors({ ...registerDataErrors, cardNumberError: 'card number registered before' }) : setRegisterDataErrors({ ...registerDataErrors });
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
                    case "Internal ErrorError: mobile length should be between 10 and 14  numbers ":
                        {
                            console.log("her");
                            setRegisterDataErrors({
                                ...registerDataErrors,
                                mobileError: 'mobile length should be between 10 and 14  numbers',
                            });
                        }
                        break;
                    case "Internal ErrorError: card type should be one of these ['visa','mastercard','meza'] ":
                        {
                            console.log("her");
                            setRegisterDataErrors({
                                ...registerDataErrors,
                                cardTypeError: "card type should be one of these ['visa','mastercard','meza']",
                            });
                        }
                        break;
                    case "Internal ErrorError: card number length should be 16 numbers ":
                        {
                            console.log("her");
                            setRegisterDataErrors({
                                ...registerDataErrors,
                                cardNumberError: 'card number length should be 16 numbers',
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
            <h2 className="text-main mb-5">Create Your Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label font-bold">First Name</label>
                    <input type="text" className={`form-control ${registerDataErrors.firstNameError ? "is-invalid" : ""}`} id="firstName" name="firstName" aria-describedby="firstNameHelp" value={registerData.firstName} onChange={(event) => { changeRegisterData(event) }} required />
                    <div id="firstNameHelp" className="form-text text-danger">{registerDataErrors.firstNameError}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label font-bold">Last Name</label>
                    <input type="text" className={`form-control ${registerDataErrors.lastNameError ? "is-invalid" : ""}`} id="lastName" name="lastName" aria-describedby="lastNameHelp" value={registerData.lastName} onChange={(event) => { changeRegisterData(event) }} required />
                    <div id="lastNameHelp" className="form-text text-danger">{registerDataErrors.lastNameError}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label font-bold">Mobile</label>
                    <input type="tel" className={`form-control ${registerDataErrors.mobileError ? "is-invalid" : ""}`} name="mobile" aria-describedby="mobileHelp" value={registerData.mobile} onChange={(event) => { changeRegisterData(event) }} placeholder="01234567891" required />
                    <div id="mobileHelp" className="form-text text-danger">{registerDataErrors.mobileError}</div>
                </div>
                <h4 className="my-3">Address</h4>
                <div className="row">
                    <div className="mb-3 col-4">
                        <label htmlFor="city" className="form-label font-bold">City</label>
                        <input type="text" className={`form-control ${registerDataErrors.cityError ? "is-invalid" : ""}`} name="city" aria-describedby="cityHelp" value={registerData.city} onChange={(event) => { changeRegisterData(event) }} required />
                        <div id="cityHelp" className="form-text text-danger">{registerDataErrors.cityError}</div>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="street" className="form-label font-bold">Street</label>
                        <input type="text" className={`form-control ${registerDataErrors.streetError ? "is-invalid" : ""}`} name="street" aria-describedby="streetHelp" value={registerData.street} onChange={(event) => { changeRegisterData(event) }} required />
                        <div id="streetHelp" className="form-text text-danger">{registerDataErrors.streetError}</div>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="building" className="form-label font-bold">Building</label>
                        <input type="number" className={`form-control ${registerDataErrors.buildingError ? "is-invalid" : ""}`} name="building" aria-describedby="buildingHelp" value={registerData.building} onChange={(event) => { changeRegisterData(event) }} required />
                        <div id="buildingHelp" className="form-text text-danger">{registerDataErrors.buildingError}</div>
                    </div>
                </div>
                <h4 className="my-3">Payment Card</h4>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="cardType" className="form-label font-bold">Card Type</label>
                        <select className={`form-select ${registerDataErrors.cardTypeError ? "is-invalid" : ""}`} name="cardType" aria-describedby="cardTypeHelp" value={registerData.cardType} onChange={(event) => { changeRegisterData(event) }} required>
                            <option value="visa">Visa</option>
                            <option value="mastercard">Master Card</option>
                            <option value="meza">Meza</option>
                        </select>
                        <div id="cardTypeHelp" className="form-text text-danger">{registerDataErrors.cardTypeError}</div>
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="cardNumber" className="form-label font-bold">Card Number</label>
                        <input type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" className={`form-control ${registerDataErrors.cardNumberError ? "is-invalid" : ""}`} name="cardNumber" aria-describedby="cardNumberHelp" value={registerData.cardNumber} onChange={(event) => { changeRegisterData(event) }} required />
                        <div id="cardNumberHelp" className="form-text text-danger">{registerDataErrors.cardNumberError}</div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label font-bold">Email Address</label>
                    <input type="email" className={`form-control ${registerDataErrors.userEmailError ? "is-invalid" : ""}`} id="userEmail" name="userEmail" aria-describedby="userEmailHelp" value={registerData.email} onChange={(event) => { changeRegisterData(event) }} placeholder="example@email.com" required />
                    <div id="userEmailHelp" className="form-text text-danger">{registerDataErrors.userEmailError}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userPassword" className="form-label font-bold">Password</label>
                    <div className="input-group relativePosition">
                        <input type={isShownPassword ? "text" : "password"} className={`form-control ${registerDataErrors.userPasswordError ? "border-danger" : ""}`} id="userPassword" name="userPassword" aria-describedby="userPasswordHelp" value={registerData.password} onChange={(event) => { changeRegisterData(event) }} required />
                        {isShownPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => tooglePasswordEncrypt()} />}
                    </div>
                    <div id="userPasswordHelp" className="form-text text-danger">{registerDataErrors.userPasswordError}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userPasswordConfirm" className="form-label font-bold">Confirm Password</label>
                    <div className="input-group relativePosition">
                        <input type={isShownConfitmPassword ? "text" : "password"} className={`form-control ${registerDataErrors.userPasswordConfirmError ? "border-danger" : ""}`} name="userPasswordConfirm" id="userPasswordConfirm" aria-describedby="userPasswordConfirmHelp" value={registerData.confirmPassword} onChange={(event) => { changeRegisterData(event) }} required />
                        {isShownConfitmPassword ? <FaEye className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} /> : <FaEyeSlash className="overlay text-hover-red" onClick={(event) => toogleConfirmPasswordEncrypt()} />}
                    </div>
                    <div id="userPasswordConfirmHelp" className="form-text text-danger">{registerDataErrors.userPasswordConfirmError}</div>
                </div>
                <button type="submit" className="btn white bg-secondary-1">Create An Account</button>
            </form>
        </div>
    );
}