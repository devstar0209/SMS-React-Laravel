import React from 'react'
import {Col, Row} from 'reactstrap';
import classNames from 'classnames'
import { Fields, validators, ImageDragDrop } from '../../../../Common/Components';

export default (props) => {

   const {handleChangeDOB, handleChangeImage, handleChangeValue} = props;
   const {dob, image} = props;
    return(
    <React.Fragment>
        <Row>
            <Col md="6">
                <Col md="12">
                    <Fields.InputField 
                        labelText="First Name"
                        name="first_name"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="12" className="mt-4">
                    <Fields.InputField 
                        labelText="Last Name"
                        name="last_name"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
            <Col md="6" >
                <Col md="12" className="d-flex justify-content-center profile-image">
                    <Col md="6">
                        <ImageDragDrop
                            handleChangeImage = {handleChangeImage}
                            image={image}
                        />
                    </Col>
                </Col>
                <Col md="12" className="d-flex justify-content-center">
                    {props.initialValues !== undefined && props.initialValues.membership !== null && props.initialValues.membership.pay_status == 1 && <p className={classNames(`member_${props.initialValues.membership.status}`)}>{props.initialValues.membership.status === -1? '': props.initialValues.membership.status === 0? 'Waiting': 'Member'}</p> }
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="8">
                    <Fields.InputField 
                        labelText="Address"
                        name="address"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="4">
                    <Fields.InputField 
                        labelText="City"
                        name="city"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                
                <Col md="3">
                    <Fields.InputField 
                        labelText="Postal Code"
                        name="postalcode"
                        required
                        validate={[validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="3">
                    <Fields.DatePicker 
                        labelText="DOB"
                        name="dob"
                        selected = {dob}
                        required
                        icon
                        validate={[validators.required]}
                        onChange={handleChangeDOB}
                    />
                </Col>
                <Col md="3">
                    <Fields.InputField 
                        labelText="Phone"
                        name="mobile"
                        required
                        readOnly
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="3">
                    <Fields.InputField 
                        labelText="Email"
                        name="email"
                        required
                        readOnly
                        validate={[validators.required, validators.email]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            
        </Row>
    </React.Fragment>
)
}