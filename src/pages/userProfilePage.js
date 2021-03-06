import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../network/Config';

import UserProfile from "../components/userProfileComponent/userProfilePage";
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
// console.log(token.id)

export default function UserProfilePage() {

    const params = useParams();
    console.log(params)
    const [userData, setUserData] = useState({ fitstName: '', lastName: '', email: '', mobile: 0, wishList: [], address: {}, orders: [] });

    useEffect(() => {

        axiosInstance.get(`/user/${params.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            },
        )
            .then(res => {
                setUserData(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <UserProfile userData={userData} />
    );
}