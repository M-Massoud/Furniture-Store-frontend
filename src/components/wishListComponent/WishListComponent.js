import './WishListComponentStyle.css';
import axiosInstance from './../../network/Config';
import { Link } from "react-router-dom";
import CardComponent from '../cardComponent/cardComponent';
import { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { ReactReduxContext } from 'react-redux';


export default function WishList() {
    const [currentPage, setCurrentPage] = useState(1);
  const [userWishList, setuserWishList] = useState([]);
  const [isCardDisplay, setisCardDisplay] = useState(true);

  function cardDisplay(){
    if (isCardDisplay === true) {
      setisCardDisplay(false)
    } else {
      setisCardDisplay(true)
    }
  };

  let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
  
    useEffect(() => {
        axiosInstance
          .get(`/user/${token.id}/wishList`, {
            params: {
              page: currentPage,
              },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              
          })
            .then(res => {
                console.log(res.data[0].wishList)
              setuserWishList(res.data[0].wishList);  
          })
          .catch(err => console.log(err));
      }, [token.id,currentPage,isCardDisplay]);
   console.log(userWishList,token._d)
    return (
        <>
            <div className='border row m-2 '>

            <div className="m-auto my-3 my-md-5 p-3 col-10 col-md-2 border flex-column-start" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Link to={`/profile/${token.id}`} className="col-10 text-decoration-none text-main  mb-2 text-hover-red"><span className="px-2 border-3 border-start border-danger"> My Account</span></Link>
                {/* <p className=""><span clas10ame="px-2 border-3 border-start border-danger"></span> My Account</p> */}
                {/* <NavLink exact activeClassName="border-3 border-start border-danger" className="nav-link " to="/">My Orders</NavLink > */}
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">My Orders</Link>
                <Link to={'/wishList'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">My Wish List</Link>
                <Link to={'/products'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">Products Page</Link>
                <hr className="col-10" />
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">Address Book</Link>
                <Link to={'/'} className="col-10 text-decoration-none text-main  mb-2 text-hover-red">Stored Payment Methods</Link>
            </div>
            <div className=" col-11 m-auto col-md-9 my-md-5 p-3 my-3 ">
            <div className="col col-sm-8 col-md-11 m-auto border rounded shadow p-3">
              <h2 className={`text-center p-2 m-auto border rounded shadow mb-4 ${!userWishList.length == 0 ? "d-none":""}`}>Sorry, You have (0) item in your wishList..!</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4 ">
              {userWishList.map(product => {
                return (
                  <div className="col" key={product._id}>
                    <CardComponent product={product} data={cardDisplay} />
                  </div>
                );
              })}
            </div>
          </div>
            </div>
            </div>
            
        </>
    )
}