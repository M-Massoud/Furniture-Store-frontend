import Form from "./../formcomponent/index";

import PaymentSelect from './../paymentcomponent/index';
function Checkout() {
   
  return (
    <>
      <div className=" row mt-5 flex-wrap py-2 ">
        <div className="col-12  col-md-8 p-md-4 ">
          <div className="col-12 bg-white  rounded-3 row flex-wrap py-4 px-3 m-auto">
            <div className="col-md-7  col-12 ">
              <h3 className=" p-2 mt-2"> Shipping Address</h3>
              <div className=" row p-2 col-12 m-auto">
                <Form />
              </div>
            </div>
            <div className="col-md-5  col-12 d-flex flex-column p-2 ">
              <div className=" col-12 p-2">
                <h4 className=" p-1 "> Payment Method</h4>
                {/* ///////////////////////// */}
                <PaymentSelect/>
              </div>
              <hr></hr>
              <div className=" col-12 p-2">
                <h4 className=" p-1 "> Shipping Method </h4>
                <h6 className=" p-1 mt-3 ">
                  Free delivery (Cairo,Giza,October City, Alexandria and North
                  coast).
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12  col-md-4 p-md-4 ">
          <div className="col-12 bg-white border rounded-3 row flex-wrap py-4 px-3 m-auto">
            <div className="col-12  border   border">order component</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
