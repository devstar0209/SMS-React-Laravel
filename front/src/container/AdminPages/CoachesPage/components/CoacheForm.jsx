import React from 'react'
import {Col, Row, Button} from 'reactstrap';
import { Fields, validators, ImageDragDrop } from '../../../../Common/Components';

export default (props) => {

   const {handleChangeDOB, handleChangeImage, handleChangeValue, handleGeneratePassword, handleChangePassword} = props;
   const {dob, image, showPassword} = props
   console.log('initial', props.initialValues)
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
            <Col md="6" className="d-flex justify-content-center profile-image">
                <Col md="6">
                    <ImageDragDrop
                        handleChangeImage = {handleChangeImage}
                        image={image}
                    />
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
                        labelText="Certification"
                        name="certification"
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="3">
                    <Fields.InputField 
                        labelText="City"
                        name="city"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Postal Code"
                        name="postalcode"
                        required
                        validate={[validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="2">
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
                <Col md="2">
                    <Fields.InputField 
                        labelText="Phone"
                        name="mobile"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="3">
                    <Fields.InputField 
                        labelText="Email"
                        name="email"
                        required
                        validate={[validators.required, validators.email]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="2">
                    <Fields.InputField 
                        labelText="No. of Classes"
                        name="no_of_classes"
                        required
                        validate={[validators.required, validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Total Hours"
                        name="total_hours"
                        required
                        validate={[validators.required, validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="6" className="d-flex">
                    <Col md="8">
                        <Fields.InputField
                            labelText="Password"
                            name="password"
                            required
                            validate={[validators.required]}
                            type={showPassword ? "" : "password"}
                            onChange={handleChangePassword}
                        />
                    </Col>
                    {/* <Col md="4" className="mt-5">
                        <Button type="button" onClick={handleGeneratePassword}>GENERATE</Button>
                    </Col> */}
                </Col>
            </Col>
        </Row>
    </React.Fragment>
)
}