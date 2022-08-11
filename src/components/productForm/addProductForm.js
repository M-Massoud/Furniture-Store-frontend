import { useState, useEffect } from 'react';
import axiosInstance from '../../network/Config';
import { Store } from 'react-notifications-component';

function AddProductForm({ title }) {

    const [productImg, setProductImg] = useState("default-product-img.jpg")
    const [subCategoriesData, setSubCategoriesData] = useState([])
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    // console.log(subCategoriesData);
    let formData = new FormData();

    const [formDetails, setFormDetails] = useState({
        productName: "",
        subCategoryId: "",
        productSubcategory: "",
        productDescription: "",
        productImage: "",
        productAmount: 2,
        productPrice: "",
        productDiscount: 0
    });

    const [formError, setFormerror] = useState({
        productNameError: "",
        subCategoryIdError: "",
        productSubcategoryError: "",
        productDescriptionError: "",
        productImageError: "",
        productAmountError: "",
        productPriceError: "",
        productDiscountError: ""

    });

    function handelFormchange(e) {
        if (e.target.id === 'subCategory') {
            setFormDetails({
                ...formDetails,
                subCategoryId: subCategoriesData[e.target.value]._id,
                productSubcategory: subCategoriesData[e.target.value].title,
            });
        }
        else {
            setFormDetails({
                ...formDetails,
                [e.target.id]: e.target.value
            });
        }
        ErrorHandling(e.target.id, e.target.value);
    };// handelFormchange function

    function handleImgChange(e) {
        setFormDetails({
            ...formDetails,
        })
        setProductImg(e.target.files[0])
    }

    useEffect(() => {
        document.title = title;
        axiosInstance
            .get(`/subCategory`)
            .then(res => {
                setSubCategoriesData(res.data.resData.subCategories);
            })
            .catch(err => console.log(err));
    }, []);


    // validate the required values on submit
    const valdiateForm = (e) => {

        if (!formDetails.productName)
            setFormerror({
                ...formError,
                productNameError: "This field is required"
            });
        if (!formDetails.productDescription)
            setFormerror({
                ...formError,
                productDescriptionError: "This field is required"
            });
        if (!formDetails.productPrice)
            setFormerror({
                ...formError,
                productPriceError: "This field is required"
            });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        valdiateForm();
        try {
            // return if there's any errors
            for (let index = 0; index < Object.values(formError).length; index++) {
                if (Object.values(formError)[index]) return
            }

            // console.log(formError);
            let data = await axiosInstance
                .post('/products', formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        "Content-Type": "multipart/form-data",
                    }
                );

            await axiosInstance
                .put('/subCategory/updateProducts', {
                    id: data.data.data.subCategory.id,
                    products: [data.data.data._id]
                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                )
            Store.addNotification({
                title: "Status",
                message: "Successfully Added Product",
                type: "success",
                container: "top-center",
                dismiss: {
                    duration: 2000,
                },
            });
        }
        catch (error) {
            Store.addNotification({
                title: "Status",
                message: "Sorry, Error Occured While Saving Product Data",
                type: "danger",
                container: "top-center",
                dismiss: {
                    duration: 2000,
                },
            });
            console.log(error);
        }
    };   //handleSubmit function

    const addingProduct = (e) => {
        valdiateForm();
        formData.append("name", formDetails.productName);
        formData.append("description", formDetails.productDescription);
        formData.append("stockAmount", formDetails.productAmount);
        formData.append("price", formDetails.productPrice);
        formData.append("discount", formDetails.productDiscount);
        formData.append("subCategory[id]", formDetails.subCategoryId);
        formData.append("subCategory[title]", formDetails.productSubcategory);
        formData.append("image", productImg);
    }  // Add product func


    // alert feedback 
    const successAlert = function (e) {
        return <div className="alert alert-success w-50 m-auto mt-2" role="alert">
            new product added successfully
        </div>
    }

    const errorAlert = function (text) {
        return <div className="alert alert-danger w-50 m-auto  mt-2" role="alert">
            unexpected error
        </div>
    }

    // to auto hide the alerts 
    function hideAlertMsg() {
        setTimeout(() => {
            setShowErrorAlert(false)
            setShowSuccessAlert(false)
        }, 4000);
    }

    // regex to check if it only contains numbers 
    const onlyNumbersRegex = new RegExp(/^\d+$/)

    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => {
        switch (input) {
            case 'productName':
                setFormerror({
                    ...formError,
                    productNameError: value.length === 0 ? "This field is required" : "" || onlyNumbersRegex.test(value) === true ?
                        "product name can't only be numbers" : ""
                });
                break;

            case 'productSubcategory':
                setFormerror({
                    ...formError,
                    productSubcategoryError: value.length === 0 ? "This field is required" : "",
                });
                break;

            case 'productDescription':
                setFormerror({
                    ...formError,
                    productDescriptionError: value.length === 0 ? "This field is required" : "" ||
                        onlyNumbersRegex.test(value) === true ?
                        "product description can't only be numbers" : ""
                });
                break;

            case 'productPrice':
                setFormerror({
                    ...formError,
                    productPriceError: value.length === 0 ? "This field is required" : "",
                });
                break;

            default:
                setFormerror({
                    ...formError
                })
        }  //value.length === 0 ? "This field is required" : "",
    }// ErrorHandling function

    ////////////////////////////////////////////////
    return (
        <>
            {showSuccessAlert === true && successAlert()}
            {showErrorAlert === true && errorAlert()}
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow my-5'>
                <h3 className='text-center mt-2'> Product Control </h3>
                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    {/* //// */}
                    {/* //// */}
                    <label htmlFor='productName' className="form-label mt-2"> Product Name</label >
                    <input type='text' id={'productName'} name={'productName'} className={`form-control ${formError.productNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productNameError}</div>
                    {/* //// */}
                    <label htmlFor='productSubcategory' className="form-label mt-2"> Product subCategory</label >
                    <br />
                    <select className={`form-control form-select ${formError.productSubcategoryError && "border-danger"} `} id={'subCategory'} name={'subCategory'} onChange={(e) => handelFormchange(e)} required>
                        <option value="">Select SubCategory</option>

                        {subCategoriesData.map((subCategory, index) => {
                            return (
                                <option key={subCategory._id} value={index}>{subCategory.title}</option>
                            );
                        })}
                    </select>
                    <div id="nameHelp" className="form-text text-danger">{formError.productSubcategoryError}</div>
                    {/* <label htmlFor='subCategoryId' className="form-label  mt-2 "> subCategory ID</label >
                    <input type='number' min={1} id='subCategoryId' name='subCategoryId' className={`form-control mb-2 ${formError.subCategoryIdError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.subCategoryIdError}</div> */}
                    {/* //// */}
                    {/* <label htmlFor='productSubcategory' className="form-label mt-2"> Product subCategory</label >
                    <input type='text' id={'productSubcategory'} name={'productSubcategory'} className={`form-control ${formError.productSubcategoryError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productSubcategoryError}</div> */}
                    {/* //// */}
                    <label htmlFor='productDescription' className="form-label   mt-2 mb-2"> Product Description</label >
                    <input type='text' id={'productDescription'} name={'productDescription'} className={`form-control ${formError.productDescriptionError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productDescriptionError}</div>
                    {/* //// */}

                    <label htmlFor='productImage' className="form-label   mt-2 mb-2"> Product Image</label >

                    <input type='file' id={'productImage'} name={'productImage'} className={`form-control ${formError.productImageError && "border-danger"} `} onChange={(e) => handleImgChange(e)} />

                    <div id="nameHelp" className="form-text text-danger">{formError.productImageError}</div>

                    {/* //// */}
                    <label htmlFor='productAmount' className="form-label  mt-2 "> Stock Amount</label >
                    <input type='number' defaultValue={2} id='productAmount' name='productAmount' className={`form-control mb-2 ${formError.productAmountError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productAmountError}</div>
                    {/* //// */}
                    <label htmlFor='productPrice' className="form-label  mt-2 "> Product Price</label >
                    <input type='number' id='productPrice' name='productPrice' className={`form-control mb-2 ${formError.productPriceError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productPriceError}</div>
                    {/* //// */}
                    <label htmlFor='productDiscount' className="form-label  mt-2 "> Product Discount</label >
                    <input type='number' id='productDiscount' name='productDiscount' className={`form-control mb-2 ${formError.productDiscountError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productDiscountError}</div>

                    <button className='btn btn-primary mt-2 w-50 m-auto' onClick={() => addingProduct()}>Add Product</button>
                </form>

            </div>

        </>
    );

};

export default AddProductForm;