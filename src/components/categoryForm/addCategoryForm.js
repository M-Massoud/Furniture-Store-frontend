import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';
import { FaTrashAlt } from 'react-icons/fa';

export default function AddCategoryForm({ title }) {

    const history = useHistory();

    const [subCategoriesData, setSubCategoriesData] = useState([]);

    const [formDetails, setFormDetails] = useState({
        categoryTitle: "",
        categorySubCategory: [],
    });

    const [formError, setFormerror] = useState({
        categoryTitleError: "",
        categorySubCategoryError: "",
    });

    useEffect(() => {
        document.title = title;
        axiosInstance
            .get(`/subCategory`)
            .then(res => {
                setSubCategoriesData(res.data.resData.subCategories);
            })
            .catch(err => console.log(err));
    }, []);

    async function handelFormchange(event) {

        if (event.target.name === "categorySubCategory") {
            let dublicateIndicator = formDetails.categorySubCategory.some(function (subCategory) {
                return subCategory._id === subCategoriesData[event.target.value]._id;
            });
            if (!dublicateIndicator) {
                setFormDetails({
                    ...formDetails,
                    [event.target.name]: [...formDetails.categorySubCategory,
                    {
                        _id: subCategoriesData[event.target.value]._id,
                        title: subCategoriesData[event.target.value].title
                    }],
                });
            }
        }
        else {
            setFormDetails({
                ...formDetails,
                [event.target.name]: event.target.value
            });
        }
        if (event.target.name === 'categorySubCategory')
            ErrorHandling(event.target.name, formDetails.categorySubCategory.length + 1);
        else
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
                    categorySubCategoryError: value === 0 ? "Select At Least One Category SubCategory" : "",
                });
                break;

            default:
                setFormerror({
                    ...formError
                })
        }
    }

    function handelDeleteCategorySubCategories(index) {
        setFormDetails({ ...formDetails, categorySubCategory: [...formDetails.categorySubCategory.filter((t, i) => i !== index)] });
        ErrorHandling('categorySubCategory', formDetails.categorySubCategory.length - 1);
    }

    // validate the required values on submit
    const valdiateForm = () => {

        if (!formDetails.categoryTitle)
            setFormerror({
                ...formError,
                categoryTitleError: "This field is required"
            });
        if (!formDetails.categorySubCategory)
            setFormerror({
                ...formError,
                categorySubCategoryError: "Select At Least One Category SubCategory"
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        valdiateForm();
        for (let index = 0; index < Object.values(formError).length; index++) {
            if (Object.values(formError)[index]) return
        }
        axiosInstance
            .post('/category', {
                title: formDetails.categoryTitle,
                subCategory: formDetails.categorySubCategory.map((category) => category._id),
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
                history.push('/admin-dashBoard/categories');
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

    return (
        <>
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-5'>
                <h3 className='text-center mt-2'>Category Control </h3>
                <h6 className='text-center mt-2'>Add Category</h6>

                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='categoryTitle' className="form-label mt-2"> Category Title</label >
                    <input type='text' id={'categoryTitle'} name={'categoryTitle'} className={`form-control ${formError.categoryTitleError && "border-danger"} `} value={formDetails.categoryTitle} onChange={(event) => handelFormchange(event)} required />
                    <div id="categoryTitleHelp" className="form-text text-danger">{formError.categoryTitleError}</div>

                    <label htmlFor='categorySubCategory' className="form-label mt-2"> Category SubCategory</label >
                    <select className={`form-control form-select ${formError.categorySubCategoryError && "border-danger"} `} id={'categorySubCategory'} name={'categorySubCategory'} onChange={(event) => event.target.value ? handelFormchange(event) : ''} required>
                        <option value="">Select Category</option>
                        {subCategoriesData.map((subCategory, index) => {
                            return (
                                <option key={subCategory._id} value={index}>{subCategory.title}</option>
                            );
                        })}
                    </select>
                    <div id="categorySubCategoryHelp" className="form-text text-danger">{formError.categorySubCategoryError}</div>
                    {formDetails.categorySubCategory.length > 0 ?
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
                                {formDetails.categorySubCategory.map((subCategory, index) => {
                                    return (
                                        <tr key={subCategory._id}>
                                            <td>{subCategory._id}</td>
                                            <td>{subCategory.title}</td>
                                            <td><FaTrashAlt className='text-hover-red' title='Delete' onClick={() => { handelDeleteCategorySubCategories(index) }} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        : ''
                    }
                    <button type="submit" className="btn bg-secondary-1 white my-4 w-50 m-auto">Add Category</button>
                </form>
            </div>
        </>
    );

};
