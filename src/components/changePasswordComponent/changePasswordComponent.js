import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../network/Config";
import { Store } from "react-notifications-component";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePasswordComponent() {
  const { role } = useSelector(state => state.isLoggedIn);
  const history = useHistory();
  const [isShownOldPassword, setIsShownOldPassword] = useState(false);
  const [isShownNewPassword, setIsShownNewPassword] = useState(false);
  const [isShownConfirmNewPassword, setIsShownConfirmNewPassword] =
    useState(false);

  function toggleOldPasswordEncrypt() {
    isShownOldPassword
      ? setIsShownOldPassword(false)
      : setIsShownOldPassword(true);
  }

  function toggleNewPasswordEncrypt() {
    isShownNewPassword
      ? setIsShownNewPassword(false)
      : setIsShownNewPassword(true);
  }

  function toggleConfirmNewPasswordEncrypt() {
    isShownConfirmNewPassword
      ? setIsShownConfirmNewPassword(false)
      : setIsShownConfirmNewPassword(true);
  }

  const [changePassword, setchangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // strong password format
  const passwordRegex = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  );

  // handle errors
  const [changePasswordErrors, setChangePasswordErrors] = useState({
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });

  function handlechangePasswordErrors(field, value) {
    switch (field) {
      case "oldPassword":
        setChangePasswordErrors({
          ...changePasswordErrors,
          oldPasswordError: value.length === 0 ? "This Field is required" : "",
        });
        break;

      case "newPassword":
        setChangePasswordErrors({
          ...changePasswordErrors,
          newPasswordError:
            value.length === 0
              ? "This Field is required"
              : "" || passwordRegex.test(value) === false
              ? "choose a stronger password! contains at least one lowercase, one uppercase, at least one digit and special character"
              : "",
        });
        break;

      case "confirmPassword":
        setChangePasswordErrors({
          ...changePasswordErrors,
          confirmPasswordError:
            value.length === 0
              ? "This Field is required"
              : "" || value !== changePassword.newPassword
              ? "not a matched password"  : "",
        });
        break;

      default:
        setChangePasswordErrors({ ...changePasswordErrors });
        break;
    }
  }

  // show success message 
  function showSuccessNotifcation(){
    Store.addNotification({
        title: "success",
        message: "updated your password successfully",
        type: "success",
        container: "top-right",
        dismiss: {
          duration: 2500,
        },
      });
  }

  // show error message
  function showErrorNotification(errorText){
    Store.addNotification({
        title: "error",
        message: `error! couldn't update your password,${
            errorText.response.data.message.split(":")[1]
          }`,
        type: "danger",
        container: "top-right",
        dismiss: {
          duration: 2500,
        },
      });
  }

  function handleUserChange(event) {
    // console.log(event.target.id, event.target.value);
    setchangePassword({
      ...changePassword,
      [event.target.id]: event.target.value,
    });
    handlechangePasswordErrors(event.target.id, event.target.value);
  }

  // handle user submit
  function handleUserSubmit(event) {
    event.preventDefault();
    handlechangePasswordErrors(event.target.id, event.target.value);
    for (
      let index = 0;
      index < Object.values(changePasswordErrors).length;
      index++
    ) {
      if (Object.values(changePasswordErrors)[index]) return;
    }
    // console.log(changePassword);

    // send the request for admin or user
    if (role === "user") {
      axiosInstance
        .post(
          "/changeUserPassword",
          {
            oldPassword: changePassword.oldPassword,
            newPassword: changePassword.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(res => {
        //   console.log(res);
        showSuccessNotifcation()
          history.push('/')} )
        .catch(error => {
        //   console.log("error", error, error.response.data.message);
        showErrorNotification(error)          
        });
    } else if (role === "admin") {
      axiosInstance
        .post(
          "/changeAdminPassword",
          {
            oldPassword: changePassword.oldPassword,
            newPassword: changePassword.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(res => {
        //   console.log(res);
        showSuccessNotifcation()
        history.push('/')} )
        .catch(error => {
          // console.log("error", error);
          showErrorNotification(error)          
        });
    }
  }

  return (
    <form className="col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-4 col-lg-6 m-lg-auto my-lg-4" onSubmit={handleUserSubmit}>
      <h3 className="text-center mt-2"> Change Password </h3>

      {/* old password */}
      <div className="mb-3 position-relative">
        <label htmlFor="oldPassword" className="form-label">
          old Password
        </label>
        <input required
          type={isShownOldPassword ? "text" : "password"}
          className={`form-control  ${
            changePasswordErrors.oldPasswordError && "border-danger"
          } `}
          id="oldPassword"
          aria-describedby="oldPasswordError"
          onChange={handleUserChange}
          value={changePassword.oldPassword} />

        {isShownOldPassword ? (
          <FaEye
            className="overlay text-hover-red mt-4"
            onClick={event => toggleOldPasswordEncrypt()} />
        ) : (
          <FaEyeSlash
            className="overlay text-hover-red mt-4"
            onClick={event => toggleOldPasswordEncrypt()}
          />
        )}
      </div>
      <div id="olfPasswordError" className="form-text text-danger">
        {changePasswordErrors.oldPasswordError}
      </div>

      {/* new password */}
      <div className="mb-3 position-relative">
        <label htmlFor="newPassword" className="form-label">
          Password
        </label>
        <input required
          type={isShownNewPassword ? "text" : "password"}
          className={`form-control  ${
            changePasswordErrors.newPasswordError && "border-danger"
          } `}
          id="newPassword"
          aria-describedby="newPasswordError"
          onChange={handleUserChange}
          value={changePassword.newPassword} />
        {isShownNewPassword ? (
          <FaEye
            className="overlay text-hover-red mt-4"
            onClick={event => toggleNewPasswordEncrypt()} />
        ) : (
          <FaEyeSlash
            className="overlay text-hover-red mt-4"
            onClick={event => toggleNewPasswordEncrypt()} />
        )}
      </div>

      <div id="newPasswordError" className="form-text text-danger">
        {changePasswordErrors.newPasswordError}
      </div>

      {/* confirm password */}
      <div className="mb-3 position-relative">
        <label htmlFor="confirmPassword" className="form-label">
          confirm Password
        </label>
        <input required
          type={isShownConfirmNewPassword ? "text" : "password"}
          className={`form-control  ${
            changePasswordErrors.confirmPasswordError && "border-danger"
          } `}
          id="confirmPassword"
          aria-describedby="passwordError"
          onChange={handleUserChange}
          value={changePassword.confirmPassword} />
        {isShownConfirmNewPassword ? (
          <FaEye
            className="overlay text-hover-red mt-4"
            onClick={event => toggleConfirmNewPasswordEncrypt()} />
        ) : (
          <FaEyeSlash
            className="overlay text-hover-red mt-4"
            onClick={event => toggleConfirmNewPasswordEncrypt()}  />
        )}
      </div>
      <div id="passwordError" className="form-text text-danger">
        {changePasswordErrors.confirmPasswordError}
      </div>

      <button type="submit" className="btn btn-success ">
        Submit
      </button>
    </form>
  );
}
