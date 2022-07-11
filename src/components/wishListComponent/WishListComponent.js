import './WishListComponentStyle.css';
import { Link, NavLink } from "react-router-dom";

export default function WishList() {
    return (
        <>
            <div className="m-5 p-3 col-5 col-md-2 border flex-column-start" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red"><span className="px-2 border-3 border-start border-danger"> My Account</span></Link>
                {/* <p className=""><span clas10ame="px-2 border-3 border-start border-danger"></span> My Account</p> */}
                {/* <NavLink exact activeClassName="border-3 border-start border-danger" className="nav-link " to="/">My Orders</NavLink > */}
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">My Orders</Link>
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">My Wish List</Link>
                <hr className="col-10" />
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">Address Book</Link>
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">Stored Payment Methods</Link>
            </div>
        </>
    )
}