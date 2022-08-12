import { useState, useEffect } from 'react';
import Spinner from "../spinner";
import AdminDashBoardPage from "../../pages/adminDashBoardPage";
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';

export default function AdminDashBoardOrdersPage({ title }) {
    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPagesNumber, setMaxPagesNumber] = useState(1);
    const [itemCount, setItemCount] = useState(10);
    const [isLoded, setIsLoded] = useState(false);

    useEffect(() => {
        document.title = title;
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

    function deleteorder(index, id) {
        if (window.confirm("Are You Sure") === true) {
            axiosInstance.delete(`/orders/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => {
                    setOrdersData((ordersData) => ordersData.filter((_, i) => i !== index));
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

    const productNameToString = function (array) {
        let result = '';
        for (let item in array) {
            result += array[item].product.name + ', ';
        }
        return result;
    }

    const qunatityToString = function (array) {
        let result = '';
        for (let item in array) {
            result += array[item].quantity + ', ';
        }
        return result;
    }

    function changeItemPerPage(event) {
        setItemCount(event.target.value);
    }

    function scrollToTop() {
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row m-5'>
                 <div className='col col-lg-3'> 
                    <AdminDashBoardPage />
                    </div>
                    <div className='col col-lg-9'>
                        <div className='col col-lg-3'>
                            <select onChange={(event) => changeItemPerPage(event)} defaultValue="10" className="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                                <option checked disabled>Products Per Page</option>
                                <option value="5" >5</option>
                                <option value="10" >10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className='col-lg-12 overflow-auto' >

                        {isLoded ?
                            ordersData.length > 0 ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">User ID</th>
                                            <th scope="col">Products</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">quantity</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersData.map((order, index) => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.userId != null ? `${order.userId.firstName} ${order.userId.lastName}` : ''}</td>
                                                    <td>{productNameToString(order.products, 'product', "name")}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{qunatityToString(order.products, 'quantity')}</td>
                                                    <td>{order.status}</td>
                                                    <td><FaTrashAlt className='text-danger' role='button' title='Delete' onClick={() => { deleteorder(index, order._id) }} /></td>
                                                </tr>
                                            );
                                        })}
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
