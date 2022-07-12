import Form from "./../formcomponent/index";
import { useState } from "react";
function PaymentSelect() {
  const [checked, setCheck] = useState(true);
  const [checked2, setCheck2] = useState(true);
  const [formChecked, setformChecked] = useState(true);
  const [formChecked2, setformChecked2] = useState(true);

  const checkchange = (e) => {
    // console.log(e.target.id, e.target.value);
    if (e.target.value === "on") {
      setCheck(false);
      setCheck2(true);
    }
  };
  const checkchange2 = (e) => {
    // console.log(e.target.id, e.target.value);
    if (e.target.value === "on") {
      setCheck2(false);
      setCheck(true);
    }
  };
  const formshoe = (e) => {
    setformChecked(formChecked === true ? false : true);
  };
  const formshoe2 = (e) => {
    setformChecked2(formChecked2 === true ? false : true);
  };
  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onClick={(e) => checkchange(e)}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <h6>Collect from home (Before Delivery Cash or Visa)</h6>
        </label>
      </div>
      <div className={`form-check ms-4 ${checked ? "d-none" : ""}`}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          defaultChecked
          onClick={(e) => formshoe(e)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          My billing and shipping address are the same.
        </label>
      </div>
      <Form hide={formChecked} />
      <hr></hr>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onClick={(e) => checkchange2(e)}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          <h6> Pay at Store</h6>
        </label>
      </div>
      <div className={`form-check ms-4 ${checked2 ? "d-none" : ""}`}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          defaultChecked
          onClick={(e) => formshoe2(e)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          My billing and shipping address are the same.
        </label>
      </div>
      <Form hide2={formChecked2} />
    </>
  );
}

export default PaymentSelect;
