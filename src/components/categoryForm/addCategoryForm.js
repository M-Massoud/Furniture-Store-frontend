import { useState, useEffect } from 'react';
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';

export default function AddCategoryForm() {
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [categorySubCategoryData, setCategorySubCategoryData] = useState([]);

    const [formDetails, setFormDetails] = useState({
        categoryTitle: "",
        categorySubCategory: [],
    });

    const [formError, setFormerror] = useState({
        categoryTitleError: "",
        categorySubCategoryError: "",
    });

    useEffect(() => {
        axiosInstance
            .get(`/subCategory`)
            .then(res => {
                setSubCategoriesData(res.data.resData.subCategories);
            })
            .catch(err => console.log(err));
    }, []);

    function handelFormchange(event) {
        if (event.target.name === "categorySubCategory") {
            let dublicateIndicator = categorySubCategoryData.some(function (subCategory) {
                return subCategory.id === subCategoriesData[event.target.value]._id;
            });
            if (!dublicateIndicator) {
                setCategorySubCategoryData([...categorySubCategoryData, {
                    id: subCategoriesData[event.target.value]._id,
                    title: subCategoriesData[event.target.value].title,
                }]);
                setFormDetails({
                    ...formDetails,
                    [event.target.name]: [...formDetails.categorySubCategory, subCategoriesData[event.target.value]._id],
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
            case 'categoryTitle':
                setFormerror({
                    ...formError,
                    categoryTitleError: value.length === 0 ? "This field is required" : "" || /^\d+$/.test(value) === true ?
                        "category Title can't only be numbers" : ""
                });
                break;

            case 'categorySubCategory':
                setFormerror({
                    ...formError,
                    categorySubCategoryError: value.length === 0 ? "This field is required" : "",
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
            .post('/category', {
                title: formDetails.categoryTitle,
                subCategory: formDetails.categorySubCategory,
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
        setCategorySubCategoryData([...categorySubCategoryData.filter((t, i) => i !== index)]);
        setFormDetails({ ...formDetails, categorySubCategory: [...formDetails.categorySubCategory.filter((t, i) => i !== index)] });

    }

    return (
        <>
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-5'>
                <h3 className='text-center mt-2'>Category Control </h3>

                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='categoryTitle' className="form-label mt-2"> Category Title</label >
                    <input type='text' id={'categoryTitle'} name={'categoryTitle'} className={`form-control ${formError.categoryTitleError && "border-danger"} `} value={formDetails.categoryTitle} onChange={(event) => handelFormchange(event)} required />
                    <div id="categoryTitleHelp" className="form-text text-danger">{formError.categoryTitleError}</div>

                    <label htmlFor='productSubcategory' className="form-label mt-2"> Category SubCategory</label >
                    <select className={`form-control form-select ${formError.productSubcategoryError && "border-danger"} `} id={'categorySubCategory'} name={'categorySubCategory'} onChange={(event) => handelFormchange(event)} required>
                        {subCategoriesData.map((subCategory, index) => {
                            return (
                                <option key={subCategory._id} value={index}>{subCategory.title}</option>
                            );
                        })}
                    </select>
                    <div id="categorySubCategoryHelp" className="form-text text-danger">{formError.productSubcategoryError}</div>
                    {categorySubCategoryData.length > 0 ?
                        <table className="table table-striped">
                            <caption>SubCategories</caption>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorySubCategoryData.map((subCategory, index) => {
                                    return (
                                        <tr key={subCategory.id}>
                                            <td>{subCategory.id}</td>
                                            <td>{subCategory.title}</td>
                                            <td><FaTrashAlt className='text-hover-red' onClick={() => { handelDeleteCategorySubCategories(index) }} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        : ''
                    }
                    <button type="submit" className="btn bg-secondary-1 white my-4 w-50 m-auto"> Add Category </button>
                </form>
            </div>
        </>
    );

};
