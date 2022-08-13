// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-notifications-component/dist/theme.css'

import PrivateRoute from "./components/privateRoute/PrivateRoute";
import LoggedInAccessRestrictRoute from "./components/privateRoute/LoggedInAccessRestrictRoute";
import NavBar from './components/NavBar/NewNav/NewNav';
import Main from './components/itemsComponent/Mainpage';
// import admin dashboard pages
import AdminDashBoardUsersPage from "./components/adminDashBordUsersComponent/adminDashBordUsersComponent";
import AdminDashBoardCategoriesPage from "./components/adminDashBordCategoriesComponent/adminDashBordCategoriesComponent";
import AdminDashBoardSubCategoriesPage from "./components/adminDashBordSubCategoriesComponent/adminDashBordSubCategoriesComponent";
import AdminDashBoardProductsPage from "./components/adminDashBordProductsComponent/adminDashBordProductsComponent";
import AdminDashBoardOrdersPage from "./components/adminDashBordOrdersComponent/adminDashBordOrdersComponent";
// import products and sub-categories forms
import AddProductForm from './components/productForm/addProductForm';
import EditProductForm from './components/productForm/editProductForm';
import AddCategoryForm from "./components/categoryForm/addCategoryForm";
import EditCategoryForm from "./components/categoryForm/editCategoryForm";
import AddSubCategoryForm from "./components/subCategoryForm/addSubCategoryForm";
import EditSubCategoryForm from "./components/subCategoryForm/editSubCategoryForm";
// import login and register pages
import LoginAdminComponent from './components/loginAdminComponent/LoginAdminComponent';
import LoginUserComponent from './components/loginUserComponent/LoginUserComponent';
import RegisterationAdminComponent from './components/registerationAdminComponent/RegisterationAdminComponent';
import RegisterationUserComponent from './components/registerationUserComponent/RegisterationUserComponent';
// import forget password pages 
import ForgetAdminPassworPage from './components/forgetpasswordComponent/ForgetAdminPassword';
import ForgetUserPasswordPage from './components/forgetpasswordComponent/ForgetUserpasswordComponent';
// import personal profiles and edit them pages
import AdminProfile from './components/adminProfileComponent/adminProfilePage';
import UserProfilePage from "./pages/userProfilePage";
import EditAdminProfileForm from './components/adminProfileComponent/editAdminProfile';
import EditUserProfileForm from './components/userProfileComponent/editUserProfile';
import ChangePasswordComponent from './components/changePasswordComponent/changePasswordComponent';
// import shop pages
import ShoppingCartComponent from './components/shoppingCartComponent/ShoppingCartComponent';
import CheckoutSuccess from "./pages/checkoutSuccessPage";
import WishListComponent from './components/wishListComponent/WishListComponent';
import StoredPaymentMethods from "./components/storedPaymentMethodsComponent/StoredPaymentMethodsComponent";
import UserOrders from "./components/userOrdersComponent/UserOrdersComponent";
import ProductsPage from './pages/productsPage';
import SingleProductPage from './pages/singleProductPage';
import SubCategoryPage from './pages/subCategoryPage';
// import static pages 
import FaqComponent from './components/faqComponent/FaQComponent';
import ReturnPolicyPage from "./components/ReturnPolicy/ReturnPolicy"
import AboutUsPage from "./components/About-Us/AboutUs"
import GuaranteePage from "./components/guarantee/Guarntee"
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import NotFound from './components/404/NotFound';

