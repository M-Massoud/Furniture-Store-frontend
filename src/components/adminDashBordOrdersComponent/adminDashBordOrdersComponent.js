import { useState, useEffect } from 'react';
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { FaTrashAlt } from 'react-icons/fa';
import { customToString } from "../adminDashBordSubCategoriesComponent/adminDashBordSubCategoriesComponent";


export default function AdminDashBoardOrdersPage() {
    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [itemCount, setItemCount] = useState(10);
    const [deletingError, setDeletingError] = useState('');

    useEffect(() => {
        axiosInstance
            .get(`/orders`, {
                params: {
                    page: currentPage,
                    itemCount: itemCount,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                setOrdersData(res.data.resData.orders);
                setMaxPagesNumber(res.data.resData.maxPagesNumber);
                console.log(res.data.resData.orders);
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

    function deleteorder(id) {
        if (window.confirm("Are You Sure") === true) {
            axiosInstance.delete(`/orders/${id}`, {
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
                                    <th scope="col">ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">quantity</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.userId != null ? `${order.userId.firstName} ${order.userId.lastName}` : ''}</td>
                                            <td>{customToString(order.product)}</td>
                                            <td>{order.created_at}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.status}</td>
                                            <td><FaTrashAlt className='text-hover-red' onClick={() => { deleteorder(order._id) }} /></td>
                                        </tr>
                                    );
                                })}
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
