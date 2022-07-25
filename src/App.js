// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Main from './components/itemsComponent/Mainpage';
import LoginComponent from './components/loginComponent/LoginComponent';
import RegisterationComponent from './components/registerationComponent/RegisterationComponent';
import WishListComponent from './components/wishListComponent/WishListComponent';
import ShoppingCartComponent from './components/shoppingCartComponent/ShoppingCartComponent';
import checkoutcomponent from './components/checkoutcomponent/CheckoutComponent';
import ProductsPage from './pages/productsPage';
import SingleProductPage from './pages/singleProductPage';
import SubCategoryPage from './pages/subCategoryPage';
import AdminDashBoardPage from "./pages/adminDashBoardPage";
import NotFound from './components/404/NotFound';
import FaqComponent from './components/faqComponent/FaQComponent';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import ProductForm from './components/productForm/productForm';
import UserProfile from './components/userProfileComponent/userProfilePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={UserProfile} />
        <Route path={'/products'} exact component={ProductsPage} />
        <Route path={'/products/:id'} exact component={SingleProductPage} />
        <Route path={'/login'} component={LoginComponent} />
        <Route path={'/register'} component={RegisterationComponent} />
        <Route path={'/wishList'} component={WishListComponent} />
        <Route path={'/shoppingCart'} component={ShoppingCartComponent} />
        <Route path={'/checkOut'} component={checkoutcomponent} />
        <Route path={'/subCategory/:id'} exact component={SubCategoryPage} />
        <Route path={'/FAQ'} exact component={FaqComponent} />
        <Route path={"/search/:id"}  ><Search /></Route>
        <Route path={'/admin-dashBoard'} component={AdminDashBoardPage} />
        <Route path={'*'} component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
