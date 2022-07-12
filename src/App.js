// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './components/itemsComponent/Mainpage';
import LoginComponent from './components/loginComponent/LoginComponent';
import RegisterationComponent from './components/registerationComponent/RegisterationComponent';
import WishListComponent from './components/wishListComponent/WishListComponent';
import ShoppingCartComponent from './components/shoppingCartComponent/ShoppingCartComponent';
import checkoutcomponent from './components/checkoutcomponent';
import ProductsPage from './pages/productsPage';

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
        {/* <Route path={'*'} component={PageNotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
