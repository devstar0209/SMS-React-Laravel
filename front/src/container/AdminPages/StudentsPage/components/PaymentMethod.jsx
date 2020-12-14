import React from 'react'

import { Col, Row } from 'reactstrap'
import { Button, Icon, Radio } from 'semantic-ui-react';

export default (props) => {
    const { data } = props;
    const { togglePaymentMethodEdit } = props
    const payment_method = ['Credit Card Payments', 'Bank Payments', 'Cash Payments']

    return (
        <React.Fragment>
            <Row>
                <label className="fsize-3 mt-5 ml-3">Payment Method</label>
            </Row>
            <Col md="12" lg="12">
                <Col md="12">
                    <Radio
                        label={payment_method[data && data.method-1]}
                        name="payment"
                        checked={true}
                    />
                </Col>
            </Col>
            <Row>
                <label className="fsize-3 mt-5 ml-3">Payment Option</label>
            </Row>
                <Col md="12" lg="12">
                    <Col md="12">
                        <Radio
                            label={data.option.duration}
                            name="pay_plan"
                            checked={true}
                        />
                    </Col>
                </Col>

            <Row className="justify-content-center mr-5 mt-5">
                <Button
                    className="mr-3"
                    color="green"
                    onClick={togglePaymentMethodEdit}
                ><Icon name='vcard' />Edit Payment</Button>
            </Row>


        </React.Fragment>
    )
}