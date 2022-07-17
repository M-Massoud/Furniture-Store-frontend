import { useState, useEffect } from 'react';
import axiosInstance from '../network/Config';

import CardComponent from '../components/cardComponent/cardComponent';
import SidebarComponent from '../components/sidebarComponent/sidebarComponent';

export default function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(1);
  const [keyword, setKeword] = useState('products');

  useEffect(() => {
    axiosInstance
      // .get(`/products/page/${currentPage}`)
      .get(`/${keyword}`)

      .then(res => {
        // setProductsData(res.data.data.products);
        if (keyword === 'products') setProductsData(res.data);
        else setProductsData(res.data.products);
        setMaxPagesNumber(res.data.data.maxPagesNumber);
      })
      .catch(err => console.log(err));
  }, [keyword]);

  // console.log('productsData:', productsData);

  function handleSubCategoryLink(e) {
    const clickedLi = e.target.closest('li');
    const subCategoryId = clickedLi.dataset.subcategoryid;
    setKeword(`subCategory/${subCategoryId}`);
    console.log(clickedLi, subCategoryId, keyword);
  }
  // console.log('productsData');
  // console.log(productsData);

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
              {/* <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent /> */}

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
        <div className="flex-space-around my-5">
          <button
            className="btn bg-secondary-1 white"
            onClick={() => previousPage()}
          >
            Previous
          </button>

          <button
            className="btn bg-secondary-1 white"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
