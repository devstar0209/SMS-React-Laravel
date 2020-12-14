import React from 'react'
import { reduxForm, submit } from 'redux-form'
import {Row, Col} from 'reactstrap'
import { Button} from 'semantic-ui-react';

import { Fields, validators, Loader } from '../../../../Common/Components';

const Checkout = (props) => {
    const {handleSubmit} = props;

    return (
        <React.Fragment>
            <p className="fsize-3 mb-5">Payment Process</p>
            <form onSubmit={handleSubmit}>
            <Row className="no-gutters mt-4">
                <Col md="12">
                    <Col md="12">
                        <Fields.InputField
                            labelText="Amount"
                            name="price"
                            required
                            validate={[validators.required, validators.onlyNumbers]}
                        />
                    </Col>
                </Col>

                <Col md="12" className="text-center mt-4">
                    <Button color="red" >Process Payment</Button>
                </Col>
            </Row>
            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'checkoutform',
    onSubmit: submit
})(Checkout)