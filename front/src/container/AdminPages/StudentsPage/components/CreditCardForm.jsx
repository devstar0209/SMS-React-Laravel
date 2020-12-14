import React, {Fragment} from 'react'
import CreditCardInput from 'react-credit-card-input';
import {Row, Col} from 'reactstrap'
import { Fields, validators, Loader } from '../../../../Common/Components';

export default (props) => {
    const {handleCardNumberChange, handleCardExpiryChange, handleCardCVCChange} = props;
    const {cardNumber, expiry, cvc} = props
    return(
        <Fragment>
            <Col md="10" lg="12" xl="10">
                <CreditCardInput
                    cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
                    cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
                    cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
                    fieldStyle={{border: '1px solid #ced4da'}}
                    containerStyle={{width: '100%'}}
                    fieldClassName="input"
                />
            </Col>
            <Col md="10" lg="12" xl="10" className="mt-4">
                <Fields.InputField 
                    labelText="Card Owner Name"
                    name="customer_name"
                    required
                    validate={[validators.required, validators.onlyLetters, validators.maximumLength254]}
                />
            </Col>
        </Fragment>
    )
}