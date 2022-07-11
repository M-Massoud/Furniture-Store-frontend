import Main from './Mainpage';

function NavBar(props) {
  let listItem1 = document.getElementById('item1');
  let listItem2 = document.getElementById('item2');
  let listItem3 = document.getElementById('item3');
  let listItem4 = document.getElementById('item4');
  const displayFun1 = () => {
    listItem3.classList.add('d-none');
    listItem2.classList.add('d-none');
    listItem1.classList.remove('d-none');
    listItem4.classList.add('d-none');
  };
  const displayFun2 = () => {
    listItem4.classList.add('d-none');
    listItem3.classList.add('d-none');
    listItem2.classList.remove('d-none');
    listItem1.classList.add('d-none');
  };
  const displayFun3 = () => {
    listItem4.classList.add('d-none');
    listItem3.classList.remove('d-none');
    listItem1.classList.add('d-none');
    listItem2.classList.add('d-none');
  };
  const displayFun4 = () => {
    listItem3.classList.add('d-none');
    listItem1.classList.add('d-none');
    listItem2.classList.add('d-none');
    listItem4.classList.remove('d-none');
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li
                className="nav-item active itemlist "
                onClick={() => displayFun1()}
              >
                {props.living}
              </li>
              <li
                className="nav-item itemlist ms-4"
                onClick={() => displayFun2()}
              >
                {props.Bed}
              </li>
              <li
                className="nav-item itemlist ms-4"
                onClick={() => displayFun3()}
              >
                {props.Dining}
              </li>
              <li
                className="nav-item itemlist ms-4"
                onClick={() => displayFun4()}
              >
                {props.Gard}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

{
  /* <button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
aria-controls="navbarNav"
aria-expanded="false"
aria-label="Toggle navigation"
>
<span className="navbar-toggler-icon"></span>
</button> */
}
