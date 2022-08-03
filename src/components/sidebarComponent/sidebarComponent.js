import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../network/Config';
import './sidebarComponent.css';

export default function SidebarComponent(probs) {
  const [categories, setCategories] = useState([]);
  // console.log('probs:', probs);

  useEffect(() => {
    axiosInstance
      .get('/category')
      .then(res => setCategories(res.data.resData.categories))
      .catch(err => console.log(err));
  }, []);
  // console.log('---------------- category data -------');
  // console.log(categories);

  // the react fragment to solve the key error because <> is redundant in our case
  return (
    <>
      <div className="accordion shadow mb-4" id="categories-accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h5>categories</h5>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#categories-accordion"
          >
            <div className="accordion-body">
            <Link className='btn border-0 font-bold text-dark link-danger' to={'/products'}>
                <h5>All Products</h5>
              </Link>

              {categories.map(category => {
                return (
                  <React.Fragment key={category._id}>
                    <h6>{category.title}</h6>

                    <span>
                      <ul onClick={probs.handleSubCategoryLink}>
                        {category.subCategory.map((subCategory, index) => {
                          return (
                            <React.Fragment key={index}>
                              <li data-subcategoryid={subCategory._id}>
                              <Link className='btn border-0 text-secondary link-danger' to={`/subCategory/${subCategory._id}`}>
                                  {subCategory.title}
                                </Link>
                              </li>
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
