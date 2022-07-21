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

  useEffect(() => {
    axiosInstance
      .get(`/${keyword}`, {
        params: {
          page: currentPage,
          itemCount: itemCount,
        },
      })

      .then(res => {
        setProductsData(res.data.resData.products);
        setMaxPagesNumber(res.data.resData.maxPagesNumber);
      })
      .catch(err => console.log(err));
  }, [currentPage, keyword]);

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

  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-3 col-lg-3">
            <SidebarComponent handleSubCategoryLink={handleSubCategoryLink} />
          </div>
          <div className="col col-sm-8 col-md-9 col-lg-9">
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
        <nav className="my-5 mx-5" aria-label="...">
          <ul className="pagination">
            <li
              className={
                currentPage === 1 ? 'page-item  disabled' : 'page-item '
              }
            >
              <span className="page-link" onClick={() => previousPage()}>
                Previous
              </span>
            </li>
            {currentPage === 1 ? (
              <li className="page-item active" aria-current="page">
                <span className="page-link" onClick={() => setCurrentPage(1)}>
                  {currentPage}
                </span>
              </li>
            ) : (
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </a>
              </li>
            )}
            {maxPagesNumber >= 2 ? (
              currentPage === 2 ? (
                <li className="page-item active" aria-current="page">
                  <span className="page-link">{currentPage}</span>
                </li>
              ) : (
                <li className="page-item" onClick={() => setCurrentPage(2)}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </a>
                </li>
              )
            ) : (
              ''
            )}
            {maxPagesNumber >= 3 ? (
              currentPage === 3 ? (
                <li className="page-item active" aria-current="page">
                  <span className="page-link" onClick={() => setCurrentPage(3)}>
                    {currentPage}
                  </span>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </a>
                </li>
              )
            ) : (
              ''
            )}
            {currentPage > 3 ? (
              <li className="page-item">
                <a className="page-link disabled" href="#">
                  ...
                </a>
              </li>
            ) : (
              ''
            )}
            {currentPage > 3 ? (
              <li className="page-item active" aria-current="page">
                <span className="page-link">{currentPage}</span>
              </li>
            ) : (
              ''
            )}
            {maxPagesNumber > 5 ? (
              currentPage < maxPagesNumber - 2 ? (
                <li className="page-item">
                  <a className="page-link disabled" href="">
                    ...
                  </a>
                </li>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {maxPagesNumber > 4 ? (
              currentPage < maxPagesNumber - 1 ? (
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => setCurrentPage(maxPagesNumber - 1)}
                  >
                    {maxPagesNumber - 1}
                  </a>
                </li>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {maxPagesNumber > 3 ? (
              currentPage < maxPagesNumber ? (
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => setCurrentPage(maxPagesNumber)}
                  >
                    {maxPagesNumber}
                  </a>
                </li>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            <li
              className={
                currentPage === maxPagesNumber
                  ? 'page-item  disabled'
                  : 'page-item'
              }
            >
              <a className="page-link" href="#" onClick={() => nextPage()}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
