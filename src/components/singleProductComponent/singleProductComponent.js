import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../network/Config';

import '../singleProductComponent/singleProductComponent.css';
import '../cardComponent/cardComponent.css';
import img from '../../images/product1-img.jpg';

export default function SingleProductComponent() {
  const params = useParams();
  //   console.log(params.id);

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`products/${params.id}`)
      .then(res => setProductDetails(res.data[0]))
      .catch(err => console.log(err));
  }, []);

  console.log(productDetails);

  return (
    <>
      <div className="container py-5 single-product-details">
        <div className="row ">
          <div className="col-12 col-md-6 mb-5">
            <img
              src={img}
              className="single-product-img img-fluid shadow-sm"
              alt="..."
            />
          </div>

          <div className="col-12 col-md-6 single-product-content">
            <h1 className="single-product-title">{productDetails.name}</h1>
            <p className="single-product-title">{productDetails.description}</p>
            <h6>sub category: {productDetails.subCategory?.title}</h6>
            {productDetails.discount ? (
              <div className="product-price my-3">
                <h6 className="old-price">EGP {productDetails.price}</h6>
                <h6 className="final-price">
                  EGP {productDetails.price - productDetails.discount}
                </h6>
              </div>
            ) : (
              <div className="product-price ">
                <h6 className="final-price">EGP {productDetails.price}</h6>
              </div>
            )}

            <a href="#" className="btn add-to-cart " style={{ width: '100%' }}>
              add to card
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
