import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loggedInSuccessfully } from '../../redux/isLoggedInRedux';
import { Store } from 'react-notifications-component';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './LoginAdminComponentStyle.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../network/Config';

export default function LoginAdminForm({ title }) {
  document.title = title;
  const location = useLocation();
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    adminEmail: '',
    adminPassword: '',
  });

  const [resData, setResData] = useState({});
  const [isAuthenticated, serIsAuthenticated] = useState(false);
  const dispatch = useDispatch();


  const [loginDataErrors, setLoginDataErrors] = useState({
    adminEmailError: '',
    adminPasswordError: '',
  });

  const [isShownPassword, setIsShownPassword] = useState(false);

  function changeLoginData(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
    handleValidation(event.target.name, event.target.value);
  }

  function tooglePasswordEncrypt() {
    isShownPassword ? setIsShownPassword(false) : setIsShownPassword(true);
  }

  function handleValidation(name, value) {
    switch (name) {
      case 'adminEmail':
        setLoginDataErrors({
          ...loginDataErrors,
          adminEmailError:
            value.length === 0
              ? 'This field is required'
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                ? ''
                : 'Field must be at email format',
        });
        break;
      case 'adminPassword':
        setLoginDataErrors({
          ...loginDataErrors,
          adminPasswordError:
            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value)
              ? ''
              : 'Password length must be at least 8 characters , contains at least one lowercase , one uppercase , at least one digit and special character',
        });
        break;
      default:
        setLoginDataErrors({
          ...loginDataErrors,
        });
    }
  }

  // validate the required values on submit
  const valdiateForm = () => {
    if (!loginData.adminEmail)
      setLoginDataErrors({
        ...loginDataErrors,
        adminEmailError: "This field is required"
      });
    if (!loginData.adminPassword)
      setLoginDataErrors({
        ...loginDataErrors,
        adminPasswordError: "This field is required"
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    valdiateForm();
    for (let index = 0; index < Object.values(loginDataErrors).length; index++) {
      if (Object.values(loginDataErrors)[index]) return
    }
    axiosInstance
      .post('/login-admin', {
        email: loginData.adminEmail,
        password: loginData.adminPassword,
      })
      .then(response => {
        Store.addNotification({
          title: "Status",
          message: "Successfully Logged In Admin",
          type: "success",
          container: "top-center",
          dismiss: {
            duration: 2000,
          },
        });
        setResData(response.data);
        serIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        history.push((location.state?.from.pathname) || '/');
        dispatch(loggedInSuccessfully("admin"))
      })
      .catch(error => {
        Store.addNotification({
          title: "Status",
          message: "Sorry, Unexpected Logged In Error",
          type: "danger",
          container: "top-center",
          dismiss: {
            duration: 2000,
          },
        });
        console.log(error);
        serIsAuthenticated(false);
      });
  }
  return (
    <div className="container">
      <div className="bg-main m-auto my-3 p-5 col-10 col-xl-5 border-custom shadow-lg">
        <h3 className="text-main mb-2">Login As Admin</h3>
        <h6 className="mb-4">
          If you have an account, sign in with your email address.
        </h6>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="adminEmail" className="form-label font-bold">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${loginDataErrors.adminEmailError ? 'border-danger' : ''
                }`}
              name="adminEmail"
              aria-describedby="adminEmailHelp"
              value={loginData.email}
              onChange={event => {
                changeLoginData(event);
              }}
              placeholder="example@email.com"
            />
            <div id="adminEmailHelp" className="form-text text-danger">
              {loginDataErrors.adminEmailError}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="adminPassword" className="form-label font-bold">
              Password
            </label>
            <div className="input-group relativePosition">
              <input
                type={isShownPassword ? 'text' : 'password'}
                className={`form-control ${loginDataErrors.adminPasswordError ? 'border-danger' : ''
                  }`}
                name="adminPassword"
                aria-describedby="adminPasswordHelp"
                value={loginData.password}
                onChange={event => {
                  changeLoginData(event);
                }}
              />
              {isShownPassword ? (
                <FaEye
                  className="overlay text-hover-red"
                  onClick={event => tooglePasswordEncrypt()}
                />
              ) : (
                <FaEyeSlash
                  className="overlay text-hover-red"
                  onClick={event => tooglePasswordEncrypt()}
                />
              )}
            </div>
            <div id="adminPasswordHelp" className="form-text text-danger">
              {loginDataErrors.adminPasswordError}
            </div>
          </div>
          <Link to={'/forgetAdminPassword'} className="btn mb-2 text-hover-red">
            Forgot Your Password?
          </Link>
          <button type="submit" className="btn bg-secondary-1 white col-12">
            Login
          </button>
          <p className="mt-3">
            Don't Have Account ?
          </p>
        </form>
        <Link
          to={'/register-admin'}
          className="btn bg-secondary-1 white mt-3 col-12"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
