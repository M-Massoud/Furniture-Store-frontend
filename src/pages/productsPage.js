/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import axiosInstance from '../network/Config';


import CardComponent from '../components/cardComponent/cardComponent';
import SidebarComponent from '../components/sidebarComponent/sidebarComponent';

export default function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(1);
  const [itemCount, setItemCount] = useState(10);
  const [keyword, setKeword] = useState('products');
  const [sort, setSort] = useState("");
  console.log(keyword)
  let sorted = keyword

  useEffect(() => {
    axiosInstance
      .get(`/${sorted}`, {
        params: {
          page: currentPage,
          itemCount: itemCount,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        setProductsData(res.data.resData.products);
        setMaxPagesNumber(res.data.resData.maxPagesNumber);
      })
      .catch(err => console.log(err));
  }, [currentPage, itemCount, keyword]);

  function handleSubCategoryLink(e) {
    const clickedLi = e.target.closest('li');
    const subCategoryId = clickedLi.dataset.subcategoryid;
    setKeword(`subCategory/${subCategoryId}`);
    console.log(clickedLi, subCategoryId, keyword);
  }

  function previousPage() {
    currentPage > 1
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(currentPage);
  }

  function nextPage() {
    currentPage < maxPagesNumber
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  }
  const handleSorting = (e) => {
    setSort(e.target.value);
    if (e.target.value === "atoz") {
      setKeword("atoz");
    } else if (e.target.value === "ztoa") {
      setKeword("ztoa");
    } else if (e.target.value === "highprice") {
      setKeword("highprice");
    } else if (e.target.value === "lowprice") {
      setKeword("lowprice");
    }
  };
  const handleReset = (e) => {
    setKeword("products");
    setSort('products')
  }

  function changeItemPerPage(event) {
    setItemCount(event.target.value);
  }

  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-3 col-lg-3">
            <SidebarComponent handleSubCategoryLink={handleSubCategoryLink} />
          </div>
          <div className="col col-sm-8 col-md-9 col-lg-9">
            <div className="  mb-4 px-4 py-4">
              <select onChange={handleSorting} value={sort} className="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                <option checked value="products">Sort Products</option>
                <option value="atoz" >atoz</option>
                <option value="ztoa">ztoa</option>
                <option value="lowprice">lowprice</option>
                <option value="highprice">highprice</option>
              </select>
              <button className="btn btn-danger" onClick={handleReset}>reset</button>
            </div>
            <div className='col-3'>
              <select onChange={(event) => changeItemPerPage(event)} defaultValue="10" className="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                <option checked disabled>Products Per Page</option>
                <option value="5" >5</option>
                <option value="10" >10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4 ">
              {productsData.map(product => {
                return (
                  <div className="col" key={product._id}>
                    <CardComponent product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <nav className='my-5 mx-5' aria-label="...">
          <ul className="pagination">
            <li className={currentPage === 1 ? "page-item  disabled" : "page-item "}>
              <span className="page-link" role="button" onClick={() => previousPage()}>Previous</span>
            </li>
            {currentPage === 1 ? <li className="page-item active" aria-current="page">
              <span className="page-link" onClick={() => setCurrentPage(1)}>{currentPage}</span>
            </li> : <li className="page-item"><button className="page-link" onClick={() => setCurrentPage(1)}>1</button></li>}
            {maxPagesNumber >= 2 ? currentPage === 2 ? <li className="page-item active" aria-current="page">
              <span className="page-link">{currentPage}</span>
            </li> : <li className="page-item" onClick={() => setCurrentPage(2)}><button className="page-link" onClick={() => setCurrentPage(2)}>2</button></li> : ''}
            {maxPagesNumber >= 3 ? currentPage === 3 ? <li className="page-item active" aria-current="page">
              <span className="page-link" onClick={() => setCurrentPage(3)}>{currentPage}</span>
            </li> : <li className="page-item"><button className="page-link" onClick={() => setCurrentPage(3)}>3</button></li> : ''}
            {((maxPagesNumber !== 4) && (currentPage > 3)) ? <li className="page-item"><button className="page-link disabled">...</button></li> : ''}
            {currentPage > 3 ? <li className="page-item active" aria-current="page">
              <span className="page-link">{currentPage}</span>
            </li> : ''}
            {maxPagesNumber > 5 ? currentPage < maxPagesNumber - 2 ? <li className="page-item"><button className="page-link disabled">...</button></li> : '' : ''}
            {maxPagesNumber > 4 ? currentPage < maxPagesNumber - 1 ? <li className="page-item"><button className="page-link" onClick={() => setCurrentPage(maxPagesNumber - 1)}>{maxPagesNumber - 1}</button></li> : '' : ''}
            {maxPagesNumber > 3 ? currentPage < maxPagesNumber ? <li className="page-item"><button className="page-link" onClick={() => setCurrentPage(maxPagesNumber)}>{maxPagesNumber}</button></li> : '' : ''}
            <li className={currentPage === maxPagesNumber ? "page-item  disabled" : "page-item"}>
              <button className="page-link" onClick={() => nextPage()}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
