import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';

export default function LoggedInAccessRestrictRoute({ component: Component, ...rest }) {

    const location = useLocation();
    const history = useHistory();
    // search for tokent in local storage.
    let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
    return (
        <Route {...rest} render={(props) => {
            return (
                (token?.role === "user") || (token?.role === "admin") || (Date.now() <= token.exp * 1000) ?
                    <div className='d-flex justify-content-center align-items-center m-5' style={{ height: '294px' }}>
                        <div className='text-center'>
                            <h1>Un Authorized Access</h1>
                            <h4>You Are Aleady Logged In</h4>
                        </div>
                    </div> :
                    <Component from={location} {...props} />
            )
        }}
        />
    );
}