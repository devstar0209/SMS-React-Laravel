import React, {Fragment} from 'react'
import { Col} from 'reactstrap'
import { reduxForm,  submit  } from 'redux-form';

import { Fields } from '../../../../Common/Components';

const BankForm = (props) => {
    return(
    <Fragment>
        <Col md="12" className="mt-4">
            <Fields.InputField 
                labelText="Account Name"
                name="account_name"
            />
        </Col>
        <Col sm="6" md="12" lg="6" className="mt-4">
            <Fields.InputField 
                labelText="BSB"
                name="account_bsb"
            />
        </Col>
        <Col md="12" className="mt-4">
            <Fields.InputField 
                labelText="Account Number"
                name="account_number"
            />
        </Col>
    </Fragment>)
}

export default reduxForm({
    form: 'bankForm',
    onSubmit: submit,
})(BankForm)