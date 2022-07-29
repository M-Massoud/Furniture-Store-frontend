import { Redirect } from 'react-router-dom';

export default function Logout() {
    localStorage.removeItem('token');
    return (
        <>
            <h1>Logged Out Successfully</h1>
            <Redirect to="/" />;
        </>
    );
}