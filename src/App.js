// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './components/itemsComponent/Mainpage';
import LoginComponent from './components/loginComponent/LoginComponent';
import RegisterationComponent from './components/registerationComponent/RegisterationComponent';
import WishListComponent from './components/wishListComponent/WishListComponent';
import ShoppingCartComponent from './components/shoppingCartComponent/ShoppingCartComponent';
import checkoutcomponent from './components/checkoutcomponent/CheckoutComponent';
import ProductsPage from './pages/productsPage';
import SubCategory from './pages/subCategoryPage';
import FaqComponent from './components/faqComponent/FaQComponent';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/products'} component={ProductsPage} />
        <Route path={'/login'} component={LoginComponent} />
        <Route path={'/register'} component={RegisterationComponent} />
        <Route path={'/wishList'} component={WishListComponent} />
        <Route path={'/shoppingCart'} component={ShoppingCartComponent} />
        <Route path={'/checkOut'} component={checkoutcomponent} />
        <Route path={'/subCategory/:id'} component={SubCategory} />
        {/* <Route path={'*'} component={PageNotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
