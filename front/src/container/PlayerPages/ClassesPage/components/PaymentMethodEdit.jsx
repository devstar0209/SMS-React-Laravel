import React, {useState, useEffect} from 'react'

import { Col, Button} from 'reactstrap'
import {  Radio } from 'semantic-ui-react';
import { reduxForm,  submit  } from 'redux-form';

import { Fields, validators } from '../../../../Common/Components';

import CreditCardForm from '../components/CreditCardForm'
import BankForm from '../components/BankForm'

const PaymentMethodEdit = (props) => {
    const {cardNumber, expiry, cvc, pay_plan} = props;
    const {handleSubmit} = props;
    const {handleCardNumberChange, handleCardExpiryChange, handleCardCVCChange} = props;

    const [payment, handleChangePayment] = useState(props.initialValues && props.initialValues.method);

    
    useEffect(() => {
        if(props.initialValues !== undefined) {
            props.initialValues['method'] = payment;
        }
      });

    return (
        <React.Fragment>
            <p className="fsize-3 mb-5">Payment Method</p>
            <form onSubmit={handleSubmit}>
                <Col md="12" lg="12">
                    <Col md="12">
                        <Radio
                            label="Credit Card Payments"
                            name="payment"
                            value={1}
                            checked={payment === 1}
                            onChange={(e, {value})=>handleChangePayment(value)}
                        />
                    </Col>
                    {payment === 1 &&
                        <Col md="12" className="mt-3">
                            <CreditCardForm
                                handleCardNumberChange={handleCardNumberChange}
                                handleCardExpiryChange={handleCardExpiryChange}
                                handleCardCVCChange={handleCardCVCChange}
                                cardNumber={cardNumber}
                                expiry={expiry}
                                cvc={cvc}
                                initialValues={props.initialValues}
                            />
                        </Col>
                    }
                    <Col md="12" className="mt-5">
                        <Radio
                            label="Bank Payments"
                            name="payment"
                            value={2}
                            checked={payment === 2}
                            onChange={(e, {value})=>handleChangePayment(value)}
                        />
                    </Col>
                    {payment === 2 &&
                        <Col md="12" className="mt-3">
                            <BankForm initialValues={props.initialValues} />
                        </Col>
                    }
                    
                    <Col md="12" className="mt-4">
                        <Col md="12">
                            <Fields.InputField
                                labelText="Amount"
                                name="price"
                                required
                                readOnly
                                validate={[validators.required, validators.onlyNumbers]}
                            />
                        </Col>
                    </Col>

                    <Col md="12" className="text-center mt-4">
                        <Button color="red" className="btn-common btn-default-size" >Check Out</Button>
                    </Col>
                </Col>

            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'classPaymentForm',
    onSubmit: submit,
    enableReinitialize: true
})(PaymentMethodEdit)