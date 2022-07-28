import { useState } from 'react';
import axiosInstance from '../../network/Config';
function EditProductForm(props) {
  console.log(props.location.state);
  const [formDetails, setFormDetails] = useState({
    Pname:props.location.state.name,
    subCategoryId: props.location.state.subCategory.id,
    PsubcategoryTitle:props.location.state.subCategory.title,
    Pdescription: props.location.state.description,
    Pimg: props.location.state.image ,
    Pamount: props.location.state.stockAmount,
    Pprice: props.location.state.price,
    Pdiscount: props.location.state.discount,
  });
  const [formError, setFormerror] = useState({
    Pname: '',
    subCategoryId: '',
    PsubcategoryTitle: '',
    Pdescription: '',
    Pimg: '',
    Pamount: '',
    Pprice: '',
    Pdiscount: '',
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
          name: formDetails.Pname,   
          description: formDetails.Pdescription,
          stockAmount: formDetails.Pamount,
          price: formDetails.Pprice,
          discount: formDetails.Pdiscount,
          subCategory: {
            id: formDetails.subCategoryId,
            title: formDetails.PsubcategoryTitle,
          },
          image: formDetails.Pimg  ,
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

      case 'Pname':
        setFormerror({
          ...formError,
          PnameError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'subCategoryId':
        setFormerror({
          ...formError,
          subCategoryIdError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'PsubcategoryTitle':
        setFormerror({
          ...formError,
          PsubcategoryTitleError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'Pdescription':
        setFormerror({
          ...formError,
          PdescriptionError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'Pimg':
        setFormerror({
          ...formError,
          PimgError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'Pamount':
        setFormerror({
          ...formError,
          PamountError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'Pprice':
        setFormerror({
          ...formError,
          PpriceError: value.length === 0 ? 'This field is required' : '',
        });
        break;
      case 'Pdiscount':
        setFormerror({
          ...formError,
          PdiscountError: value.length === 0 ? 'This field is required' : '',
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
              formError.PnameError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.PnameError}
          </div>
          {/* //// */}
          <label htmlFor="Pname" className="form-label mt-2">
            Product Name
          </label>
          <input
            type="text"
            id={'Pname'}
            name={'Pname'}
            value={formDetails.Pname}
            className={`form-control ${
              formError.PnameError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.PnameError}
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
          <label htmlFor="PsubcategoryTitle" className="form-label mt-2">
            Product subCategory
          </label>
          <input
            type="text"
            id={'PsubcategoryTitle'}
            name={'PsubcategoryTitle'}
            value={formDetails.PsubcategoryTitle}
            className={`form-control ${
              formError.PsubcategoryTitleError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}/>
          <div id="nameHelp" className="form-text text-danger">
            {formError.PsubcategoryTitleError}
          </div>
          {/* //// */}
          <label htmlFor="Pdescriptiontion" className="form-label   mt-2 mb-2">
            Product Description
          </label>
          <input
            type="text"
            id={'Pdescription'}
            name={'Pdescription'}
            value={formDetails.Pdescription}
            className={`form-control ${
              formError.PdescriptionError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}
          />
          <div id="nameHelp" className="form-text text-danger">
            {formError.PdescriptionError}
          </div>
          {/* //// */}
          <label htmlFor="Pimg" className="form-label   mt-2 mb-2">
            Product Image
          </label>
          <input
            type="file"
            id={'Pimg'}
            name={'Pimg'}
            className={`form-control ${
              formError.PimgError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}  />
          <div id="nameHelp" className="form-text text-danger">
            {formError.PimgError}
          </div>
          {/* //// */}
          <label htmlFor="Pamount" className="form-label  mt-2 ">
            Stock Amount{' '}
          </label>
          <input
            type="number"
            min={1}
            id="Pamount"
            name="Pamount"
            value={formDetails.Pamount}
            className={`form-control mb-2 ${
              formError.PamountError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)} />
          <div id="nameHelp" className="form-text text-danger">
            {formError.PamountError}
          </div>
          {/* //// */}
          <label htmlFor="Pprice" className="form-label  mt-2 ">
            Product Price
          </label>
          <input
            type="number"
            id="Pprice"
            name="Pprice"
            value={formDetails.Pprice}
            className={`form-control mb-2 ${
              formError.PpriceError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)}
          />
          <div id="nameHelp" className="form-text text-danger">
            {formError.PpriceError}
          </div>
          {/* //// */}
          <label htmlFor="Pdiscount" className="form-label  mt-2 ">
            Product Discount
          </label>
          <input
            type="number"
            id="Pdiscount"
            name="Pdiscount"
            value={formDetails.Pdiscount}
            className={`form-control mb-2 ${
              formError.PdiscountError && 'border-danger'
            } `}
            onChange={e => handelFormchange(e)} />
          <div id="nameHelp" className="form-text text-danger">
            {formError.PdiscountError}
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
