import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axiosInstance from "../network/Config";
import jwt from 'jwt-decode';

export default function CheckoutSuccess() {

    const history = useHistory();
    let token = jwt(localStorage.getItem('token'));
    const cart = useSelector(state => state.cart);

    function getCurrentTime() {
        let date = new Date().toUTCString();
        return date;
    }
    function getCartProductsIdArray(array) {
        let newArray = [];
        for (let item = 0; item < array.length; item++) {
            newArray.push(array[item]._id);
        }
        return newArray;
    }

    async function displayOrderData() {
        try {
            await axiosInstance.post("/orders", {
                userId: token.id,
                product: getCartProductsIdArray(cart.products),
                totalPrice: cart.totalPrice,
                quantity: cart.quantity,
                Status: "fullfilled",
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                },
            );
            let userOrder = [];
            for (let product of cart.products) {
                userOrder.push(
                    {
                        productId: product._id,
                        productName: product.name
                    }
                )
            }
            await axiosInstance.put(`/user/${token.id}`, {
                orders: userOrder,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                },
            );
            setTimeout(() => {
                localStorage.removeItem('cart');
                history.push('/');
            }, 10000)
        }
        catch (error) {
            console.log(error)
        };
    }
    displayOrderData();
    return (
        <>
            <div className="container m-5">
                <div className="card">
                    <div className="card-header">
                        Order &nbsp;
                        <strong>{getCurrentTime()}</strong>
                        <span className="float-right"> <strong>&nbsp;Status:</strong> Successful</span>
                    </div>
                    <div className="card-body">
                        <div className="row mb-4 text-center">
                            <h1 className="mb-2 text-success">Successful Payment</h1>
                            <h5>Thank You For Choosing Us</h5>
                        </div>

                        <div className="table-responsive-sm">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="center">#</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th className="center">Qty</th>
                                        <th className="right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart['products'].map((product,index) => {
                                            return (
                                                < tr key={product._id}>
                                                    <td className="center">{index+1}</td>
                                                    <td className="left strong">{product.name}</td>
                                                    <td className="left">{product.description}</td>
                                                    <td className="center">1</td>
                                                    <td className="right">{product.price} EGP</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-sm-5">
                            </div>
                            <div className="col-lg-4 col-sm-5 ml-auto">
                                <table className="table table-clear">
                                    <tbody>
                                        <tr>
                                            <td className="left">
                                                <strong>Total Price</strong>
                                            </td>
                                            <td className="right">
                                                <strong>{cart.totalPrice} EGP</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <h5 className='my-2 text-warning text-center'>You Will Be Redirected To Home Page After Ten Seconds</h5>
                    </div>
                </div>
            </div>
        </>
    );
}