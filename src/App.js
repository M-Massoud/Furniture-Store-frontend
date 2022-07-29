// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, useHistory, useLocation
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
import AdminDashBoardUsersPage from "./components/adminDashBordUsersComponent/adminDashBordUsersComponent";
import AdminDashBoardCategoriesPage from "./components/adminDashBordCategoriesComponent/adminDashBordCategoriesComponent";
import AdminDashBoardSubCategoriesPage from "./components/adminDashBordSubCategoriesComponent/adminDashBordSubCategoriesComponent";
import AdminDashBoardProductsPage from "./components/adminDashBordProductsComponent/adminDashBordProductsComponent";
import AdminDashBoardOrdersPage from "./components/adminDashBordOrdersComponent/adminDashBordOrdersComponent";
import NotFound from './components/404/NotFound';
import FaqComponent from './components/faqComponent/FaQComponent';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import AddProductForm from './components/productForm/addProductForm';
import UserProfilePage from "./pages/userProfilePage";
import EditProductForm from './components/productForm/editProductForm';
import Logout from "./components/logoutComponent/LogoutComponent";

function PrivateRoute({ children, requiredRole, ...rest }) {

  const location = useLocation();
  const history = useHistory();

  // search for tokent in local storage.
  let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : 'unAuthenticated';
  // check if token expired.
  if (Date.now() >= token.exp * 1000) {
    let tokenRole = token.role;
    token = 'unAuthenticated';
    localStorage.removeItem('token');
    tokenRole == 'user' ? history.push('/login-user') : history.push('/login-admin');
  }
  // get id from url
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
        <Route path={'/'} exact component={AddProductForm} />
        <PrivateRoute path={'/admin-dashBoard/users'} requiredRole="admin">
          <AdminDashBoardUsersPage />
        </PrivateRoute>
        <PrivateRoute path={'/admin-dashBoard/categories'} requiredRole="admin">
          <AdminDashBoardCategoriesPage />
        </PrivateRoute>
        <PrivateRoute path={'/admin-dashBoard/subCategories'} requiredRole="admin">
          <AdminDashBoardSubCategoriesPage />
        </PrivateRoute>
        <PrivateRoute path={'/admin-dashBoard/products'} requiredRole="admin">
          <AdminDashBoardProductsPage />
        </PrivateRoute>
        <PrivateRoute path={'/admin-dashBoard/orders'} requiredRole="admin">
          <AdminDashBoardOrdersPage />
        </PrivateRoute>
        <PrivateRoute path={'/register-admin'} requiredRole="admin">
          <RegisterationAdminComponent />
        </PrivateRoute>
        <Route path={'/products'} exact component={ProductsPage} />
        <Route path={'/products/:id'} exact component={SingleProductPage} />
        <Route path={'/login-user'} component={LoginUserComponent} />
        <Route path={'/login-admin'} component={LoginAdminComponent} />
        <Route path={'/register-user'} component={RegisterationUserComponent} />
        <Route path={'/wishList'} component={WishListComponent} />
        <Route path={'/shoppingCart'} component={ShoppingCartComponent} />
        <Route path={'/checkOut'} component={checkoutcomponent} />
        <Route path={'/subCategory/:id'} exact component={SubCategoryPage} />
        <Route path={'/FAQ'} exact component={FaqComponent} />
        <Route path={'/search/:id'}>
          <Search />
        </Route>
        <Route path={'/editProduct'} exact component={EditProductForm} />
        <PrivateRoute path={'/profile/:id'} requiredRole="userById">
          <UserProfilePage />
        </PrivateRoute>
        <Route path={'/logout'} component={Logout} />
        <Route path={'*'} component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
