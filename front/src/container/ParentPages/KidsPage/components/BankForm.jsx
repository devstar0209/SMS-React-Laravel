import React, {Fragment} from 'react'
import {Row, Col} from 'reactstrap'
import { Fields, validators, Loader } from '../../../../Common/Components';

export default (props) => {
    return(
    <Fragment>
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
    </Fragment>)
}