import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button, Input} from 'reactstrap'
import CreditCardInput from 'react-credit-card-input'
import { Label } from 'semantic-ui-react'

export default (props) => {

    const {handleSubmit} = props

    const [cardNumber, cardNumberChange] = useState('');
    const [expiry, cardExpiryChange] = useState('');
    const [cvc, cardCVCChange] = useState('');

    const onConfirm = () => {
        var data = {}
        data['card_number'] = cardNumber;
        data['expiry'] = expiry;
        data['cvc'] = cvc;
        data['fee'] = props.fee;

        handleSubmit(data);
    }

    const handleCardNumberChange = (e) => {
        cardNumberChange(e.target.value);
    }
    const handleCardExpiryChange = (e) => {
        cardExpiryChange(e.target.value);
    }
    const handleCardCVCChange = (e) => {
        cardCVCChange(e.target.value);
    }

    return (
        <React.Fragment>
            <Row className="no-gutters">
                <Col md="12" className="text-center">
                    <h1>Confirm Booking</h1>
                </Col>
            </Row>
            <Row className="justify-content-center no-gutters">
                <Col md="3" className=" mt-5 ">
                    <h4>Credit Card Details</h4>
                    <Col md="12" className="mt-5">
                        <CreditCardInput
                            cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
                            cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
                            cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
                            fieldClassName="input"
                            containerStyle={{width: '100%', border: '1px solid #e8e8e8'}}
                        />
                    </Col>
                    <Col md="12" className="mt-5">
                        <Label>Membership Fee</Label>
                        <Input value={props.fee}/>
                    </Col>
                </Col>
            </Row>
            <Row className="mt-5 no-gutters justify-content-center">
                <Button className="pl-5 pr-5 btn-common btn-default-size" type="submit" onClick={onConfirm}>Confirm</Button>
            </Row>
            <Row className="mt-5 no-gutters justify-content-center">
                <span>Don't you want to register as a member? </span><Link to="/pla/login"> Login</Link>
            </Row>
        </React.Fragment>
    )
}