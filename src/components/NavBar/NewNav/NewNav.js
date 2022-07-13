import React from 'react'
import DropDowen from './DropDowen';
import "./NewNav.css"
function NewNav() {
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
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default NewNav;