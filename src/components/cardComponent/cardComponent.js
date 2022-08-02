import { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { Link } from "react-router-dom";
import axiosInstance from "../../network/Config";
import "../cardComponent/cardComponent.css";
import img from "../../images/product1-img.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import jwt from "jwt-decode";
import { addProduct } from "../../redux/cartRedux";

let token = localStorage.getItem("token")
  ? jwt(localStorage.getItem("token"))
  : "unAuthenticated";

export default function CardComponent({ product }) {
  const [isProductArry, setisProductArry] = useState([]);
  const [keyword, setKeword] = useState("wishList");
  const [currentPage, setCurrentPage] = useState(1);
  const [userWishList, setuserWishList] = useState([]);
  const [favProductIcon, setfavProductIcon] = useState();
  const [unfavProduct, setunfavProduct] = useState(true);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct({ product, price: product.price - product.discount }));
  };

  const addTowishList = () => {
    console.log(userWishList);
    console.log("add", product._id);
    if (!isProductArry.includes(product._id)) {
      axiosInstance
        .put(
          `/user/${token.id}/wishlist`,
          {
            wishList: [product._id],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setunfavProduct(false);
          setfavProductIcon(true);
        })
        .catch((error) => console.log(error));
    } else {
      setunfavProduct(false);
      setfavProductIcon(true);
    } //if condition
  };

  const removTowishList = () => {
    console.log("remove", product._id);
    if (isProductArry.includes(product._id)) {
      axiosInstance
        .delete(`/user/${token.id}/wishlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            wishList: [product._id],
          },
        })
        .then((res) => {
          console.log(res);
          setfavProductIcon(false);
          setunfavProduct(true);
        })
        .catch((error) => console.log(error));
    } else {
      setfavProductIcon(false);
      setunfavProduct(true);
    }
  };
  ////////
  useEffect(() => {
    axiosInstance
      .get(`/user/${token.id}/${keyword}`, {
        params: {
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let wishList = res.data[0].wishList;
        let productId = [];
        setuserWishList(res.data[0].wishList);
        for (let i = 0; i < wishList.length; i++) {
          productId.push(wishList[i]._id);
        }
        setisProductArry(productId);
        if (isProductArry.includes(product._id)) {
          setfavProductIcon(true);
          setunfavProduct(false);
        } else {
          setfavProductIcon(false);
          setunfavProduct(true);
        }
      })
      .catch((err) => console.log(err));
  }, [keyword, currentPage, favProductIcon]);
  ////////
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
            <h6>Stock Amount: {product.stockAmount}</h6>
            <div className="product-card-footer ">
              <button className="btn add-to-cart" onClick={handleAddToCart}>
                add to cart
              </button>

              <input type="number" defaultValue={1} min={1} max={product.stockAmount} className="col-2 mx-2 rounded border-danger text-center" />
              <span className="wishlist-icon">
                {favProductIcon ? (
                  <FaHeart
                    className="hover white"
                    style={{
                      color: `red`,
                      fontSize: "22px",
                    }}
                    onClick={(e) => {
                      removTowishList();
                    }}
                  />
                ) : (
                  ""
                )}
                {unfavProduct ? (
                  <FaRegHeart
                    className="hover-effect gray"
                    style={{ fontSize: "22px" }}
                    onClick={(e) => {
                      addTowishList();
                    }}
                  />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
