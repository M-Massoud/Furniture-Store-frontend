import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';

export default function EditCategoryForm(props) {

    // redirect to the home page if there is no chosen product to edit
    const history = useHistory();
    if (!props.location.state) history.push('/');

    const [productsData, setProductsData] = useState([]);

    const [formDetails, setFormDetails] = useState({
        subCategoryTitle: props.location.state.title,
        subCategoryProduct: props.location.state.products,
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
            let dublicateIndicator = formDetails.subCategoryProduct.some(function (product) {
                return product._id === productsData[event.target.value]._id;
            });
            if (!dublicateIndicator) {
                setFormDetails({
                    ...formDetails,
                    [event.target.name]: [
                        ...formDetails.subCategoryProduct,
                        { _id: productsData[event.target.value]._id, name: productsData[event.target.value].name }
                    ],
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
            .put('/editSubCategory', {
                id: props.location.state._id,
                title: formDetails.subCategoryTitle,
                products: formDetails.subCategoryProduct.map((product) => product._id),
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
                    message: "Successfully Updated",
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

    function handelDeleteCategoryProducts(index) {
        setFormDetails({ ...formDetails, subCategoryProduct: [...formDetails.subCategoryProduct.filter((t, i) => i !== index)] });
    }

    return (
        <>
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-5'>
                <h3 className='text-center mt-2'>SubCategory Control</h3>
                <h6 className='text-center mt-2'>Edit SubCategory</h6>

                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='subCategoryTitle' className="form-label mt-2">SubCategory Title</label >
                    <input type='text' id={'subCategoryTitle'} name={'subCategoryTitle'} className={`form-control ${formError.subCategoryTitleError && "border-danger"} `} value={formDetails.subCategoryTitle} onChange={(event) => handelFormchange(event)} required />
                    <div id="subCategoryTitleHelp" className="form-text text-danger">{formError.subCategoryTitleError}</div>

                    <label htmlFor='productSubcategory' className="form-label mt-2">SubCategory Products</label >
                    <select className={`form-control form-select ${formError.productSubcategoryError && "border-danger"} `} id={'subCategoryProduct'} name={'subCategoryProduct'} onChange={(event) => handelFormchange(event)} required>
                        {productsData.map((product, index) => {
                            return (
                                <option key={product._id} value={index}>{product.name}</option>
                            );
                        })}
                    </select>
                    <div id="subCategoryProductHelp" className="form-text text-danger">{formError.productSubcategoryError}</div>
                    {formDetails.subCategoryProduct.length > 0 ?
                        <table className="table table-striped">
                            <caption>Products</caption>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {formDetails.subCategoryProduct.map((product, index) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td><FaTrashAlt className='text-hover-red' onClick={() => { handelDeleteCategoryProducts(index) }} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        : ''
                    }
                    <button type="submit" className="btn bg-secondary-1 white my-4 w-50 m-auto"> Edit SubCategory </button>
                </form>
            </div>
        </>
    );

};
