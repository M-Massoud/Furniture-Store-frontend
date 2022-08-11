import './WishListComponentStyle.css';
import axiosInstance from './../../network/Config';
import UserAccountManagement from "../userAccountManagementComponent/UserAccountManagementComponent";
import CardComponent from '../cardComponent/cardComponent';
import { useState, useEffect } from 'react';
import jwt from 'jwt-decode';


export default function WishList({ title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userWishList, setuserWishList] = useState([]);
  const [isCardDisplay, setisCardDisplay] = useState(true);

  function cardDisplay() {
    if (isCardDisplay === true) {
      setisCardDisplay(false)
    } else {
      setisCardDisplay(true)
    }
  };

  let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';

  useEffect(() => {
    document.title = title;
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
  }, [token.id, currentPage, isCardDisplay]);


  return (
    <>
      <div className='border row m-2 '>
        <UserAccountManagement />
        <div className=" col-11 m-auto col-md-9 my-md-5 p-3 my-3 ">
          <div className="col col-sm-8 col-md-11 m-auto border rounded shadow p-3">
            <h2 className={`text-center p-2 m-auto border rounded shadow mb-4 ${!userWishList.length == 0 ? "d-none" : ""}`}>Sorry, You have (0) item in your wishList..!</h2>
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