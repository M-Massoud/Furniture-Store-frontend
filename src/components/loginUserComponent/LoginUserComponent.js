import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { loggedInSuccessfully } from '../../redux/isLoggedInRedux';
import { emptyCart, refreshCart } from "../../redux/cartRedux";
import { Store } from 'react-notifications-component';
import './LoginUserComponentStyle.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../network/Config';

export default function LoginForm() {
  const location = useLocation();
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const [resData, setResData] = useState({});
  const [isAuthenticated, serIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const [loginDataErrors, setLoginDataErrors] = useState({
    userEmailError: '',
    userPasswordError: '',
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
    console.log('toogle');
    isShownPassword ? setIsShownPassword(false) : setIsShownPassword(true);
  }

  function handleValidation(name, value) {
    switch (name) {
      case 'userEmail':
        setLoginDataErrors({
          ...loginDataErrors,
          userEmailError:
            value.length === 0
              ? 'This field is required'
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                ? ''
                : 'Field must be at email format',
        });
        break;
      case 'userPassword':
        setLoginDataErrors({
          ...loginDataErrors,
          userPasswordError:
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

  function handleSubmit(event) {
    event.preventDefault();
    axiosInstance
      .post('/login-user', {
        email: loginData.userEmail,
        password: loginData.userPassword,
      })
      .then(response => {
        Store.addNotification({
          title: "Status",
          message: "Successfully Logged In",
          type: "success",
          container: "top-center",
          dismiss: {
            duration: 2000,
          },
        });
        setResData(response.data);
        console.log(resData)
        serIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        history.push((location.state?.from.pathname) || '/');
        dispatch(loggedInSuccessfully("user"))
        dispatch(refreshCart());
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
      <div className="row flex-space-around my-5">
        <div className="bg-main m-3 p-5 col-10 col-xl-5 border-custom shadow-lg">
          <h3 className="text-main mb-2">Registered Customers</h3>
          <h6 className="mb-4">
            If you have an account, sign in with your email address.
          </h6>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label font-bold">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${loginDataErrors.userEmailError ? 'border-danger' : ''
                  }`}
                name="userEmail"
                aria-describedby="userEmailHelp"
                value={loginData.email}
                onChange={event => {
                  changeLoginData(event);
                }}
                placeholder="example@email.com"
              />
              <div id="userEmailHelp" className="form-text text-danger">
                {loginDataErrors.userEmailError}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="userPassword" className="form-label font-bold">
                Password
              </label>
              <div className="input-group relativePosition">
                <input
                  type={isShownPassword ? 'text' : 'password'}
                  className={`form-control ${loginDataErrors.userPasswordError ? 'border-danger' : ''
                    }`}
                  name="userPassword"
                  aria-describedby="userPasswordHelp"
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
              <div id="userPasswordHelp" className="form-text text-danger">
                {loginDataErrors.userPasswordError}
              </div>
            </div>
            <Link to={'/forgetUserPassword'} className="btn mb-2 text-hover-red">
              Forgot Your Password?
            </Link>
            <button type="submit" className="btn bg-secondary-1 white col-12">
              Login
            </button>
            <Link to={'/login-admin'} className="btn mt-2 text-hover-primary">
              you're an admin ?
            </Link>
          </form>
        </div>

        <div className="bg-main m-3 p-5 col-10 col-xl-5 border-custom shadow-lg">
          <h3>Create Your HUB Furniture Account</h3>
          <Link
            to={'/register-user'}
            className="btn bg-secondary-1 white mt-3 col-12"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
