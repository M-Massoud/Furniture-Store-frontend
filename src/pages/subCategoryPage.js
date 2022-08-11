import { useState, useEffect } from 'react';
import axiosInstance from '../network/Config';
import { useParams } from 'react-router-dom';
import Spinner from "../components/spinner";
import CardComponent from '../components/cardComponent/cardComponent';
import SidebarComponent from '../components/sidebarComponent/sidebarComponent';

export default function SubCategoryPage({ title }) {
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [keyword, setKeword] = useState('products');

  // const [keyword, setKeword] = useState('products');

  const params = useParams();
  const [subCategoryProductsPageData, setSubCategoryProductsPageData] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(1);
  const [isLoded, setIsLoded] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/subCategory/${params.id}`)
      // .get(`/${keyword}`)
      .then(res => {
        // setProductsData(res.data.data.products);
        setsubCategoryData(res.data.products);
        setIsLoded(true);
        document.title = `${title} | ${res.data.title}`;
        const maxItemsNumberInPage = 2;
        const numberOfProductsInSubCategories = res.data.products.length;
        setMaxPagesNumber(
          Math.ceil(numberOfProductsInSubCategories / maxItemsNumberInPage)
        );
        const startFromSelectedItemId =
          currentPage * maxItemsNumberInPage - maxItemsNumberInPage;
        const endToSelectedItemId = currentPage * maxItemsNumberInPage;
        let newArr = [...res.data.products];
        setSubCategoryProductsPageData(
          newArr.slice(startFromSelectedItemId, endToSelectedItemId)
        );
      })
      .catch(err => { console.log(err); document.title = `Furniture Store`; });
  }, [currentPage, keyword]);
  // console.log('productsData', subCategoryData);

  function handleSubCategoryLink(e) {
    const clickedLi = e.target.closest('li');
    const subCategoryId = clickedLi.dataset.subcategoryid;
    setKeword(`subCategory/${subCategoryId}`);
    console.log(clickedLi, subCategoryId, keyword);
  }

  function previousPage() {
    scrollToTop();
    currentPage > 1
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(currentPage);
  }

  function nextPage() {
    scrollToTop();
    currentPage < maxPagesNumber
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  }

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-3 col-lg-3">
            <SidebarComponent handleSubCategoryLink={handleSubCategoryLink} />
          </div>
          {isLoded ?
            subCategoryData.length > 0 ?
              <div className="col col-sm-8 col-md-9 col-lg-9">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4 ">
                  {subCategoryProductsPageData.map(product => {
                    return (
                      <div className="col" key={product._id}>
                        <CardComponent product={product} />
                      </div>
                    );
                  })}
                </div>
              </div> :
              <h1 className='my-5 text-center'>No Products To Show</h1> :
            <Spinner />}
        </div>
        <nav className='d-flex justify-content-center my-5 mx-5' aria-label="...">
          <ul className="pagination">
            <li className={currentPage === 1 ? "page-item  disabled" : "page-item "}>
              <span className="page-link" role="button" onClick={() => previousPage()}>Previous</span>
            </li>
            {currentPage === 1 ? <li className="page-item active" aria-current="page">
              <span className="page-link" onClick={() => setCurrentPage(1)}>{currentPage}</span>
            </li> : <li className="page-item"><button className="page-link" onClick={() => { setCurrentPage(1); scrollToTop(); }}>1</button></li>}
            {maxPagesNumber >= 2 ? currentPage === 2 ? <li className="page-item active" aria-current="page">
              <span className="page-link">{currentPage}</span>
            </li> : <li className="page-item" onClick={() => setCurrentPage(2)}><button className="page-link" onClick={() => { setCurrentPage(2); scrollToTop(); }}>2</button></li> : ''}
            {maxPagesNumber >= 3 ? currentPage === 3 ? <li className="page-item active" aria-current="page">
              <span className="page-link" onClick={() => setCurrentPage(3)}>{currentPage}</span>
            </li> : <li className="page-item"><button className="page-link" onClick={() => { setCurrentPage(3); scrollToTop(); }}>3</button></li> : ''}
            {((maxPagesNumber !== 4) && (currentPage > 3)) ? <li className="page-item"><button className="page-link disabled">...</button></li> : ''}
            {currentPage > 3 ? <li className="page-item active" aria-current="page">
              <span className="page-link">{currentPage}</span>
            </li> : ''}
            {maxPagesNumber > 5 ? currentPage < maxPagesNumber - 2 ? <li className="page-item"><button className="page-link disabled">...</button></li> : '' : ''}
            {maxPagesNumber > 4 ? currentPage < maxPagesNumber - 1 ? <li className="page-item"><button className="page-link" onClick={() => { setCurrentPage(maxPagesNumber - 1); scrollToTop(); }}>{maxPagesNumber - 1}</button></li> : '' : ''}
            {maxPagesNumber > 3 ? currentPage < maxPagesNumber ? <li className="page-item"><button className="page-link" onClick={() => { setCurrentPage(maxPagesNumber); scrollToTop(); }}>{maxPagesNumber}</button></li> : '' : ''}
            <li className={currentPage === maxPagesNumber ? "page-item  disabled" : "page-item"}>
              <button className="page-link" onClick={() => nextPage()}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
