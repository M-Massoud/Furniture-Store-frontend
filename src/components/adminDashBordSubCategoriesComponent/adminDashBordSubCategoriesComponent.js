import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

export const customToString = function (array) {
    let result = '';
    for (let item in array) {
        result += array[item].name + ', ';
    }
    return result;
}

export default function AdminDashBoardSubCategoriesPage() {
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [itemCount, setItemCount] = useState(10);
    const [deletingError, setDeletingError] = useState('');

    useEffect(() => {
        axiosInstance
            .get(`/subCategory`, {
                params: {
                    page: currentPage,
                    itemCount: itemCount,
                }
            })
            .then(res => {
                setSubCategoriesData(res.data.resData.subCategories);
                setMaxPagesNumber(res.data.resData.maxPagesNumber);
            })
            .catch(err => console.log(err));
    }, [currentPage, itemCount]);

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

    function deletesubCategory(index, id) {
        if (window.confirm("Are You Sure") === true) {
            axiosInstance.delete(`/subCategory/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => {
                    setSubCategoriesData((subCategoriesData) => subCategoriesData.filter((_, i) => i !== index));
                    setDeletingError('successful');
                    clearAlertMessage();
                })
                .catch(err => { console.log(err); setDeletingError('failed'); clearAlertMessage(); });
        }
    }


    function allertMessage() {
        switch (deletingError) {
            case 'successful':
                return <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Successfully Deleted</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>;
                break;

            case 'failed':
                return <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Unexpected Error</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>;
                break;

            default:
                return '';
        }
    }

    function clearAlertMessage() {
        setTimeout(() => { setDeletingError(''); }, 2000);
    }

    function changeItemPerPage(event) {
        setItemCount(event.target.value);
    }

    function scrollToTop() {
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <div className='container'>
                <div className='row m-5 col-12'>
                    <AdminDashBoardPage />
                    <div className='col-9'>
                        <div className='col-3'>
                            <select onChange={(event) => changeItemPerPage(event)} defaultValue="10" className="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                                <option checked disabled>Products Per Page</option>
                                <option value="5" >5</option>
                                <option value="10" >10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Products</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subCategoriesData.map((subCategory, index) => {
                                    return (
                                        <tr key={subCategory._id}>
                                            <td>{(currentPage - 1) * itemCount + index + 1}</td>
                                            <td>{subCategory._id}</td>
                                            <td>{subCategory.title}</td>
                                            <td>{customToString(subCategory.products)}</td>
                                            <td><FaEdit className='text-hover-red mx-3' onClick={() => { deletesubCategory(index, subCategory._id); }} /></td>
                                            <td><FaTrashAlt className='text-hover-red mx-3' onClick={() => { deletesubCategory(index, subCategory._id) }} /></td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan='6'><Link to={'/addSubCategory'} className="btn bg-secondary-1 white border-0 text-center col-12">Add New SubCategory</Link></td>
                                </tr>
                            </tbody>
                        </table>
                        {allertMessage()}
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
                </div>
            </div>
        </>
    );
}
