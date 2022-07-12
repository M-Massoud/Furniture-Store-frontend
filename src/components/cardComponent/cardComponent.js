import '../cardComponent/cardComponent.css';
import img from '../../images/product1-img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function CardComponent({ product }) {
  console.log(product);
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
                <FontAwesomeIcon icon={faHeart} size="xl" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
