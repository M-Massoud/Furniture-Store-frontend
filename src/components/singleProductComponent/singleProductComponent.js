import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import axiosInstance from '../../network/Config';

import '../singleProductComponent/singleProductComponent.css';
import '../cardComponent/cardComponent.css';
import img from '../../images/product1-img.jpg';

export default function SingleProductComponent({ title }) {
  const params = useParams();
  //   console.log(params.id);
  const [requiredQuantity, setRequiredQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`products/${params.id}`)
      .then(res => { setProductDetails(res.data[0]); document.title = `${title} | ${res.data[0].name}`; })
      .catch(err => { console.log(err); document.title = `Furniture Store`; });
  }, []);

  // console.log(productDetails);

  const handleAddToCart = () => {
    if(productDetails.stockAmount > 0)
    dispatch(addProduct({ product: productDetails, price: productDetails.price - productDetails.discount, quantity: Number(requiredQuantity), maxQuantity: productDetails.stockAmount }));
  };

  function handleQuantity(event) {
    setRequiredQuantity(event.target.value);
  }

  // console.log(productDetails);
  return (
    <>
      {
        productDetails ?
          <div className="container py-5 single-product-details">
            <div className="row ">
              <div className="col-12 col-md-6 mb-5">
                <img
                  src={`${axiosInstance.getUri()}/uploads/products-imgs/${productDetails.image}`}
                  className="single-product-img img-fluid shadow-sm"
                  alt="..."
                />
              </div>

              <div className="col-12 col-md-6 single-product-content">
                <h1 className="single-product-title">{productDetails.name}</h1>
                <p className="single-product-title">{productDetails.description}</p>
                <h6>sub category: {productDetails.subCategory?.title}</h6>
                <h6>stock amount: {productDetails.stockAmount}</h6>
                {productDetails.discount > 0 ? (
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
                <div className='d-flex col-8'>
                  <input type="number" defaultValue={1} min={1} max={productDetails.stockAmount} className="col-2 mx-2 rounded border-danger text-center" onChange={(event) => handleQuantity(event)} />
                  <button
                    className="btn add-to-cart col-5"
                    onClick={handleAddToCart}
                    style={{ width: '100%' }} >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div> :
          <h1 className='d-flex justify-content-center align-items-center m-5' style={{ height: '294px' }}>Sorry, No Such A product Found</h1>
      }
    </>
  );
}
