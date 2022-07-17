import '../cardComponent/cardComponent.css';
import img from '../../images/product1-img.jpg';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import axiosInstance from '../../network/Config';

export default function CardComponent({ product }) {
  // console.log(product._id);
  const [favMovieIcon, setfavMovieIcon] = useState(false);
  // const [favProduct, setfavProduct] = useState();
  function changeFavMovieIcon() {
    setfavMovieIcon(favMovieIcon ? false : true);
  };
  const addTowishList = () => {
    console.log("add", product._id);
    axiosInstance.put('/user/1/wishlist', {
      wishList: [product._id],
    }).then((res)=>console.log(res)).catch((error)=>console.log(error));
  }
  const removTowishList = () => {
    console.log("remove", product._id);
    axiosInstance.delete('/user/1/wishlist', {
     data:{wishList: [product._id]} ,
    }).then((res)=>console.log(res)).catch((error)=>console.log(error));
  }
  return (
    <>
      <div className="card shadow-lg product-card h-100">
        {/* <img src={product.image} className="card-img-top" alt="..." /> */}
        <img src={img} className="card-img-top" alt="..." />

        <div className="card-body  d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>

          <div className="mt-auto">
            {product.discount ? (
              <div className="product-price">
                <h6 className="old-price">EGP {product.price}</h6>
                <h6 className="final-price">
                  EGP {product.price - product.discount}
                </h6>
              </div>
            ) : (
              <div className="product-price ">
                <h6 className="final-price">EGP {product.price}</h6>
              </div>
            )}

            <div className="product-card-footer ">
              <a href="#" className="btn add-to-cart ">
                add to card
              </a>
              <span className="wishlist-icon">
              {favMovieIcon ?
                  <FaHeart className="overlay hover-effect white" style={{ top: '88.5%', right: '8%', fontSize: "2rem", color: "red" }} onClick={(e) => { changeFavMovieIcon(); removTowishList(); }} />
                  : <FaRegHeart className="overlay hover-effect gray" style={{ top: '88.5%', right: '8%', fontSize: "2rem" }} onClick={(e) => { changeFavMovieIcon();  addTowishList();}} />
            }
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
