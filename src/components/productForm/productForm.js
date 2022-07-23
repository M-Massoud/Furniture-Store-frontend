import { useState } from 'react';
import axiosInstance from '../../network/Config';
function ProductForm(props) {
    const [formDetails, setFormDetails] = useState({
        ProdId:"",
        Pname: "",
        subCateId:"",
        Psubcategory:"",
        Pdescrip: "",
        Pimg: "",
        Pamount: "",
        Pprice: "",
        Pdiscount:""
    });
    const [formError, setFormerror] = useState({
        ProdId:"",
        Pname: "",
        subCateId:"",
        Psubcategory:"",
        Pdescrip: "",
        Pimg: "",
        Pamount: "",
        Pprice: "",
        Pdiscount:""
        
    });
    function handelFormchange(e) {
        // console.log(e.target.id, e.target.value);
        console.log(formDetails)
        setFormDetails({
            ...formDetails,
            [e.target.id]: e.target.value
        });
       ErrorHandling(e.target.id, e.target.value);
    };// handelFormchange function
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formDetails);
    };//handleSubmit function
    const addingProduct = () => {
        console.log("ADDED");
        axiosInstance
            .post('/products', {
                    name: formDetails.Pname,
                    description: formDetails.Pdescrip,
                    stockAmount: formDetails.Pamount,
                    price: formDetails.Pprice,
                    discount: formDetails.Pdiscount,
                    subCategory: { id: formDetails.subCateId, title: formDetails.Psubcategory },
                    image: formDetails.Pimg
               // headers: {'Authorization': 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzc1M2VkMDMxOWFhNjM2YTQ4ZmI4YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODU0ODIzNywiZXhwIjoxNjU5MTUzMDM3fQ.O7SQANdvsl01iOM3rd91lWpLfgj7XW5Tw4nn-QzHogM'}
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));
    };// ADDing func
    const editingProduct = () => {
        console.log("EDited");
        axiosInstance
            .put('/products', {
                id:formDetails.ProdId,
                name: formDetails.Pname,
                description: formDetails.Pdescrip,
                stockAmount: formDetails.Pamount,
                price: formDetails.Pprice,
                discount: formDetails.Pdiscount,
                subCategory: { id: formDetails.subCateId, title: formDetails.Psubcategory },
                image: formDetails.Pimg,
                
                
           // headers: {'Authorization': 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzc1M2VkMDMxOWFhNjM2YTQ4ZmI4YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODU0ODIzNywiZXhwIjoxNjU5MTUzMDM3fQ.O7SQANdvsl01iOM3rd91lWpLfgj7XW5Tw4nn-QzHogM'}
        })
        .then(res => console.log(res))
        .catch(error => console.log(error));

    };// Editing func
    const deleteProduct = () => {
        console.log("Deleted");
        axiosInstance
        .delete(`/products/${formDetails.ProdId}`, {        
           // headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzc1M2VkMDMxOWFhNjM2YTQ4ZmI4YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODUzOTI1OSwiZXhwIjoxNjU5MTQ0MDU5fQ.f3TP-afoR8etla7pIV7fSIEHjkfYjQLRzFlvnjGmNfA'}
    })
        .then(res => console.log(res))
        .catch(error => console.log(error));
        
    };// delet product
    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => { 
        // let imgURl = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
        switch (input) {
            //regex = new Regex("[0-9]");
            case 'ProdId':
                setFormerror({
                    ...formError,
                    ProdIdError: value.length === 0 ? "This field is required" : "",
                });
            break;
            case 'Pname':
                setFormerror({
                    ...formError,
                    PnameError: value.length === 0 ? "This field is required" : "",
                });
                break;
                case 'subCateId':
                    setFormerror({
                        ...formError,
                        subCateIdError: value.length === 0 ? "This field is required" : "",
                    });
                    break;
                case 'Psubcategory':
                    setFormerror({
                        ...formError,
                        PsubcategoryError: value.length === 0 ? "This field is required" : "",
                    });
                    break;
            case 'Pdescrip':
                    setFormerror({
                        ...formError,
                        PdescripError: value.length === 0 ? "This field is required" :"",
                    });
                break;
            case 'Pimg':
                    setFormerror({
                        ...formError,
                        PimgError: value.length === 0 ? "This field is required": "" ,
                    });
                break;
            case 'Pamount':
                    setFormerror({
                        ...formError,
                        PamountError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'Pprice':
                    setFormerror({
                        ...formError, 
                        PpriceError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'Pdiscount':
                    setFormerror({
                        ...formError, 
                        PdiscountError: value.length === 0 ? "This field is required" : "",
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
                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)}>
                    {/* //// */}
                                 <label  htmlFor='ProdId' className="form-label  mt-2 "> Product ID</label >
                <input type='number' min={1} id='ProdId' name='ProdId' className={`form-control mb-2 ${formError.ProdIdError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.ProdIdError}</div>
                    {/* //// */}
                                  <label  htmlFor='Pname' className="form-label mt-2"> Product Name</label >
                <input type='text' id={'Pname'} name={'Pname'} className={`form-control ${formError.PnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PnameError}</div>
                    {/* //// */}
                    <label  htmlFor='subCateId' className="form-label  mt-2 "> subCategory ID</label >
                <input type='number' min={1} id='subCateId' name='subCateId' className={`form-control mb-2 ${formError.subCateIdError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.subCateIdError}</div>
                    {/* //// */}
                    <label  htmlFor='Psubcategory' className="form-label mt-2"> Product subCategory</label >
                <input type='text' id={'Psubcategory'} name={'Psubcategory'} className={`form-control ${formError.PsubcategoryError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PsubcategoryError}</div>
                    {/* //// */}
                                  <label  htmlFor='Pdescrip' className="form-label   mt-2 mb-2"> Product Description</label >
                <input type='text' id={'Pdescrip'} name={'Pdescrip'} className={`form-control ${formError.PdescripError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PdescripError}</div>
                    {/* //// */}
                    <label  htmlFor='Pimg' className="form-label   mt-2 mb-2"> Product Image URL</label >
                <input type='text' id={'Pimg'} name={'Pimg'} className={`form-control ${formError.PimgError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.PimgError}</div>
                    {/* //// */}                
                                  <label  htmlFor='Pamount' className="form-label  mt-2 "> Stock Amount</label >
                <input type='number'  min={1} id='Pamount' name='Pamount' className={`form-control mb-2 ${formError.PamountError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PamountError}</div>
                    {/* //// */}
                    <label  htmlFor='Pprice' className="form-label  mt-2 "> Product Price</label >
                <input type='number'  min={1000} id='Pprice' name='Pprice' className={`form-control mb-2 ${formError.PpriceError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PpriceError}</div>
                     {/* //// */}
                     <label  htmlFor='Pdiscount' className="form-label  mt-2 "> Product Discount</label >
                <input type='number' min={300} id='Pdiscount' name='Pdiscount' className={`form-control mb-2 ${formError.PdiscountError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.PdiscountError}</div>
                    <div className='border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap'>
                        <button className='btn btn-primary col-8 mt-2 col-sm-5 col-md-3' onClick={()=>addingProduct()}>Add Product</button>
                        <button className='btn btn-success col-8 mt-2 col-sm-5 col-md-3' onClick={()=>editingProduct()}>Edit Product</button>
                        <button className='btn btn-danger col-8 mt-2 col-sm-6 mt-sm-2 col-md-3'onClick={()=>deleteProduct()}>Delete Product</button>

                    </div>
                              </form>
        
            </div>
            
        </>
    );
    
};

export default ProductForm;