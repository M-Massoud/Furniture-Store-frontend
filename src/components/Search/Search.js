import React, { useEffect, useState } from 'react'
import axiosInstance from '../../network/Config';
import CardComponent from '../cardComponent/cardComponent';
import { useLocation } from 'react-router-dom';
function Search() {
    const location = useLocation();
    const [searchData, setSearchData] = useState("");
    const { searchedData } = location.state;
    console.log(searchedData)
    console.log(searchData)
    useEffect(() => {
        axiosInstance
            .get(`/search/${searchedData}`)
            .then(res => {
                setSearchData(res.data);
            })
            .catch(err => console.log(err));
    }, [searchedData]);
    const searchItems = [...searchData]
    return (
        <div className="d-flex flex-wrap justify-content-around">
            {searchItems.map((product) => {
                return (
                    <div className="d-flex flex-wrap w-ms-100 col-sm-12 w-md-50 w-lg-25 col-md-5 col-lg-5  my-4 " key={product._id}>
                        <CardComponent product={product} />
                    </div>
                )
            })}
        </div>
    )
}

export default Search