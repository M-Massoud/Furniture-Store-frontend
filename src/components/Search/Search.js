import React, { useEffect, useState } from 'react'
import axiosInstance from '../../network/Config';
import CardComponent from '../cardComponent/cardComponent';
import { useLocation } from 'react-router-dom';
function Search() {
    const location = useLocation();
    const [searchData, setSearchData] = useState("");
    const { searchWord } = location.state;
    // console.log(searchWord)
    // console.log(searchData)
    useEffect(() => {
        axiosInstance
            .get(`/search/${searchWord}`)
            .then(res => {
                setSearchData(res.data);
            })
            .catch(err => console.log(err));
    }, [searchWord]);
    const searchItems = [...searchData]
    return (
        <div className='container pb-5'>   
        
          {
          searchItems.length > 0 ? <h5 className='py-3'>search results for:{searchWord}</h5> :
          <h5 className='py-5 text-center'>no search results for: {searchWord}
          </h5>
          }

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            {searchItems.map((product) => {
                return (
                   <div className='col' key={product._id}>
                        <CardComponent product={product} />
                    </div>
                )
            })}
            </div>
        </div>
        
    )
}

export default Search