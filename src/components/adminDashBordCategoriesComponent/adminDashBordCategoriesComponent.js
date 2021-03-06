import { useState, useEffect } from 'react';
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { FaTrashAlt } from 'react-icons/fa';

export default function AdminDashBoardCategoriesPage() {
    const [categoriesData, setCategoriesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [deletingError, setDeletingError] = useState('');

    useEffect(() => {
        axiosInstance
            .get(`/category`, {
                params: {
                    page: currentPage,
                    itemCount: 10,
                }
            })
            .then(res => {
                setCategoriesData(res.data.resData.categories);
                setMaxPagesNumber(res.data.resData.maxPagesNumber);
                console.log(res.data.resData.categories);
            })
            .catch(err => console.log(err));
    }, [currentPage]);

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

    function deletecategory(id) {
        if (window.confirm("Are You Sure") == true) {
            axiosInstance.delete(`/category/${id}`,{
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => {
                    console.log(res.data);
                    setDeletingError('successful');
                    clearAlertMessage();
                })
                .catch(err => { console.log(err); setDeletingError('failed'); clearAlertMessage(); });
        }
    }

    function customToString(array) {
        let result = '';
        for (let item in array) {
            result += array[item].title + ', ';
        }
        return result;
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

    return (
        <>
            <div className='container'>
                <div className='row m-5 col-12'>
                    <AdminDashBoardPage />
                    <div className='col-9'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">SubCategory</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoriesData.map(category => {
                                    return (
                                        <tr key={category._id}>
                                            <td>{category._id}</td>
                                            <td>{category.title}</td>
                                            <td>{customToString(category.subCategory)}</td>
                                            <td><FaTrashAlt className='text-hover-red' onClick={() => { deletecategory(category._id) }} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {allertMessage()}
                        <nav className='my-5 mx-5' aria-label="...">
                            <ul class="pagination">
                                <li class={currentPage === 1 ? "page-item  disabled" : "page-item "}>
                                    <span class="page-link" onClick={() => previousPage()}>Previous</span>
                                </li>
                                {currentPage === 1 ? <li class="page-item active" aria-current="page">
                                    <span class="page-link" onClick={() => setCurrentPage(1)}>{currentPage}</span>
                                </li> : <li class="page-item"><a class="page-link" href='#' onClick={() => setCurrentPage(1)}>1</a></li>}
                                {maxPagesNumber >= 2 ? currentPage === 2 ? <li class="page-item active" aria-current="page">
                                    <span class="page-link">{currentPage}</span>
                                </li> : <li class="page-item" onClick={() => setCurrentPage(2)}><a class="page-link" href='#' onClick={() => setCurrentPage(2)}>2</a></li> : ''}
                                {maxPagesNumber >= 3 ? currentPage === 3 ? <li class="page-item active" aria-current="page">
                                    <span class="page-link" onClick={() => setCurrentPage(3)}>{currentPage}</span>
                                </li> : <li class="page-item"><a class="page-link" href='#' onClick={() => setCurrentPage(3)}>3</a></li> : ''}
                                {currentPage > 3 ? <li class="page-item"><a class="page-link disabled" href='#'>...</a></li> : ''}
                                {currentPage > 3 ? <li class="page-item active" aria-current="page">
                                    <span class="page-link">{currentPage}</span>
                                </li> : ''}
                                {maxPagesNumber > 5 ? currentPage < maxPagesNumber - 2 ? <li class="page-item"><a class="page-link disabled" href=''>...</a></li> : '' : ''}
                                {maxPagesNumber > 4 ? currentPage < maxPagesNumber - 1 ? <li class="page-item"><a class="page-link" href='#' onClick={() => setCurrentPage(maxPagesNumber - 1)}>{maxPagesNumber - 1}</a></li> : '' : ''}
                                {maxPagesNumber > 3 ? currentPage < maxPagesNumber ? <li class="page-item"><a class="page-link" href='#' onClick={() => setCurrentPage(maxPagesNumber)}>{maxPagesNumber}</a></li> : '' : ''}
                                <li class={currentPage === maxPagesNumber ? "page-item  disabled" : "page-item"}>
                                    <a class="page-link" href='#' onClick={() => nextPage()}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
