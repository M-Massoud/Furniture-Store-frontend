import { useState } from 'react';
import axiosInstance from '../../network/Config';
function AddProductForm(props) {
    const [formDetails, setFormDetails] = useState({
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
        // console.log(formDetails)
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
        axiosInstance
        .post('/products', {
                name: formDetails.Pname,
                description: formDetails.Pdescrip,
                stockAmount: formDetails.Pamount,
                price: formDetails.Pprice,
                discount: formDetails.Pdiscount,
                subCategory: { id: formDetails.subCateId, title: formDetails.Psubcategory },
                image:formDetails.Pimg
                },
                { headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzU4N2YxODVmZmJhOTQ4YTBkYzIyNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1ODY2OTA2NCwiZXhwIjoxNjU5MjczODY0fQ.aoeoA7HfWURqkhcfhV5pW7elWuA0ltbhelM4N5wuM8M'}
        })
        .then(res => console.log(res ,formDetails))
        .catch(error => console.log(error));
};// ADDing func
  
    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => { 
        // let imgURl = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
        switch (input) {
            //regex = new Regex("[0-9]");
         
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
                <form className={`co-12  row m-auto `} onSubmit={(e) => handleSubmit(e)} method="post" encType="multipart/form-data">    
                    {/* //// */}
                                 
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

                   <label  htmlFor='Pimg' className="form-label   mt-2 mb-2"> Product Image</label >

                  <input type='file' id={'Pimg'} name={'Pimg'} className={`form-control ${formError.PimgError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />

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
                    </div>
                              </form>
        
            </div>
            
        </>
    );
    
};

export default AddProductForm;