import React, {Fragment} from 'react'
import { reduxForm, submit  } from 'redux-form';
import { Col, Button} from 'reactstrap'

import { Fields, validators } from '../../../../Common/Components';

const BankForm = (props) => {
    const {handleSubmit} = props
    return(
    <Fragment>
        <form onSubmit={handleSubmit}>
            <Col md="12" className="mt-4">
                <Fields.InputField 
                    labelText="Account Name"
                    name="account_name"
                    validate={[validators.required, validators.onlyLetters, validators.maximumLength254]}
                    required
                />
            </Col>
            <Col sm="6" md="12" lg="6" className="mt-4">
                <Fields.InputField 
                    labelText="BSB"
                    name="bsb"
                    validate={[validators.required, validators.onlyNumbers, validators.maximumLength254]}
                    required
                />
            </Col>
            <Col md="12" className="mt-4">
                <Fields.InputField 
                    labelText="Account Number"
                    name="account_no"
                    validate={[validators.required, validators.onlyNumbers, validators.maximumLength254]}
                    required
                />
            </Col>
            <Col md="12" className="mt-5 justify-content-center d-flex" >
                <Button className=" btn-common btn-default-size" block >Save</Button>
            </Col>
        </form>
    </Fragment>
    )
}
export default reduxForm({
    form: 'BankForm',
    onSubmit: submit,
    enableReinitialize: true
})(BankForm)