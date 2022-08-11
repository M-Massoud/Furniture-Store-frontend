import { useState, useEffect } from 'react';
import axiosInstance from '../../network/Config';
import jwt from 'jwt-decode';
import UserAccountManagement from "../userAccountManagementComponent/UserAccountManagementComponent";
import Spinner from "../spinner/index";

export default function UserOrders({ title }) {

    document.title = title;

    let token = jwt(localStorage.getItem('token'));

    const [userOrdersData, setUserOrdersData] = useState([]);
    const [isLoded, setIsLoded] = useState(false);

    useEffect(() => {
        document.title = title;
        axiosInstance.post("/ordersByUserID", {
            userId: token.id
        },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            },
        )
            .then(response => {
                setUserOrdersData(response.data);
                setIsLoded(true);
            })
            .catch(error => console.log(error));
    }, []);

    const productNameToString = function (array) {
        let result = '';
        for (let item in array) {
            result += array[item].product.name + ', ';
        }
        return result;
    }

    const qunatityToString = function (array) {
        let result = '';
        for (let item in array) {
            result += array[item].quantity + ', ';
        }
        return result;
    }

    return (
        <>
            <div className='border row m-2 '>
                <UserAccountManagement className='col-2' />
                <div className='col-8 m-5'>
                    {isLoded ?
                        userOrdersData.length > 0 ?
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Products</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">quantity</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrdersData.map((order, index) => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{productNameToString(order.products, 'product', "name")}</td>
                                                <td>{order.created_at}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{qunatityToString(order.products, 'quantity')}</td>
                                                <td>{order.status}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table> :
                            <h1 className='my-5 text-center'>No Available Data To Show</h1> :
                        <Spinner />}
                </div>
            </div>
        </>
    )
} 