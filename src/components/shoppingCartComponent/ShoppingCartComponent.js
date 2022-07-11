import './ShoppingCartComponentStyle.css';
import { Link, NavLink } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';

export default function ShoppingCart() {
  return (
    <>
      <div className="container py-5 px-5 px-sm-0">
        <div className="row shopping-cart-cols">
          <div className="col-lg-8  shadow-lg rounded py-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col  " style={{ textAlign: 'center' }}>
                    Qty
                  </th>
                  <th scope="col">Price</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-3">
                    <img
                      className="col-6"
                      src="https://variety.com/wp-content/uploads/2020/03/movie-theater-popcorn-placeholder.jpg?w=1000"
                      alt=""
                    />
                    <p className="col-12">MetroPol-EM Bed</p>
                  </td>
                  <td className="quantity-icons">
                    <span>
                      <FaMinusCircle />
                      <input type="number" min="1" max="5" />
                      <FaPlusCircle />
                    </span>
                  </td>
                  <td>
                    <p className="text-danger">EGP1300.5</p>
                  </td>
                  <td>
                    <p className=" text-danger">
                      EGP1300.5
                      <FaTrashAlt className="col-6 my-2 text-secondary" />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="  col-lg-3   shadow-lg rounded py-4">
            <h4>Order Summary</h4>
            <hr />
            <div className="row">
              <p className="col-6">Subtotal</p>
              <p className="col-6" text-danger>
                EGP 13.500
              </p>
            </div>
            <div className="row">
              <p className="col">
                Shipping (-free delevery (cairo , Giza, October City ,
                Alexandria and North Coast))
              </p>
              <p className="col text-danger">EGP 0</p>
            </div>

            <hr />
            <div className="row">
              <p className="col-6">Order Total</p>
              <p className="col-6 font-bold text-danger">EGP 13.500</p>
            </div>
            <button className="btn btn-danger col-12">Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
