import '../cardComponent/cardComponent.css';
import img from '../../images/product1-img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
export default function CardComponent() {
  return (
    <>
      <div class="col">
        <div className="card shadow-lg product-card">
          <img src={img} className="card-img-top" alt="..." />

          <div className="card-body">
            <h5 className="card-title">product title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="product-price">
              <h6 className="old-price">EGP 2000</h6>
              <h6 className="final-price">EGP 1499 </h6>
            </div>
            <div className="product-card-footer">
              <a href="#" className="btn add-to-cart ">
                add to card
              </a>
              <span className="wishlist-icon">
                <FontAwesomeIcon icon={faHeart} size="xl" />{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