function App() {
  return (
    <Router>
      <ReactNotifications />
      <NavBar />
      <Switch>
        <Route path={'/'} exact component={() => <Main title='Furniture Store | Home' />} />
        <PrivateRoute path={'/admin-dashBoard'} component={() => <AdminDashBoardUsersPage title='DashBoard | Users' />} exact requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/categories'} component={() => <AdminDashBoardCategoriesPage title='DashBoard | Categories' />} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/subCategories'} component={() => <AdminDashBoardSubCategoriesPage title='DashBoard | SubCategories' />} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/products'} component={() => <AdminDashBoardProductsPage title='DashBoard | Products' />} requiredRole="admin" />
        <PrivateRoute path={'/admin-dashBoard/orders'} component={() => <AdminDashBoardOrdersPage title='DashBoard | Orders' />} requiredRole="admin" />

        <PrivateRoute path={'/addProduct'} component={() => <AddProductForm title='DashBoard | Add Product' />} requiredRole="admin" />
        <PrivateRoute path={'/editProduct'} component={EditProductForm} requiredRole="admin" />
        <PrivateRoute path={'/addCategory'} component={() => <AddCategoryForm title='DashBoard | Add Category' />} requiredRole="admin" />
        <PrivateRoute path={'/editCategory'} component={EditCategoryForm} requiredRole="admin" />
        <PrivateRoute path={'/addSubCategory'} component={() => <AddSubCategoryForm title='DashBoard | Add SubCategory' />} requiredRole="admin" />
        <PrivateRoute path={'/editSubCategory'} component={EditSubCategoryForm} requiredRole="admin" />

        <LoggedInAccessRestrictRoute path={'/login-admin'} component={() => <LoginAdminComponent title='Furniture Store | Login Admin' />} />
        <PrivateRoute path={'/register-admin'} component={() => <RegisterationAdminComponent title='Furniture Store | Register Admin' />} requiredRole="admin" />
        <LoggedInAccessRestrictRoute path={'/login-user'} component={() => <LoginUserComponent title='Furniture Store | Login User' />} />
        <LoggedInAccessRestrictRoute path={'/register-user'} component={() => <RegisterationUserComponent title='Furniture Store | Register User' />} />
        <LoggedInAccessRestrictRoute path={'/forgetAdminPassword'} component={() => <ForgetAdminPassworPage title='Furniture Store | Forgot Admin Password' />} />
        <LoggedInAccessRestrictRoute path={'/forgetUserPassword'} component={() => <ForgetUserPasswordPage title='Furniture Store | Forgot User Password' />} />
        
        <PrivateRoute path={'/profile/admin'} exact component={() => <AdminProfile title='Furniture Store | Admin Profile' />} requiredRole="admin" />
        <PrivateRoute path={'/profile/:id'} exact component={() => <UserProfilePage title='Furniture Store | User Profile' />} requiredRole="userById" />

        <PrivateRoute path={'/adminedit'} exact component={EditAdminProfileForm} requiredRole="admin" />
        <PrivateRoute path={'/useredit/:id'} exact component={EditUserProfileForm} requiredRole="userById" />
        <PrivateRoute path={'/adminedit/:id/changePassword'} exact component={ChangePasswordComponent} requiredRole="admin" />
        <PrivateRoute path={'/useredit/:id/changePassword'} exact component={ChangePasswordComponent} requiredRole="userById" />

        <PrivateRoute path={'/shoppingCart'} component={() => <ShoppingCartComponent title='Furniture Store | Shopping Cart' />} requiredRole="user" />
        <PrivateRoute path={'/checkout/success'} component={() => <CheckoutSuccess title='Furniture Store | Checkout Success' />} requiredRole="user" />

        <PrivateRoute path={'/wishlist'} component={() => <WishListComponent title='Furniture Store | Wish List' />} requiredRole="user" />
        <PrivateRoute path={'/storedPaymentMethods'} component={() => <StoredPaymentMethods title='Furniture Store | Stored Payment Method' />} requiredRole="user" />
        <PrivateRoute path={'/orders'} component={() => <UserOrders title='Furniture Store | Orders' />} requiredRole="user" />

        <Route path={'/products'} exact component={() => <ProductsPage title='Furniture Store | Products' />} />
        <Route path={'/products/:id'} exact component={() => <SingleProductPage title='Products' />} />
        <Route path={'/subCategory/:id'} exact component={() => <SubCategoryPage title='SubCategory' />} />
        <Route path={'/FAQ'} exact component={() => <FaqComponent title='Furniture Store | FAQ' />} />
        <Route path={'/search/:id'} component={() => <Search title='Search' />} />
        <Route path={'/return-policy'} exact component={() => <ReturnPolicyPage title='Furniture Store | Return Policy' />} />
        <Route path={'/about-us'} exact component={() => <AboutUsPage title='Furniture Store | About Us' />} />
        <Route path={'/our-guarantee'} exact component={() => <GuaranteePage title='Furniture Store | Our Guarantee' />} />
        <Route path={'*'} component={() => <NotFound title='Furniture Store | Page Not Found' />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

