// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-notifications-component/dist/theme.css'

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
import ForgetUserPasswordPage from './components/forgetpasswordComponent/ForgetUserpasswordComponent';
import ForgetAdminPassworPage from './components/forgetpasswordComponent/ForgetAdminPassword';
import UserProfilePage from "./pages/userProfilePage";
import EditUserProfileForm from './components/userProfileComponent/editUserProfile';
import AdminProfile from './components/adminProfileComponent/adminProfilePage';
import EditAdminProfileForm from './components/adminProfileComponent/editAdminProfile';
import EditProductForm from './components/productForm/editProductForm';
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import LoggedInAccessRestrictRoute from "./components/privateRoute/LoggedInAccessRestrictRoute";
import CheckoutSuccess from "./pages/checkoutSuccessPage";
import AddCategoryForm from "./components/categoryForm/addCategoryForm";
import EditCategoryForm from "./components/categoryForm/editCategoryForm";
import AddSubCategoryForm from "./components/subCategoryForm/addSubCategoryForm";
import EditSubCategoryForm from "./components/subCategoryForm/editSubCategoryForm";

function App() {
  return (
    <Router>
      <ReactNotifications />
      <NavBar />
      <Switch>
        <Route path={'/'} exact component={Main} />
        <PrivateRoute path={'/admin-dashBoard'} component={AdminDashBoardUsersPage} exact requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/categories'} component={AdminDashBoardCategoriesPage} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/subCategories'} component={AdminDashBoardSubCategoriesPage} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/products'} component={AdminDashBoardProductsPage} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/orders'} component={AdminDashBoardOrdersPage} requiredRole="admin" />
        <PrivateRoute path={'/addProduct'} component={AddProductForm} requiredRole="admin" />
        <PrivateRoute path={'/editProduct'} component={EditProductForm} requiredRole="admin" />
        <PrivateRoute path={'/addCategory'} component={AddCategoryForm} requiredRole="admin" />
        <PrivateRoute path={'/editCategory'} component={EditCategoryForm} requiredRole="admin" />
        <PrivateRoute path={'/addSubCategory'} component={AddSubCategoryForm} requiredRole="admin" />
        <PrivateRoute path={'/editSubCategory'} component={EditSubCategoryForm} requiredRole="admin" />
        <LoggedInAccessRestrictRoute path={'/login-admin'} component={LoginAdminComponent} />
        <PrivateRoute path={'/register-admin'} component={RegisterationAdminComponent} requiredRole="admin" />
        <LoggedInAccessRestrictRoute path={'/login-user'} component={LoginUserComponent} />
        <LoggedInAccessRestrictRoute path={'/register-user'} component={RegisterationUserComponent} />
        <PrivateRoute path={'/shoppingCart'} component={ShoppingCartComponent} requiredRole="user" />
        {/* <PrivateRoute path={'/checkout'} component={CheckoutPage} requiredRole="user" /> */}
        <PrivateRoute path={'/checkout/success'} component={CheckoutSuccess} requiredRole="user" />
        <PrivateRoute path={'/wishlist'} component={WishListComponent} requiredRole="user" />
        <PrivateRoute path={'/profile/:id'} component={UserProfilePage} requiredRole="userById" />

        <PrivateRoute path={'/admin/:id'} component={AdminProfile} requiredRole="admin"/>

        <Route path={'/useredit/:id'} exact component={EditUserProfileForm} />
        <Route path={'/adminedit/:id'} exact component={EditAdminProfileForm} />
        <Route path={'/forgetAdminPassword'} exact component={ForgetAdminPassworPage} />
        <Route path={'/forgetUserPassword'} exact component={ForgetUserPasswordPage} />

        <Route path={'/products'} exact component={ProductsPage} />
        <Route path={'/products/:id'} exact component={SingleProductPage} />
        {/* <Route path={'/checkOut'} component={checkoutcomponent} /> */}
        <Route path={'/subCategory/:id'} exact component={SubCategoryPage} />
        <Route path={'/FAQ'} exact component={FaqComponent} />
        <Route path={'/search/:id'} component={Search} />
        <Route path={'/addProudct'} exact component={AddProductForm} />
        <Route path={'*'} component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;