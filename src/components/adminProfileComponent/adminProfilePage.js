import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axiosInstance from './../../network/Config';

import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
//{ userData }
function AdminProfile() {
    console.log(token.id);
    const [adminData, setAdminData] = useState({});


    useEffect(() => {
        axiosInstance
          .get(`/admin/${token.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(res => {
              setAdminData(res.data);
              console.log(res.data)})
          .catch(err => console.log(err));
    }, []);
    // console.log(adminData)
    return (
        <>
            <div className="container m-auto  row flex-wrap border col-12">
                <div className="col-11 m-auto col-md-4 mt-2 mt-md-3 mb-2 mb-md-3  p-5 shadow rounded ">
                   
              
                    <h6 className="text-center p-2">Wellcome Back, </h6> 
                
                    <h3 className="text-center border p-2 col-12 shadow bg-white rounded">{adminData.firstName} </h3>

                    
                </div>
                <div className=" col-11 m-auto mt-4 mb-4 mb-md-3 mt-md-3 col-md-7 offset-md-1  p-5 shadow rounded">
                    <h3 className=" shadow p-3  m-auto rounded "> Admin Information  </h3>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Full Name : </h5> <h6>{adminData.firstName + ' ' + adminData.lastName}</h6>
                    </div>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Email : </h5> <h6>{adminData.email}</h6>
                    </div>
                    
                   
                    
                    <div className="mt-4 p-3 shadow rounded bg-white text-center">
                        <Link to={{pathname:`/adminedit/${token.id}`,state:adminData}}>
                        <button
                        className="btn btn-success col-8 mt-2 col-sm-5 col-md-3" >  Edit </button>
                        </Link> 
          </div>
                </div>
            </div>

        </>
    )
};

export default AdminProfile;

// {{
//     pathname: "/editProduct", state: product
// }}