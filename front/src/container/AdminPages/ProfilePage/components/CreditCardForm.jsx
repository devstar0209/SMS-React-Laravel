import React, { Fragment, useEffect } from "react";

import CreditCardInput from "react-credit-card-input";
import {  Col, Button } from "reactstrap";

const CreditCardFrom = props => {
  const {
    handleCardNumberChange,
    handleCardExpiryChange,
    handleCardCVCChange
  } = props;
  const { cardNumber, expiry, cvc } = props;
  const { handleSubmit } = props;

  useEffect(() => {
    const script = document.createElement("script");
    // script.src = "http://ezyattend.com.au:3000/cardPayframe.js";
    script.src = "http://ezyattend.com.au/addcardPayframe.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const submitFrame =() => {
  //   console.log('here')
    
  // }

  return (
    <Fragment>
      {/* <form onSubmit={handleSubmit}> */}
        <Col md="12" lg="12" xl="12" style={{ display: "none" }}>
          <CreditCardInput
            cardNumberInputProps={{
              value: cardNumber,
              onChange: handleCardNumberChange
            }}
            cardExpiryInputProps={{
              value: expiry,
              onChange: handleCardExpiryChange
            }}
            cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
            fieldStyle={{ border: "1px solid #ced4da" }}
            containerStyle={{ width: "100%" }}
            fieldClassName="input"
          />
        </Col>
        <Col
          md="12"
          lg="12"
          xl="12"
          className="mt-4"
          style={{ display: "none" }}
        >
          {/* <Fields.InputField
            labelText="Card Owner Name"
            name="customer_name"
            required
            validate={[
              validators.required,
              validators.onlyLetters,
              validators.maximumLength254
            ]}
          /> */}
        </Col>
        <div id="cardFrame" />
        <p className="fsize-5" id="cardID"></p>
        <Col md="12" className="mt-5 justify-content-center d-flex">
          <Button className=" btn-common btn-icon" id="submitButton" >
            Save
          </Button>
        </Col>
      {/* </form> */}
    </Fragment>
  );
};

// export default reduxForm({
//   form: "CreditCardFrom",
//   onSubmit: submit,
//   enableReinitialize: true
// })(CreditCardFrom);

export default CreditCardFrom;