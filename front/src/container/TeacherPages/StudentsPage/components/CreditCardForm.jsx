import React, {Fragment} from 'react'
import { Col} from 'reactstrap'
import { reduxForm,  submit  } from 'redux-form';

import { Fields } from '../../../../Common/Components';

const CreditCardForm =  (props) => {
    return(
        <Fragment>
            <Col md="12">
                <Fields.InputField 
                    labelText="Last Four"
                    name="last_four"
                />
            </Col>
            <Col md="12">
                <Fields.InputField 
                    labelText="Creat Card Owner"
                    name="customer_name"
                />
            </Col>
        </Fragment>
    )
}

export default reduxForm({
    form: 'cardForm',
    onSubmit: submit,
})(CreditCardForm)