import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loggedOutSuccessfully } from '../../../redux/isLoggedInRedux';
import { clearCartState } from "../../../redux/cartRedux";
import { Store } from 'react-notifications-component';
import { Link, useHistory } from "react-router-dom";
import jwt from 'jwt-decode';
// import DropDowen from './DropDowen';
import "./NewNav.css"
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';
let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';


function NewNav() {
  const history = useHistory();
  const [getData, setGetData] = useState("");
  const searchWord = getData;
  const { quantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.isLoggedIn);
  const { role } = useSelector(state => state.isLoggedIn);

  // console.log(isLoggedIn,role);
//  {token.role == "admin" ? "":setshowFavortIcon(true)}
  // if (token.role === "admin") {
  //   setshowFavortIcon(true)
  // }
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
      <nav className=" container navbar navbar-expand-lg navbar-dark shadow NVM">
        <div className="container-fluid ">
          <Link className="navbar-brand" to={"/"} style={{fontWeight:"bold"}}>Furniture<span style={{color:'#c02234',fontWeight:"bold"}}>Store</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div> <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Indoor Furniture
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li><Link to={''} className="dropdown-item">Living Room</Link></li>
                    <li><Link to={''} className="dropdown-item">U-Shape</Link></li>
                    <li><Link to={''} className="dropdown-item">L-Shape</Link></li>
                    <li><Link to={''} className="dropdown-item">Sofa Set</Link></li>
                    <li><Link to={''} className="dropdown-item">Recliner Sofa Sets</Link></li>
                    <li><Link to={''} className="dropdown-item">TV Tables</Link></li>
                  </ul>
                  <ul>
                    <li><Link to={''} className="dropdown-item">Bed Room</Link></li>
                    <li><Link to={''} className="dropdown-item">King Bedroom Set</Link></li>
                    <li><Link to={''} className="dropdown-item">Queen Bedroom Set</Link></li>
                    <li><Link to={''} className="dropdown-item">Youth Bedrooms</Link></li>
                    <li><Link to={''} className="dropdown-item">Kids Bedrooms</Link></li>
                  </ul>
                </div>
              </li></div>
              <div> <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dinning Furniture
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li><Link to={''} className="dropdown-item">Dining Room Sets</Link></li>
                    <li><Link to={''} className="dropdown-item">Complete Dining Room Sets</Link></li>
                    <li><Link to={''} className="dropdown-item">Dining Table With 8 Chairs</Link></li>
                    <li><Link to={''} className="dropdown-item">Dining Table With 6 Chairs</Link></li>
                    <li><Link to={''} className="dropdown-item">Dining Table With 4 Chairs</Link></li>
                  </ul>
                  <ul>
                    <li><Link to={''} className="dropdown-item">kitchen</Link></li>
                    <li><Link to={''} className="dropdown-item">Base Cabinets</Link></li>
                    <li><Link to={''} className="dropdown-item">Wall Cabinets</Link></li>
                    <li><Link to={''} className="dropdown-item">Hammock</Link></li>
                    <li><Link to={''} className="dropdown-item">Kitchen Door</Link></li>
                  </ul>
                </div>
              </li></div>
              <div> <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Garden Furniture
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li><Link to={''} className="dropdown-item">Garden Furniture</Link></li>
                    <li><Link to={''} className="dropdown-item">Outdoor Sofa Set</Link></li>
                    <li><Link to={''} className="dropdown-item">Outdoor Dining Set</Link></li>
                    <li><Link to={''} className="dropdown-item">Hammock</Link></li>
                    <li><Link to={''} className="dropdown-item">Relax Chair</Link></li>
                    <li><Link to={''} className="dropdown-item">Swings</Link></li>
                  </ul>
                </div>
              </li>
              </div>
            </ul>
            <form className="d-flex align-items-center ">
              <input className="form-control me-2 search-input" onChange={handleChange} value={getData} type="search" placeholder="Search" aria-label="Search" />
              <Link to={{
                pathname: searchWord != '' ? `/search/${searchWord}`:'/products',
                state: {
                  searchWord
                }
              }} className="btn border-0">
                <button className="btn btn-outline-light" type="submit">Search</button>
              </Link>
            </form>
            <Link to={"/shoppingCart"} >
              <span className='header-cart' >
                <FaCartPlus
                   className={`${token.role === "admin" ? "d-none":""}`}
                /> <span className={` header-cart-qty ${token.role === "admin" ? "d-none":""}`}>{quantity}</span>
              </span>
            </Link>
            <Link to={"/wishList"} >
              <span className='header-cart' >
                  <FaRegHeart
                    className={`hover white ${token.role === "admin" ? "d-none":""}`}
                  style={{
                    color: `white`,
                    fontSize: "22px",
                    marginLeft: "20px"
                  }}
                />
              </span>
            </Link>

            {/* render the buttons depends on the user role */}
            {
              isLoggedIn === false ? <Link to={"/login-user"} > <button
                className='btn btn-outline-light ms-2'>Login</button> </Link> : <button
                  className='btn btn-outline-light ms-2' onClick={Logout}>Logout</button>
            }

            {
              role === "admin" && <Link to={"/admin-dashboard/products"}> <button
                className='btn btn-outline-light ms-2'>dashboard</button> </Link>
            }

          </div>
        </div>
      </nav>
    </header>
  )
}

export default NewNav;