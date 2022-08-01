import { NavLink } from "react-router-dom";

export default function AdminDashBoardPage() {

    return (
        <div className='col-2'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="text-success" className="nav-link" to="/admin-dashBoard">Users</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="text-success" className="nav-link" to="/admin-dashBoard/categories">Categories</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="text-success" className="nav-link" to="/admin-dashBoard/subCategories">Sub Categories</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="text-success" className="nav-link" to="/admin-dashBoard/products">Products</NavLink ></th>
                    </tr>
                    <tr>
                        <th scope="col" className='text-hover-red'><NavLink exact activeClassName="text-success" className="nav-link" to="/admin-dashBoard/orders">Orders</NavLink ></th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
