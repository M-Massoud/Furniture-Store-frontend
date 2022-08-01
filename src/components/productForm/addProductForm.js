import { useState } from 'react';
import axiosInstance from '../../network/Config';
function AddProductForm(props) {
    const [formDetails, setFormDetails] = useState({
        productName: "",
        subCategotyId:"",
        productSubcategory:"",
        productDescription: "",
        productImgage: "",
        productAmount: "",
        productPrice: "",
        productDiscount:""
    });
    const [formError, setFormerror] = useState({
        productNameError: "",
        subCategotyIdError:"",
        productSubcategoryError:"",
        productDescriptionError: "",
        productImgageError: "",
        productAmountError: "",
        productPriceError: "",
        productDiscountError:""
        
    });
    function handelFormchange(e) {
        setFormDetails({
            ...formDetails,
            [e.target.id]: e.target.value
        });
       ErrorHandling(e.target.id, e.target.value);
    };// handelFormchange function
    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(formDetails);
    };//handleSubmit function
    const addingProduct = () => {
        axiosInstance
        .post('/products', {
                name: formDetails.productName,
                description: formDetails.productDescription,
                stockAmount: formDetails.productAmount,
                price: formDetails.productPrice,
                discount: formDetails.productDiscount,
                subCategory: { id: formDetails.subCategotyId, title: formDetails.productSubcategory },
                image:formDetails.productImgage
                },
                { headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzU4N2YxODVmZmJhOTQ4YTBkYzIyNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODY2OTA2NCwiZXhwIjoxNjU5MjczODY0fQ.aoeoA7HfWURqkhcfhV5pW7elWuA0ltbhelM4N5wuM8M'}
        })
        .then(res => console.log(res ,formDetails))
        .catch(error => console.log(error));
};// ADDing func
  
    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => { 
        switch (input) {
            case 'productName':
                setFormerror({
                    ...formError,
                    productNameError: value.length === 0 ? "This field is required" : "",
                });
                break;
                case 'subCategotyId':
                    setFormerror({
                        ...formError,
                        subCategotyIdError: value.length === 0 ? "This field is required" : "",
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
                        productDescriptionError: value.length === 0 ? "This field is required" :"",
                    });
                break;
            case 'productImgage':
                    setFormerror({
                        ...formError,
                        productImgageError: value.length === 0 ? "This field is required": "" ,
                    });
                break;
            case 'productAmount':
                    setFormerror({
                        ...formError,
                        productAmountError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'productPrice':
                    setFormerror({
                        ...formError, 
                        productPriceError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'productDiscount':
                    setFormerror({
                        ...formError, 
                        productDiscountError: value.length === 0 ? "This field is required" : "",
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
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow'>
                <h3 className='text-center mt-2'> Product Control </h3>
                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)} method="post" encType="multipart/form-data">    
                    {/* //// */}
                                 
                    {/* //// */}
                                  <label  htmlFor='productName' className="form-label mt-2"> Product Name</label >
                <input type='text' id={'productName'} name={'productName'} className={`form-control ${formError.productNameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productNameError}</div>
                    {/* //// */}
                    <label  htmlFor='subCategotyId' className="form-label  mt-2 "> subCategory ID</label >
                <input type='number' min={1} id='subCategotyId' name='subCategotyId' className={`form-control mb-2 ${formError.subCategotyIdError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.subCategotyIdError}</div>
                    {/* //// */}
                    <label  htmlFor='productSubcategory' className="form-label mt-2"> Product subCategory</label >
                <input type='text' id={'productSubcategory'} name={'productSubcategory'} className={`form-control ${formError.productSubcategoryError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productSubcategoryError}</div>
                    {/* //// */}
                 <label  htmlFor='productDescription' className="form-label   mt-2 mb-2"> Product Description</label >
                <input type='text' id={'productDescription'} name={'productDescription'} className={`form-control ${formError.productDescriptionError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productDescriptionError}</div>
                    {/* //// */}

                   <label  htmlFor='productImgage' className="form-label   mt-2 mb-2"> Product Image</label >

                  <input type='file' id={'productImgage'} name={'productImgage'} className={`form-control ${formError.productImgageError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />

                  <div id="nameHelp" className="form-text text-danger">{formError.productImgageError}</div>

                    {/* //// */}                
                                  <label  htmlFor='productAmount' className="form-label  mt-2 "> Stock Amount</label >
                <input type='number'  min={1} id='productAmount' name='productAmount' className={`form-control mb-2 ${formError.productAmountError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productAmountError}</div>
                    {/* //// */}
                    <label  htmlFor='productPrice' className="form-label  mt-2 "> Product Price</label >
                <input type='number'  min={1000} id='productPrice' name='productPrice' className={`form-control mb-2 ${formError.productPriceError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productPriceError}</div>
                     {/* //// */}
                     <label  htmlFor='productDiscount' className="form-label  mt-2 "> Product Discount</label >
                <input type='number' min={300} id='productDiscount' name='productDiscount' className={`form-control mb-2 ${formError.productDiscountError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.productDiscountError}</div>
                    <div className='border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap'>
                        <button className='btn btn-primary col-8 mt-2 col-sm-5 col-md-3' onClick={()=>addingProduct()}>Add Product</button>
                    </div>
                              </form>
        
            </div>
            
        </>
    );
    
};

export default AddProductForm;