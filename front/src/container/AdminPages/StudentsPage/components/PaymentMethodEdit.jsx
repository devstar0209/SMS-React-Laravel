import React, {useState, useEffect} from 'react'

import { Col, Row } from 'reactstrap'
import { Button, Icon, Radio } from 'semantic-ui-react';
import { reduxForm, reset, submit  } from 'redux-form';

import { Fields, validators, Loader } from '../../../../Common/Components';

import CreditCardForm from '../components/CreditCardForm'
import BankForm from '../components/BankForm'

const PaymentMethodEdit = (props) => {
    const {cardNumber, expiry, cvc, pay_plan} = props;
    const {handleSubmit} = props;
    const {handleCardNumberChange, handleCardExpiryChange, handleCardCVCChange,  handleChangePayPlan} = props;

    // const [pay_plan, handleChangePayPlan] = useState(props.initialValues && props.initialValues.plan);
    const [payment, handleChangePayment] = useState(props.initialValues && props.initialValues.method);

    
    useEffect(() => {
        console.log('edit', props.initialValues)
        if(props.initialValues !== undefined) {
            props.initialValues['plan'] = pay_plan;
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
                    <Col md="12" className="mt-5">
                        <Radio
                            label="Cash Payments"
                            name="payment"
                            value={3}
                            checked={payment === 3}
                            onChange={(e, {value})=>handleChangePayment(value)}
                        />
                    </Col>
                    <Row>
                        <label className="fsize-3 mt-5">Payment Option</label>
                    </Row>
                    <Row className="no-gutters mt-3  justify-content-between">
                        <Radio
                            label="Weekly"
                            name="pay_plan"
                            value={1}
                            checked={pay_plan === 1}
                            onChange={(e, {value})=>handleChangePayPlan(value)}
                        />
                        <Radio
                            label="Fortnightly"
                            name="pay_plan"
                            value={2}
                            checked={pay_plan === 2}
                            onChange={(e, {value})=>handleChangePayPlan(value)}
                        />
                        <Radio
                            label="Monthly"
                            name="pay_plan"
                            value={3}
                            checked={pay_plan === 3}
                            onChange={(e, {value})=>handleChangePayPlan(value)}
                        />
                        <Radio
                            label="Full"
                            name="pay_plan"
                            value={4}
                            checked={pay_plan === 4}
                            onChange={(e, {value})=>handleChangePayPlan(value)}
                        />
                        
                    </Row>

                    <Row className="justify-content-center mr-5 mt-5">
                        {(props.initialValues === undefined || props.initialValues.id === undefined) &&
                            <Button
                                className="mr-3"
                                color="green"
                                type="submit"
                            ><Icon name='vcard' />Add Payment</Button>
                        }
                        {props.initialValues !== undefined && props.initialValues.id !== undefined &&
                            <Button
                                className="mr-3"
                                color="green"
                                type="submit"
                            ><Icon name='vcard' />Update Payment</Button>
                        }
                    </Row>
                </Col>

            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'paymentForm',
    onSubmit: submit,
    enableReinitialize: true
})(PaymentMethodEdit)