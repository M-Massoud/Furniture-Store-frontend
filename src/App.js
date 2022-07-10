// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./components/itemsComponent/Mainpage";
import CardComponent from './components/cardComponent/cardComponent';
function App() {
  return (
    <>
      <div className="container-fluid  bg-light">
        <Main/>
      </div>

      <CardComponent />
    </>
  );
}

export default App;
