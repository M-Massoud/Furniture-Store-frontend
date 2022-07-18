import React, { useState } from 'react'
import DropDowen from './DropDowen';
import "./NewNav.css"
import { Link } from "react-router-dom";

function NewNav() {
  const [getData, setGetData] = useState("");
  const searchedData = getData;
  const handleChange = event => {
    setGetData(event.target.value);
    console.log('value is:', event.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Home</a>
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
          <form className="d-flex">
            <input className="form-control me-2" onChange={handleChange} value={getData} type="search" placeholder="Search" aria-label="Search" />
            <Link to={{
              pathname: `/search/${searchedData}`,
              state: {
                searchedData
              }
            }} className="btn btn-primary">
              <button className="btn btn-outline-light" type="submit">Search</button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NewNav;