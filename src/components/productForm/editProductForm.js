import { useState } from 'react';
import axiosInstance from '../../network/Config';
function EditProductForm(props) {
  // console.log(props.location.state);

  const [productImg,setProductImg]=useState(props.location.state.image)
  let formData=new FormData();

  const [formDetails, setFormDetails] = useState({
    productName:props.location.state.name,
    subCategoryId: props.location.state.subCategory.id,
    productSubcategoryTitle:props.location.state.subCategory.title,
    productDescription: props.location.state.description,
    productAmount: props.location.state.stockAmount,
    productPrice: props.location.state.price,
    productDiscount: props.location.state.discount,
  });
  const [formError, setFormerror] = useState({
    productNameError: '',
    subCategoryIdError: '',
    productSubcategoryTitleError: '',
    productDescriptionError: '',
    productImageError: '',
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

  // handle the img change
  const handleImgChange = (e) => {
    setFormDetails({
        ...formDetails,
    })
    setProductImg(e.target.files[0])
 }

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .put(
        '/products',formData,
        {
          headers:  {
          Authorization: `Bearer ${localStorage.getItem('token')}` },
          "Content-Type": "multipart/form-data",
          }
      )
      .then(res => console.log(res))
      .catch(error => console.log(error, formDetails));

  }; //handleSubmit function

  const editProduct = (e) => {
    formData.append("id",props.location.state._id)
    formData.append("name",formDetails.productName);
    formData.append("description",formDetails.productDescription);
    formData.append("stockAmount",formDetails.productAmount);
    formData.append("price",formDetails.productPrice);
    formData.append("discount",formDetails.productDiscount);
    formData.append("subCategory[id]",formDetails.subCategoryId);
    formData.append("subCategory[title]",formDetails.productSubcategoryTitle);
    formData.append("image",productImg);
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
      case 'productImage':
        setFormerror({
          ...formError,
          productImageError: value.length === 0 ? 'This field is required' : '',
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
            onChange={e => handelFormchange(e)}  />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productDescriptionError}
          </div>
          {/* //// */}
          <label htmlFor="productImage" className="form-label   mt-2 mb-2">
            Product Image
          </label>
          <input
            type="file"
            id={'productImage'}
            name={'productImage'}
            className={`form-control ${
              formError.productImageError && 'border-danger'
            } `}
            onChange={e => handleImgChange(e)}  />
          <div id="nameHelp" className="form-text text-danger">
            {formError.productImageError}
          </div>
          {/* //// */}
          <label htmlFor="productAmount" className="form-label  mt-2 ">
            Stock Amount
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
