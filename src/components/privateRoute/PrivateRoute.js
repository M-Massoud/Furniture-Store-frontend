import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';

export default function PrivateRoute({ component: Component, requiredRole, ...rest }) {

    const location = useLocation();
    const history = useHistory();

    // search for tokent in local storage.
    let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
    // check if token expired.
    if (Date.now() >= token.exp * 1000) {
        let tokenRole = token.role;
        token = 'unAuthenticated';
        localStorage.removeItem('token');
        tokenRole === 'user' ? history.push('/login-user') : history.push('/login-admin');
    }
    // get id from url
    const requestedId = location.pathname.split('/')[2];
    return (
        <Route {...rest} render={(props) => {
            return (
                (token !== "unAuthenticated") &&
                (requiredRole === 'userById' ?
                    ((token?.role === 'user') && (token?.id === Number(requestedId))) :
                    (token?.role === requiredRole))) ?
                <Component from={location} {...props} /> :
                ((token?.role === 'user') && (token?.id !== requestedId)) ?
                    <h1 className='d-flex justify-content-center align-items-center m-5' style={{ height: '294px' }}>Un Authorized Access</h1> :
                    <Redirect to={{ pathname: requiredRole !== 'admin' ? '/login-user' : '/login-admin', state: { from: location } }} />
                ;
        }}
        />
    );
}