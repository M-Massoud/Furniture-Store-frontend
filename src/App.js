// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./components/itemsComponent/Mainpage";
import CardComponent from './components/cardComponent/cardComponent';
import LoginComponent from "./components/loginComponent/LoginComponent";
import RegisterationComponent from "./components/registerationComponent/RegisterationComponent";
import WishListComponent from "./components/wishListComponent/WishListComponent";
import ShoppingCartComponent from "./components/shoppingCartComponent/ShoppingCartComponent";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/products'} component={CardComponent} />
        <Route path={'/login'} component={LoginComponent} />
        <Route path={'/register'} component={RegisterationComponent} />
        <Route path={'/wishList'} component={WishListComponent} />
        <Route path={'/shoppingCart'} component={ShoppingCartComponent} />
        {/* <Route path={'*'} component={PageNotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
