import jwt from 'jwt-decode';
export default function isLoggedIn() {
  let isAuthenticated = false;
  if (localStorage.getItem('token') != null) {
    const user = jwt(localStorage.getItem('token'));
    console.log(user);
    if (user.role) return true;
    else return false;
  }
}
