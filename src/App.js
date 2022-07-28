// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, useLocation
} from 'react-router-dom';
import jwt from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Main from './components/itemsComponent/Mainpage';
import LoginUserComponent from './components/loginUserComponent/LoginUserComponent';
import LoginAdminComponent from './components/loginAdminComponent/LoginAdminComponent';
import RegisterationUserComponent from './components/registerationUserComponent/RegisterationUserComponent';
import RegisterationAdminComponent from './components/registerationAdminComponent/RegisterationAdminComponent';
import WishListComponent from './components/wishListComponent/WishListComponent';
import ShoppingCartComponent from './components/shoppingCartComponent/ShoppingCartComponent';
import checkoutcomponent from './components/checkoutcomponent/CheckoutComponent';
import ProductsPage from './pages/productsPage';
import SingleProductPage from './pages/singleProductPage';
import SubCategoryPage from './pages/subCategoryPage';
import AdminDashBoardPage from './pages/adminDashBoardPage';
import NotFound from './components/404/NotFound';
import FaqComponent from './components/faqComponent/FaQComponent';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import AddProductForm from './components/productForm/addProductForm';
// import UserProfile from './components/userProfileComponent/userProfilePage';
import UserProfilePage from "./pages/userProfilePage";
import EditProductForm from './components/productForm/editProductForm';

// function PrivateRoute({ children, requiredRole, ...rest }) {
//   let user = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return ((user !== "unAuthenticated") && (user?.role == requiredRole)) ?
//           children
//           :
//           <Redirect to={{ pathname: requiredRole == 'user' ? '/login' : '/login-admin', state: { from: location } }} />
//           ;
//       }}
//     />
//   );
// }

// function PrivateRoute({ children, requiredRole, ...rest }) {
//   let user = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
//   // const jwtPayload = JSON.parse(window.atob(user.split('.')[1]));
//   console.log(user.exp);
//   const location = useLocation();
//   const userId = location.pathname.split('/')[2];
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return (
//           (user !== "unAuthenticated") &&
//           (requiredRole == 'userById' ?
//             ((user?.role == 'user') && (user?.id == userId)) :
//             (user?.role == requiredRole))) ?
//           children
//           :
//           <Redirect to={{ pathname: requiredRole != 'admin' ? '/login-user' : '/login-admin', state: { from: location } }} />
//           ;
//       }}
//     />
//   );
// }

function PrivateRoute({ children, requiredRole, ...rest }) {
  // search for tokent in local storage.
  let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
  // check if token expired.
  if (Date.now() >= token.exp * 1000) {
    token = 'unAuthenticated';
  }
  // get id from url
  const location = useLocation();
  const requestedId = location.pathname.split('/')[2];
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (
          (token !== "unAuthenticated") &&
          (requiredRole == 'userById' ?
            ((token?.role == 'user') && (token?.id == requestedId)) :
            (token?.role == requiredRole))) ?
          children :
          ((token?.role == 'user') && (token?.id != requestedId)) ?
            <h1>Un Authorized</h1> :
            <Redirect to={{ pathname: requiredRole != 'admin' ? '/login-user' : '/login-admin', state: { from: location } }} />
          ;
      }}
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path={'/'} exact component={UserProfile} /> */}
        {/* <Route path={'/'} exact component={Main} /> */}
        <Route path={'/'} exact component={AddProductForm} />

        <PrivateRoute path={'/admin-dashBoard'} requiredRole="admin">
          <AdminDashBoardPage />
        </PrivateRoute>

        <Route path={'/products'} exact component={ProductsPage} />
        <Route path={'/products/:id'} exact component={SingleProductPage} />
        <Route path={'/login-user'} component={LoginUserComponent} />
        <Route path={'/login-admin'} component={LoginAdminComponent} />
        <Route path={'/register-user'} component={RegisterationUserComponent} />
        <Route path={'/register-admin'} component={RegisterationAdminComponent} />
        <Route path={'/wishList'} component={WishListComponent} />
        <Route path={'/shoppingCart'} component={ShoppingCartComponent} />
        <Route path={'/checkOut'} component={checkoutcomponent} />
        <Route path={'/subCategory/:id'} exact component={SubCategoryPage} />
        <Route path={'/FAQ'} exact component={FaqComponent} />
        <Route path={'/search/:id'}>
          <Search />
        </Route>
        <Route path={'/editProduct'} exact component={EditProductForm} />

        {/* <Route path={'/admin-dashBoard'} component={AdminDashBoardPage} /> */}
        {/* <Route path={'/profile/:id'} component={UserProfilePage} /> */}
        <PrivateRoute path={'/profile/:id'} requiredRole="userById">
          <UserProfilePage />
        </PrivateRoute>
        <Route path={'*'} component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
