import { Link, NavLink } from "react-router-dom";
import jwt from 'jwt-decode';
import './UserAccountManagementComponentStyle.css';

export default function UserAccountManagement() {

  let token = jwt(localStorage.getItem('token'));

  return (
    <>
      <div className="m-auto my-3 my-md-5 p-3 col-10 col-md-2 border flex-column-start" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <NavLink exact activeClassName="active-page" className="nav-link col-10 text-decoration-none text-main  mb-2 text-hover-red" to={`/profile/${token.id}`}>My Profile</NavLink >
        <NavLink exact activeClassName="active-page" className="nav-link col-10 text-decoration-none text-main  mb-2 text-hover-red" to="/wishList">My Wish List</NavLink >
        <NavLink exact activeClassName="active-page" className="nav-link col-10 text-decoration-none text-main  mb-2 text-hover-red" to="/orders">My Orders</NavLink >
        <hr className="col-10" />
        <NavLink exact activeClassName="active-page" className="nav-link col-10 text-decoration-none text-main  mb-2 text-hover-red" to="/storedPaymentMethods">Stored Payment Methods</NavLink >
      </div>
    </>
  )
}