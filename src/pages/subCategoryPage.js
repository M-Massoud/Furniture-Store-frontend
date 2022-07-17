import { useState, useEffect } from 'react';
import axiosInstance from '../network/Config';
import { useParams } from 'react-router-dom';

import CardComponent from '../components/cardComponent/cardComponent';
import SidebarComponent from '../components/sidebarComponent/sidebarComponent';
export default function SubCategoryPage() {
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [keyword, setKeword] = useState('products');

  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(1);

  useEffect(() => {
    axiosInstance
      // .get(`/products/page/${currentPage}`)
      .get(`/${keyword}`)

      .then(res => {
        // setProductsData(res.data.data.products);
        if (keyword === 'products') setsubCategoryData(res.data);
        else setsubCategoryData(res.data.products);
        setMaxPagesNumber(res.data.data.maxPagesNumber);
      })
      .catch(err => console.log(err));
  }, [keyword]);
  // console.log('productsData', subCategoryData);

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
              {/* <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent /> */}

              {subCategoryData.map(product => {
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
