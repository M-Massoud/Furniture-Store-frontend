// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
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
// import CheckoutPage from "./pages/checkoutPage";
import ProductsPage from './pages/productsPage';
import SingleProductPage from './pages/singleProductPage';
import SubCategoryPage from './pages/subCategoryPage';
import AdminDashBoardUsersPage from "./components/adminDashBordUsersComponent/adminDashBordUsersComponent";
import AdminDashBoardCategoriesPage from "./components/adminDashBordCategoriesComponent/adminDashBordCategoriesComponent";
import AdminDashBoardSubCategoriesPage from "./components/adminDashBordSubCategoriesComponent/adminDashBordSubCategoriesComponent";
import AdminDashBoardProductsPage from "./components/adminDashBordProductsComponent/adminDashBordProductsComponent";
import AdminDashBoardOrdersPage from "./components/adminDashBordOrdersComponent/adminDashBordOrdersComponent";
import NotFound from './components/404/NotFound';
import FaqComponent from './components/faqComponent/FaQComponent';
import NavBar from './components/NavBar/NewNav/NewNav';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import AddProductForm from './components/productForm/addProductForm';
import UserProfilePage from "./pages/userProfilePage";
import EditProductForm from './components/productForm/editProductForm';
// import Logout from "./components/logoutComponent/LogoutComponent";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CheckoutSuccess from "./pages/checkoutSuccessPage";


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path={'/'} exact component={Main} />
        <PrivateRoute path={'/admin-dashBoard'} requiredRole="admin">
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
        <PrivateRoute path={'/addProduct'} requiredRole="admin">
          <AddProductForm />
        </PrivateRoute>
        <PrivateRoute path={'/editProduct'} requiredRole="admin">
          <EditProductForm />
        </PrivateRoute>
        <PrivateRoute path={'/register-admin'} requiredRole="admin">
          <RegisterationAdminComponent />
        </PrivateRoute>
        {/* <PrivateRoute path={'/login-user'} requiredRole="unAuthenticated">
          <LoginUserComponent />
        </PrivateRoute> */}
        <Route path={'/login-user'} component={LoginUserComponent} />
        <Route path={'/login-admin'} component={LoginAdminComponent} />
        {/* <PrivateRoute path={'/login-admin'} requiredRole="unAuthenticated">
          <LoginAdminComponent />
        </PrivateRoute> */}
        <PrivateRoute path={'/register-user'} requiredRole="unAuthenticated">
          <RegisterationUserComponent />
        </PrivateRoute>
        {/* <PrivateRoute path={'/checkout'} requiredRole="user">
          <CheckoutPage />
        </PrivateRoute> */}
        <PrivateRoute path={'/profile/:id'} requiredRole="userById">
          <UserProfilePage />
        </PrivateRoute>
        <PrivateRoute path={'/wishList'} requiredRole="userById">
          <WishListComponent />
        </PrivateRoute>
        <PrivateRoute path={'/shoppingCart'} requiredRole="user">
          <ShoppingCartComponent />
        </PrivateRoute>
        <PrivateRoute path={'/checkout/success'} requiredRole="user">
          <CheckoutSuccess />
        </PrivateRoute>
        <Route path={'/products'} exact component={ProductsPage} />
        <Route path={'/products/:id'} exact component={SingleProductPage} />
        {/* <Route path={'/checkOut'} component={checkoutcomponent} /> */}
        <Route path={'/subCategory/:id'} exact component={SubCategoryPage} />
        <Route path={'/FAQ'} exact component={FaqComponent} />
        <Route path={'/search/:id'}>
          <Search />
        </Route>
        {/* <Route path={'/logout'} component={Logout} /> */}
        <Route path={'*'} component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;