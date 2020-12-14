import React, {Fragment} from 'react';
import {Col,  Card, CardBody} from 'reactstrap';

import CreditCardForm from '../components/CreditCardForm'
import BankForm from '../components/BankForm'

export default (props) => {

        const {payment}= props

        return (
            <Fragment>
                <Col md="12" className="mt-3">
                    <Card className="">
                        <CardBody>
                            <p className="fsize-3 mb-5">Payment Method</p>
                                <Col md="6" lg="4">
                                   
                                    {payment.card != null && payment.card != undefined &&
                                        <Col md="12" className="mt-3">
                                            <CreditCardForm initialValues={payment.card}/>
                                        </Col>
                                    }
                                    
                                    {payment.bank != null && payment.bank != undefined &&
                                        <Col md="12" className="mt-3">
                                            <BankForm initialValues={payment.bank}/>
                                        </Col>
                                    }
                                   
                                </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Fragment>
        );
}