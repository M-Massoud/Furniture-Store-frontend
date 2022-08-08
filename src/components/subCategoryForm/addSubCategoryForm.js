import { useState, useEffect } from 'react';
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';

export default function AddCategoryForm() {
    const [productsData, setProductsData] = useState([]);
    const [subCategoryProductData, setSubCategoryProductData] = useState([]);

    const [formDetails, setFormDetails] = useState({
        subCategoryTitle: "",
        subCategoryProduct: [],
    });

    const [formError, setFormerror] = useState({
        subCategoryTitleError: "",
        subCategoryProductError: "",
    });

    useEffect(() => {
        axiosInstance
            .get(`/products`)
            .then(response => {
                setProductsData(response.data.resData.products);
            })
            .catch(error => console.log(error));
    }, []);

    function handelFormchange(event) {
        if (event.target.name === "subCategoryProduct") {
            let dublicateIndicator = subCategoryProductData.some(function (product) {
                return product.id === productsData[event.target.value]._id;
            });
            if (!dublicateIndicator) {
                setSubCategoryProductData([...subCategoryProductData, {
                    id: productsData[event.target.value]._id,
                    name: productsData[event.target.value].name,
                }]);
                setFormDetails({
                    ...formDetails,
                    [event.target.name]: [...formDetails.subCategoryProduct, productsData[event.target.value]._id],
                });
            }
        }
        else {
            setFormDetails({
                ...formDetails,
                [event.target.name]: event.target.value
            });
        }
        ErrorHandling(event.target.name, event.target.value);
    };

    const ErrorHandling = (name, value) => {
        switch (name) {
            case 'subCategoryTitle':
                setFormerror({
                    ...formError,
                    subCategoryTitleError: value.length === 0 ? "This field is required" : "" || /^\d+$/.test(value) === true ?
                        "SubCategory Title can't only be numbers" : ""
                });
                break;

            case 'subCategoryProduct':
                setFormerror({
                    ...formError,
                    subCategoryProductError: value.length === 0 ? "This field is required" : "",
                });
                break;

            default:
                setFormerror({
                    ...formError
                })
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        axiosInstance
            .post('/subCategory', {
                title: formDetails.subCategoryTitle,
                products: formDetails.subCategoryProduct,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            )
            .then(response => {
                Store.addNotification({
                    title: "Status",
                    message: "Successfully Added",
                    type: "success",
                    container: "top-center",
                    dismiss: {
                        duration: 2000,
                    },
                });
                console.log(response.data)
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

    function handelDeleteCategorySubCategories(index) {
        setSubCategoryProductData([...subCategoryProductData.filter((t, i) => i !== index)]);
        setFormDetails({ ...formDetails, subCategoryProduct: [...formDetails.subCategoryProduct.filter((t, i) => i !== index)] });

    }

    return (
        <>
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-5'>
                <h3 className='text-center mt-2'>SubCategory Control</h3>

                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='subCategoryTitle' className="form-label mt-2">SubCategory Title</label >
                    <input type='text' id={'subCategoryTitle'} name={'subCategoryTitle'} className={`form-control ${formError.subCategoryTitleError && "border-danger"} `} value={formDetails.subCategoryTitle} onChange={(event) => handelFormchange(event)} required />
                    <div id="subCategoryTitleHelp" className="form-text text-danger">{formError.subCategoryTitleError}</div>

                    <label htmlFor='subCategoryProduct' className="form-label mt-2">SubCategory Products</label >
                    <select className={`form-control form-select ${formError.productSubcategoryError && "border-danger"} `} id={'subCategoryProduct'} name={'subCategoryProduct'} onChange={(event) => event.target.value ? handelFormchange(event) : ''} required>
                        <option value="">Select Product</option>
                        {productsData.map((product, index) => {
                            return (
                                <option key={product._id} value={index}>{product.name}</option>
                            );
                        })}
                    </select>
                    <div id="subCategoryProductHelp" className="form-text text-danger">{formError.productSubcategoryError}</div>
                    {subCategoryProductData.length > 0 ?
                        <table className="table table-striped">
                            <caption>Products</caption>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subCategoryProductData.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td><FaTrashAlt className='text-hover-red' onClick={() => { handelDeleteCategorySubCategories(index) }} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        : ''
                    }
                    <button type="submit" className="btn bg-secondary-1 white my-4 w-50 m-auto"> Add SubCategory </button>
                </form>
            </div>
        </>
    );

};
