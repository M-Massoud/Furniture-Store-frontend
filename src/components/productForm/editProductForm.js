import { useState } from 'react';
import axiosInstance from '../../network/Config';
function EditProductForm(props) {
  console.log(props.location.state);
  const [formDetails, setFormDetails] = useState({
    productName:props.location.state.name,
    subCategoryId: props.location.state.subCategory.id,
    productSubcategoryTitle:props.location.state.subCategory.title,
    productDescription: props.location.state.description,
    productImgage: props.location.state.image ,
    productAmount: props.location.state.stockAmount,
    productPrice: props.location.state.price,
    productDiscount: props.location.state.discount,
  });
  const [formError, setFormerror] = useState({
    productNameError: '',
    subCategoryIdError: '',
    productSubcategoryTitleError: '',
    productDescriptionError: '',
    productImgageError: '',
    productAmountError: '',
    productPriceError: '',
    productDiscountError: '',
  });
  function handelFormchange(e) {
    // console.log(e.target.id, e.target.value,formDetails);
    setFormDetails({
      ...formDetails,
      [e.target.id]: e.target.value,
    });
    ErrorHandling(e.target.id, e.target.value);
  } // handelFormchange function
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(formDetails);
  }; //handleSubmit function

  const editProduct = () => {
    axiosInstance
      .put(
        '/products',
     {
          id: props.location.state._id,   
          name: formDetails.productName,   
          description: formDetails.productDescription,
          stockAmount: formDetails.productAmount,
          price: formDetails.productPrice,
          discount: formDetails.productDiscount,
          subCategory: {
            id: formDetails.subCategoryId,
            title: formDetails.productSubcategoryTitle,
          },
          image: formDetails.productImgage  ,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(res => console.log(formDetails))
      .catch(error => console.log(error, formDetails));
  }; // Editing func
  /////////////////////////////////////////////
  const ErrorHandling = (input, value) => {
    // let imgURl = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
    switch (input) {
      //regex = new Regex("[0-9]");

      case 'productName':
        setFormerror({
          ...formError,
          productNameError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'subCategoryId':
        setFormerror({
          ...formError,
          subCategoryIdError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productSubcategoryTitle':
        setFormerror({
          ...formError,
          productSubcategoryTitleError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productDescription':
        setFormerror({
          ...formError,
          productDescriptionError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productImgage':
        setFormerror({
          ...formError,
          productImgageError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productAmount':
        setFormerror({
          ...formError,
          productAmountError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productPrice':
        setFormerror({
          ...formError,
          productPriceError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'productDiscount':
        setFormerror({
          ...formError,
          productDiscountError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      default:
        setFormerror({
          ...formError,
        });
    } //value.length === 0 ? "This field is required" : "",
  }; // ErrorHandling function
  ////////////////////////////////////////////////
  return (
    <>
      <div className="col-10 offset-1 col-md-8 offset-md-2 border p-3 rounded shadow">
        <h3 className="text-center mt-2"> Product Control </h3>
        <form
          className={`co-12  row m-auto `}
          onSubmit={e => handleSubmit(e)}
          encType="multipart/form-data" >
          {/* //// */}
          <label htmlFor="Pid" className="form-label mt-2">
            Product id
          </label>
          <input
            type="text"
            value={props.location.state._id}
            disabled
            id={'Pid'}
            name={'Pid'}
            className={`form-control ${
              formError.productNameError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.productNameError}
          </div>
          {/* //// */}
          <label htmlFor="productName" className="form-label mt-2">
            Product Name
          </label>
          <input
            type="text"
            id={'productName'}
            name={'productName'}
            value={formDetails.productName}
            className={`form-control ${
              formError.productNameError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.productNameError}
          </div>
          {/* //// */}
          <label htmlFor="subCategoryId" className="form-label  mt-2 ">
            subCategory ID
          </label>
          <input
            type="number"
            min={1}
            id="subCategoryId"
            name="subCategoryId"
            value={formDetails.subCategoryId}
            className={`form-control mb-2 ${
              formError.subCategoryIdError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.subCategoryIdError}
          </div>
          {/* //// */}
          <label htmlFor="productSubcategoryTitle" className="form-label mt-2">
            Product subCategory
          </label>
          <input
            type="text"
            id={'productSubcategoryTitle'}
            name={'productSubcategoryTitle'}
            value={formDetails.productSubcategoryTitle}
            className={`form-control ${
              formError.productSubcategoryTitleError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.productSubcategoryTitleError}
          </div>
          {/* //// */}
          <label htmlFor="productDescription" className="form-label   mt-2 mb-2">
            Product Description
          </label>
          <input
            type="text"
            id={'productDescription'}
            name={'productDescription'}
            value={formDetails.productDescription}
            className={`form-control ${
              formError.productDescriptionError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}
          />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productDescriptionError}
          </div>
          {/* //// */}
          <label htmlFor="productImgage" className="form-label   mt-2 mb-2">
            Product Image
          </label>
          <input
            type="file"
            id={'productImgage'}
            name={'productImgage'}
            className={`form-control ${
              formError.productImgageError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}  />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productImgageError}
          </div>
          {/* //// */}
          <label htmlFor="productAmount" className="form-label  mt-2 ">
            Stock Amount{' '}
          </label>
          <input
            type="number"
            min={1}
            id="productAmount"
            name="productAmount"
            value={formDetails.productAmount}
            className={`form-control mb-2 ${
              formError.productAmountError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)} />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productAmountError}
          </div>
          {/* //// */}
          <label htmlFor="productPrice" className="form-label  mt-2 ">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={formDetails.productPrice}
            className={`form-control mb-2 ${
              formError.productPriceError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}
          />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productPriceError}
          </div>
          {/* //// */}
          <label htmlFor="productDiscount" className="form-label  mt-2 ">
            Product Discount
          </label>
          <input
            type="number"
            id="productDiscount"
            name="productDiscount"
            value={formDetails.productDiscount}
            className={`form-control mb-2 ${
              formError.productDiscountError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)} />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productDiscountError}
          </div>
          <div className="border col-10 offset-1 d-flex justify-content-evenly p-3 rounded shadow flex-wrap">
            <button
              className="btn btn-success col-8 mt-2 col-sm-5 col-md-3"
              onClick={() => editProduct()} >  Edit Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProductForm;
