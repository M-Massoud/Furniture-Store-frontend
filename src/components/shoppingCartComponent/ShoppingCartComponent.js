import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import './ShoppingCartComponentStyle.css';
import { Link, NavLink } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';
import { removeProduct } from '../../redux/cartRedux';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleRemoveProduct = product => {
    dispatch(removeProduct(product));
  };

  return (
    <>
      <div className="container py-5 px-5 px-sm-0">
        <div className="row shopping-cart-cols">
          <div className="col-lg-8  shadow-lg rounded py-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  {/* <th scope="col" style={{ textAlign: 'center' }}>
                    Qty
                  </th> */}
                  <th scope="col">Price</th>
                  {/* <th scope="col">Subtotal</th> */}
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.price-item.discount}</td>
                      <td>
                        <span
                          onClick={() => handleRemoveProduct(item)}
                          className="trash-icon" >
                          <FaTrashAlt />
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* <td className="col-3">
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
                    <p className="text-danger">EGP 1100</p>
                  </td>
                  <td>
                    <p className=" text-danger">
                      EGP1300.5
                      <FaTrashAlt className="col-6 my-2 text-secondary" />
                    </p>
                  </td> */}
              </tbody>
            </table>
          </div>

          <div className="col-lg-3  shadow-lg rounded py-4">
            <h4>Order Summary</h4>
            <hr />
            <div className="row">
              <p className="col-6">Subtotal</p>
              <p className="col-6">EGP {cart.totalPrice}</p>
            </div>
            <div className="row">
              <p className="col">
                Shipping (-free delevery (cairo , Giza, October City ,
                Alexandria))
              </p>
              <p className="col text-danger">EGP 0</p>
            </div>

            <hr />
            <div className="row">
              <p className="col-6">Order Total</p>
              <p className="col-6 font-bold text-danger">
                EGP {cart.totalPrice}
              </p>
            </div>
            <button className="btn btn-danger col-12">Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
