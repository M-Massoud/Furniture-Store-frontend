import React from 'react'
import DropDowenMenu from './DropDowenMenu';

function DropDowen() {
    return (
        <div> <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown title
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <DropDowenMenu />
                <DropDowenMenu />
            </div>
        </li></div>
    )
}

export default DropDowen