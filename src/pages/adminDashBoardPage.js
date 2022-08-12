import { NavLink } from "react-router-dom";

export default function AdminDashBoardPage() {

    return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="active-page fw-bold" className="nav-link font-weight-normal" to="/admin-dashBoard">Users</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="active-page fw-bold" className="nav-link fw-bold" to="/admin-dashBoard/categories">Categories</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="active-page fw-bold" className="nav-link" to="/admin-dashBoard/subCategories">Sub Categories</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="active-page fw-bold" className="nav-link" to="/admin-dashBoard/products">Products</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="active-page fw-bold" className="nav-link" to="/admin-dashBoard/orders">Orders</NavLink ></th>
                    </tr>
                </thead>
            </table>
    );
}
