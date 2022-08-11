import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loggedOutSuccessfully } from '../../../redux/isLoggedInRedux';
import { clearCartState } from "../../../redux/cartRedux";
import { Store } from 'react-notifications-component';
import { Link, useHistory } from "react-router-dom";
import DropDowen from './DropDowen';
import "./NewNav.css"
import { FaCartPlus, FaRegHeart, FaHeart } from 'react-icons/fa';


function NewNav() {
  const history = useHistory();
  const [getData, setGetData] = useState("");
  const searchWord = getData;
  const {quantity} = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.isLoggedIn);
  const {role} = useSelector(state => state.isLoggedIn);

  // console.log(isLoggedIn,role);

  const handleChange = event => {
    setGetData(event.target.value);
    // console.log('value is:', event.target.value);
  };

  function Logout() {
    localStorage.removeItem('token');
    dispatch(clearCartState());
    Store.addNotification({
      title: "Status",
      message: "Successfully Logged Out",
      type: "success",
      container: "top-center",
      dismiss: {
        duration: 2000,
      },
    });
    history.push('/');
    dispatch(loggedOutSuccessfully());
  }

  return (
    <header>
      <nav className=" container navbar navbar-expand-lg navbar-dark shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"} >Furniture Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <DropDowen />
              <DropDowen />
              <DropDowen />
            </ul>
            <form className="d-flex align-items-center ">
              <input className="form-control me-2 search-input" onChange={handleChange} value={getData} type="search" placeholder="Search" aria-label="Search" />
              <Link to={{
                pathname: `/search/${searchWord}`,
                state: {
                  searchWord
                }
              }} className="btn">
                <button className="btn btn-outline-light" type="submit">Search</button>
              </Link>
            </form>
            <Link to={"/shoppingCart"} >
              <span className='header-cart' >
                <FaCartPlus /> <span className='header-cart-qty'>{quantity}</span>
              </span>
            </Link> 
            <Link to={"/wishList"} >
              <span className='header-cart' >
              <FaRegHeart
                    className="hover white"
                    style={{
                      color: `white`,
                      fontSize: "22px",
                      marginLeft:"20px"
                    }}
                  />
              </span>
            </Link> 

            {/* render the buttons depends on the user role */}
            {
              isLoggedIn === false ? <Link to={"/login-user"} > <button 
              className='btn btn-outline-light ms-4'>Login</button> </Link> : <button 
              className='btn btn-outline-light ms-4' onClick={Logout}>Logout</button>
            }
           
            {
              role === "admin" && <Link to={"/admin-dashboard/products"}> <button 
              className='btn btn-outline-light ms-4'>dashboard</button> </Link>
            }

          </div>
        </div>
      </nav>
    </header>
  )
}

export default NewNav;