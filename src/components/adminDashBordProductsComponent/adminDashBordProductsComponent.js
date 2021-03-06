import { useState, useEffect } from 'react';
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminDashBoardProductsPage() {
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [deletingError, setDeletingError] = useState('');

    useEffect(() => {
        axiosInstance
            .get(`/products`, {
                params: {
                    page: currentPage,
                    itemCount: 10,
                }
            })
            .then(res => {
                setProductsData(res.data.resData.products);
                setMaxPagesNumber(res.data.resData.maxPagesNumber);
                // console.log(res.data.resData.products);
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

    function deleteproduct(id) {
        if (window.confirm("Are You Sure") === true) {
            axiosInstance.delete(`/products/${id}`, {
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
                        <div className='container-fluid' >
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Stock Amount</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col">Sub Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsData.map(product => {
                                        console.log(product);
                                        return (
                                            <tr key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.stockAmount}</td>
                                                <td>{product.image}</td>
                                                <td>{product.price}</td>
                                                <td>{product.discount}</td>
                                                <td>{product.subCategory.title}</td>

                                                <td>
                                                    <Link to={{
                                                        pathname: "/editProduct", state: product
                                                    }}  >
                                                        <button className='btn btn-primary' >
                                                            Edit
                                                        </button>
                                                    </Link>
                                                </td>

                                                <td><FaTrashAlt className='text-hover-red' onClick={() => { deleteproduct(product._id) }} /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {allertMessage()}
                            <nav className='my-5 mx-5' aria-label="...">
                                <ul className="pagination">
                                    <li className={currentPage === 1 ? "page-item  disabled" : "page-item "}>
                                        <span className="page-link" onClick={() => previousPage()}>Previous</span>
                                    </li>
                                    {currentPage === 1 ? <li className="page-item active" aria-current="page">
                                        <span className="page-link" onClick={() => setCurrentPage(1)}>{currentPage}</span>
                                    </li> : <li className="page-item"><a className="page-link" href='#' onClick={() => setCurrentPage(1)}>1</a></li>}
                                    {maxPagesNumber >= 2 ? currentPage === 2 ? <li className="page-item active" aria-current="page">
                                        <span className="page-link">{currentPage}</span>
                                    </li> : <li className="page-item" onClick={() => setCurrentPage(2)}><a className="page-link" href='#' onClick={() => setCurrentPage(2)}>2</a></li> : ''}
                                    {maxPagesNumber >= 3 ? currentPage === 3 ? <li className="page-item active" aria-current="page">
                                        <span className="page-link" onClick={() => setCurrentPage(3)}>{currentPage}</span>
                                    </li> : <li className="page-item"><a className="page-link" href='#' onClick={() => setCurrentPage(3)}>3</a></li> : ''}
                                    {currentPage > 3 ? <li className="page-item"><a className="page-link disabled" href='#'>...</a></li> : ''}
                                    {currentPage > 3 ? <li className="page-item active" aria-current="page">
                                        <span className="page-link">{currentPage}</span>
                                    </li> : ''}
                                    {maxPagesNumber > 5 ? currentPage < maxPagesNumber - 2 ? <li className="page-item"><a className="page-link disabled" href=''>...</a></li> : '' : ''}
                                    {maxPagesNumber > 4 ? currentPage < maxPagesNumber - 1 ? <li className="page-item"><a className="page-link" href='#' onClick={() => setCurrentPage(maxPagesNumber - 1)}>{maxPagesNumber - 1}</a></li> : '' : ''}
                                    {maxPagesNumber > 3 ? currentPage < maxPagesNumber ? <li className="page-item"><a className="page-link" href='#' onClick={() => setCurrentPage(maxPagesNumber)}>{maxPagesNumber}</a></li> : '' : ''}
                                    <li className={currentPage === maxPagesNumber ? "page-item  disabled" : "page-item"}>
                                        <a className="page-link" href='#' onClick={() => nextPage()}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
