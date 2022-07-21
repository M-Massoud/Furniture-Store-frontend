import { useState } from 'react';
function ProductForm(props) {
    const [formDetails, setFormDetails] = useState({
        Pname: "",
        Pdescrip: "",
        Pimg: "",
        Pamount: "",
        Pprice: "",
        Pdiscount:""
    });
    const [formError, setFormerror] = useState({
        Pname: "",
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
    /////////////////////////////////////////////
    const ErrorHandling = (input, value) => { 
        // let imgURl = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
        switch (input) {
            //regex = new Regex("[0-9]");
            case 'Pname':
                setFormerror({
                    ...formError,
                    fnameError: value.length === 0 ? "This field is required" : "",
                });
                break;
            case 'Pdescrip':
                    setFormerror({
                        ...formError,
                        lnameError: value.length === 0 ? "This field is required" :"",
                    });
                break;
            case 'Pimg':
                    setFormerror({
                        ...formError,
                        streetError: value.length === 0 ? "This field is required": "" ,
                    });
                break;
            case 'Pamount':
                    setFormerror({
                        ...formError,
                        cityError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'Pprice':
                    setFormerror({
                        ...formError, 
                        phoneError: value.length === 0 ? "This field is required" : "",
                    });
                break;
                case 'Pdiscount':
                    setFormerror({
                        ...formError, 
                        phoneError: value.length === 0 ? "This field is required" : "",
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
            <div className='col-10 offset-1 col-md-8 offset-md-2 border p-5 rounded shadow'>
                <h3 className='text-center mt-2'> Product Control </h3>
                <form className={`co-12  row m-auto ${props.hide ? "d-none" : ""} ${props.hide2 ? "d-none" : ""}`} onSubmit={(e) => handleSubmit(e)}>
                    {/* //// */}
                                  <label  htmlFor='Pname' className="form-label mt-2"> Product Name</label >
                <input type='text' id={'Pname'} name={'Pname'} className={`form-control ${formError.fnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.fnameError}</div>
                    {/* //// */}
                                  <label  htmlFor='Pdescrip' className="form-label   mt-2 mb-2"> Product Description</label >
                <input type='text' id={'Pdescrip'} name={'Pdescrip'} className={`form-control ${formError.lnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.lnameError}</div>
                    {/* //// */}
                    <label  htmlFor='Pimg' className="form-label   mt-2 mb-2"> Product Image URL</label >
                <input type='text' id={'Pimg'} name={'Pimg'} className={`form-control ${formError.lnameError && "border-danger"} `} onChange={(e) => handelFormchange(e)} />
                <div id="nameHelp" className="form-text text-danger">{formError.lnameError}</div>
                    {/* //// */}                
                                  <label  htmlFor='Pamount' className="form-label  mt-2 "> Stock Amount</label >
                <input type='number'  min={1} id='Pamount' name='Pamount' className={`form-control mb-2 ${formError.phoneError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.phoneError}</div>
                    {/* //// */}
                    <label  htmlFor='Pprice' className="form-label  mt-2 "> Product Price</label >
                <input type='number'  min={1000} id='Pprice' name='Pprice' className={`form-control mb-2 ${formError.phoneError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.phoneError}</div>
                     {/* //// */}
                     <label  htmlFor='Pdiscount' className="form-label  mt-2 "> Product Discount</label >
                <input type='number' min={300} id='Pdiscount' name='Pdiscount' className={`form-control mb-2 ${formError.phoneError && "border-danger"} `}  onChange={(e) => handelFormchange(e)} />
                    <div id="nameHelp" className="form-text text-danger">{formError.phoneError}</div>
                    <div className='border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap'>
                        <button className='btn btn-primary col-8 mt-2 col-sm-5 col-md-3'>Add Product</button>
                        <button className='btn btn-success col-8 mt-2 col-sm-5 col-md-3'>Edit Product</button>
                        <button className='btn btn-danger col-8 mt-2 col-sm-6 mt-sm-2 col-md-3'>Delete Product</button>

                    </div>
                              </form>
        
            </div>
            
        </>
    );
    
};

export default ProductForm;