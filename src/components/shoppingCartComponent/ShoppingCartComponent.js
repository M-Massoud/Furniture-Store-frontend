import './ShoppingCartComponentStyle.css';
import { Link, NavLink } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";

export default function ShoppingCart() {
    return (
        <div className="row col-12">
            <div className="m-5 p-3 col-10 col-md-8 border-1 shadow-lg rounded">
                <div className="row mx-2 mx-md-5 col-12 col-md-12">
                    <p className="col-3 col-md-5">Item</p>
                    <p className="col-3 col-md-2">Qty</p>
                    <p className="col-3 col-md-2">Price</p>
                    <p className="col-3 col-md-2">Subtotal</p>
                </div>
                <hr />
                <div className="row mx-2 mx-md-5 col-12 col-md-12">
                    <div className="row col-5 col-md-5">
                        <img className="col-3" src="https://variety.com/wp-content/uploads/2020/03/movie-theater-popcorn-placeholder.jpg?w=1000" alt="" />
                        <p className="col-9 mt-2">MetroPol-EM Bed</p>
                    </div>
                    <div className="row col-2 p-2">
                        <FaMinusCircle className="col-md-4 mt-2" />
                        <input type="number" className="col-4 p-1" min="1" max="5" />
                        <FaPlusCircle className="col-md-4 mt-2" />
                    </div>
                    <p className="col-2 mt-2 mx-4 text-danger">EGP1300.5</p>
                    <div className="row col-2">
                        <p className="col-6 mt-2 text-danger">EGP1300.5</p>
                        <FaTrashAlt className="col-6 my-2 text-secondary" />

                    </div>
                </div>
            </div>

            <div className="col-10 col-md-3 m-5 m-md-0 my-md-5 p-4 border-1 shadow-lg rounded">
                <h4>Order Summary</h4>
                <hr />
                <div className="row">
                    <p className="col-6">Subtotal</p>
                    <p className="col-6" text-danger>EGP 13.500</p>
                </div>
                <div className="row">
                    <p className="col-6">Shipping (-free delevery (cairo , Giza, October City , Alexandria and North Coast))</p>
                    <p className="col-6 text-danger">EGP 0</p>
                </div>

                <hr />
                <div className="row">
                    <p className="col-6">Order Total</p>
                    <p className="col-6 font-bold text-danger">EGP 13.500</p>
                </div>
                <button className="btn btn-danger col-12">Check Out</button>
            </div>
        </div>
    )
}