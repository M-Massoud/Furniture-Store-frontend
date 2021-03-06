import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./../../network/Config";
import "./cardComponent.css";
import img from "./product1-img.png";
import { FaHeart } from "react-icons/fa";
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
// console.log(token.id)

export default function CardComponent({ product }) {
  const [favProductIcon, setfavProductIcon] = useState(true);
  console.log(favProductIcon);
  function changeFavProductIcon() {
    // console.log(favProductIcon);
    setfavProductIcon(favProductIcon ? false : true);
    // console.log(favProductIcon);
  }

  const removTowishList = () => {
    console.log("remove", product._id);
    axiosInstance
      .delete(`/user/${token.id}/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          wishList: [product._id],
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error, localStorage.getItem("token")));
  };
  return (
    <>
      <div
        className={` card shadow-lg product-card h-100 ${
          favProductIcon ? " " : "d-none"
        } `}
      >
        <Link to={`/products/${product._id}`}>
          <img src={img} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body  d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text ">product.description</p>

          <div className="mt-auto">
            {product.discount ? (
              <div className="product-price">
                <h6 className="old-price">EGP {product.price.toFixed(2)}</h6>
                <h6 className="final-price">
                  EGP {(product.price - product.discount).toFixed(2)}
                </h6>
              </div>
            ) : (
              <div className="product-price ">
                <h6 className="final-price">EGP{product.price.toFixed(2)} </h6>
              </div>
            )}
            <div className="product-card-footer ">
              <a href="#" className="btn add-to-cart ">
                add to card
              </a>
              <span className="wishlist-icon">
                {favProductIcon ? (
                  <FaHeart
                    className="hover white"
                    style={{
                      color: "red",
                      fontSize: "22px",
                    }}
                    onClick={(e) => {
                      changeFavProductIcon();
                      removTowishList();
                    }}
                  />
                ) : (
                  " "
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//   const addTowishList = () => {
//     console.log('add', product._id);
//     axiosInstance
//       .put('/user/1/wishlist', {
//         wishList: [product._id],
//       })
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';

// export default function CardComponent() {
//   // console.log(product._id);
//   const [favProductIcon, setfavProductIcon] = useState(false);
//   // const [favProduct, setfavProduct] = useState();
//   function changeFavProductIcon() {
//     setfavProductIcon(favProductIcon ? false : true);
//   }
//   const addTowishList = () => {
//     console.log('add', product._id);
//     axiosInstance
//       .put('/user/1/wishlist', {
//         wishList: [product._id],
//       })
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };
//   const removTowishList = () => {
//     console.log('remove', product._id);
//     axiosInstance
//       .delete('/user/1/wishlist', {
//         data: { wishList: [product._id] },
//       })
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };
//   return (
//     <>
//       <div className="card shadow-lg product-card h-100">
//         {/* <img src={product.image} className="card-img-top" alt="..." /> */}
//         <Link to={`/products/${product._id}`}>
//           <img src={img} className="card-img-top" alt="..." />
//         </Link>
//         <div className="card-body  d-flex flex-column">
//           <h5 className="card-title">{product.name}</h5>
//           <p className="card-text ">{product.description}</p>

//           <div className="mt-auto">
//             {product.discount ? (
//               <div className="product-price">
//                 <h6 className="old-price">EGP {(product.price).toFixed(2)}</h6>
//                 <h6 className="final-price">
//                   EGP {(product.price - product.discount).toFixed(2)}
//                 </h6>
//               </div>
//             ) : (
//               <div className="product-price ">
//                 <h6 className="final-price">EGP {(product.price).toFixed(2)}</h6>
//               </div>
//             )}

//             <div className="product-card-footer ">
//               <a href="#" className="btn add-to-cart ">
//                 add to card
//               </a>
//               <span className="wishlist-icon">
//                 {favProductIcon ? (
//                   <FaHeart
//                     className="hover white"
//                     style={{
//                       color: 'red',
//                       fontSize: '22px',
//                     }}
//                     onClick={e => {
//                       changeFavProductIcon();
//                       removTowishList();
//                     }}
//                   />
//                 ) : (
//                   <FaRegHeart
//                     className="hover-effect gray"
//                     style={{ fontSize: '22px' }}
//                     onClick={e => {
//                       changeFavProductIcon();
//                       addTowishList();
//                     }}
//                   />
//                 )}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faHeart } from '@fortawesome/free-regular-svg-icons';
