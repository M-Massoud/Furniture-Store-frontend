import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { Link, useHistory } from "react-router-dom";
import DropDowen from './DropDowen';
import "./NewNav.css"
import { FaCartPlus } from 'react-icons/fa';


function NewNav() {
  const history = useHistory();
  const [getData, setGetData] = useState("");
  const searchWord = getData;
  const {quantity} = useSelector(state=>state.cart);

  const handleChange = event => {
    setGetData(event.target.value);
    // console.log('value is:', event.target.value);
  };

  function Logout() {
    localStorage.removeItem('token');
    history.push('/');
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
          <button 
            className='btn btn-outline-light ms-4' onClick={Logout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NewNav;