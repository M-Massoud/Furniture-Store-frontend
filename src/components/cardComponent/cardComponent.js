import { useState } from "react";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { Link } from "react-router-dom";
import axiosInstance from "../../network/Config";
import "../cardComponent/cardComponent.css";
import img from "../../images/product1-img.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import jwt from 'jwt-decode';
import { addProduct } from '../../redux/cartRedux';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';


export default function CardComponent({ product }) {
  // console.log(product._id);
  const [favProductIcon, setfavProductIcon] = useState(false);
  // const [favProduct, setfavProduct] = useState();
  const dispatch = useDispatch();
  function changeFavProductIcon() {
    setfavProductIcon(favProductIcon ? false : true);
  }

  const handleAddToCart = () => {
    dispatch(addProduct({ product, price: product.price - product.discount }));
  };

  const addTowishList = () => {
    console.log("add", product._id);
    axiosInstance
      .put(
        `/user/${token.id}/wishlist`,
        {
          wishList: [product._id],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //
          },
        }
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error, localStorage.getItem("token")));
  };

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
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="card shadow-lg product-card h-100">
        {/* <img src={product.image} className="card-img-top" alt="..." /> */}
        <Link to={`/products/${product._id}`}>
          <img src={img} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body  d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text ">{product.description}</p>

          <div className="mt-auto">
            {product.discount > 0 ? (
              <div className="product-price">
                <h6 className="old-price">EGP {product.price.toFixed(2)}</h6>
                <h6 className="final-price">
                  EGP {(product.price - product.discount).toFixed(2)}
                </h6>
              </div>
            ) : (
              <div className="product-price ">
                <h6 className="final-price">EGP {product.price.toFixed(2)}</h6>
              </div>
            )}

            <div className="product-card-footer ">
              <button className="btn add-to-cart" onClick={handleAddToCart}>
                add to card
              </button>

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
                  <FaRegHeart
                    className="hover-effect gray"
                    style={{ fontSize: "22px" }}
                    onClick={(e) => {
                      changeFavProductIcon();
                      addTowishList();
                    }}
                  />
                )}
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
