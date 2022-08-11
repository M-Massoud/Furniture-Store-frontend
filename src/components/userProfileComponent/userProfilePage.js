import { Link } from "react-router-dom";
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';

function UserProfile({ userData }) {
    console.log(userData);
    return (
        <>
            <div className="col-11 m-auto col-md-4 mt-2 mt-md-3 mb-2 mb-md-3 p-5 shadow rounded ">

                <h6 className="text-center p-2">Welcome Back, {userData.firstName} </h6>
                <h3 className="text-center border p-2 col-12 shadow bg-white rounded">{userData.firstName + ' ' + userData.lastName}</h3>

                <div className="  p-2  m-auto mt-5 mt-3 " >
                    <div className="border shadow text-center col-md-12 m-auto rounded py-3 bg-white "> <strong>wishList</strong>
                        <div className="col-md-11 m-auto text-center my-3 "> You have ({userData.wishList.length}) items in your wish list.</div>
                    </div>
                </div>
            </div>
            <div className=" col-11 m-auto mt-4 mb-4 mb-md-3 mt-md-3 col-md-5 offset-md-1  p-5 shadow rounded">
                <h3 className=" shadow p-3  m-auto rounded "> User Information </h3>
                <div className=" mt-4 p-3 shadow rounded bg-white">
                    <h5> Email : </h5> <h6>{userData.email}</h6>
                </div>
                <div className=" mt-4 p-3 shadow rounded bg-white">
                    <h5> Phone : </h5> <h6>{userData.mobile} </h6>
                </div>
                <div className=" mt-4 p-3 shadow rounded bg-white">
                    <h5> Address : </h5> <h6> {userData.address.city + ',' + userData.address.street + ',' + userData.address.building} </h6>
                </div>
                <div className=" mt-4 p-3 shadow rounded bg-white">
                    <h5> Orders status : </h5> <h6 className="text-center"> {userData.orders.length} </h6>
                </div>
                <div className="mt-4 p-3 shadow rounded bg-white text-center">
                    <Link to={{ pathname: `/useredit/${token.id}`, state: userData }}>
                        <button
                            className="btn btn-success col-8 mt-2 col-sm-5 col-md-3" >  Edit </button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default UserProfile;

// {{
//     pathname: "/editProduct", state: product
// }}