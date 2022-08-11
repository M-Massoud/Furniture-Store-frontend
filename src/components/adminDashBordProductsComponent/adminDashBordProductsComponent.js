import { useState, useEffect } from 'react';
import Spinner from "../spinner";
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminDashBoardProductsPage({ title }) {
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [itemCount, setItemCount] = useState(10);
    const [isLoded, setIsLoded] = useState(false);

    useEffect(() => {
        document.title = title;
        axiosInstance
            .get(`/products`, {
                params: {
                    page: currentPage,
                    itemCount: itemCount,
                }
            })
            .then(res => {
                setProductsData(res.data.resData.products);
                setMaxPagesNumber(res.data.resData.maxPagesNumber);
                setIsLoded(true);
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

    function deleteproduct(index, id) {
        if (window.confirm("Are You Sure") === true) {
            axiosInstance.delete(`/products/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => {
                    setProductsData((productsData) => productsData.filter((_, i) => i !== index));
                    Store.addNotification({
                        title: "Status",
                        message: "Successfully Removed",
                        type: "success",
                        container: "top-center",
                        dismiss: {
                            duration: 2000,
                        },
                    });
                })
                .catch(error => {
                    Store.addNotification({
                        title: "Status",
                        message: "Sorry, Unexpected Error",
                        type: "danger",
                        container: "top-center",
                        dismiss: {
                            duration: 2000,
                        },
                    });
                    console.log(error);
                });
        }
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
                        <div className='container-fluid' >
                            {isLoded ?
                                productsData.length > 0 ?
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
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productsData.map((product, index) => {
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
                                                                <button className='btn btn-primary' title='Edit' >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                        </td>

                                                        <td><FaTrashAlt className='text-danger' role='button' title='Delete' onClick={() => { deleteproduct(index, product._id) }} /></td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan='10'><Link to={'/addProduct'} className="btn bg-secondary-1 white border-0 text-center col-12">Add New Product</Link></td>
                                            </tr>
                                        </tbody>
                                    </table> :
                                    <h1 className='my-5 text-center'>No Available Data To Show</h1> :
                                <Spinner />}
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
            </div>
        </>
    );
}