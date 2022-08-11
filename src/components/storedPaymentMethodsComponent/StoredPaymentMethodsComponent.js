import { useState, useEffect } from 'react';
import axiosInstance from '../../network/Config';
import jwt from 'jwt-decode';
import UserAccountManagement from "../userAccountManagementComponent/UserAccountManagementComponent";

export default function StoredPaymentMethods({ title }) {

    document.title = title;

    let token = jwt(localStorage.getItem('token'));

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        document.title = title;
        axiosInstance.get(`/user/${token.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            },
        )
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className='border row m-2 '>
                <UserAccountManagement className='col-2' />
                <div className='container col-8 my-5' style={{ height: '276px' }}>
                    {userData.map(user => {
                        return (
                            <div key={user._id + 1}>
                                <h1>{`HI, ${user.firstName} ${user.lastName}`}</h1>
                                <h5 className='mx-4'>{`${user.email} `}</h5>
                            </div>
                        );
                    })}
                    <div className='mx-4'>
                        <table className='row'>
                            <caption className='my-3'>Avaliable Payment Methods Details</caption>
                            <thead>
                                <tr className='col-12'>
                                    <th className='col-5'>Card Type</th>
                                    <th className='col-5'>Card Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map(user => {
                                    return (
                                        <tr className='col-12' key={user._id}>
                                            <td className='col-5'>{user.payment.cardType}</td>
                                            <td className='col-5'>{user.payment.cardNumber}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div></div>
            </div>
        </>
    )
}