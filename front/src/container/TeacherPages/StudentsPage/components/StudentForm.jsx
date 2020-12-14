import React from 'react'
import {Col, Row} from 'reactstrap';
import { Fields } from '../../../../Common/Components';
import {Radio} from 'semantic-ui-react'
import { reduxForm,  submit  } from 'redux-form';

import ImageProfile from './ImageProfile';

const StudentForm = (props) => {
    const {image, gender} = props

    return(
    <React.Fragment>
        <Row>
            <Col md="6">
                <Col md="12">
                    <Fields.InputField
                        labelText="First Name"
                        name="first_name"
                        disabled
                    />
                </Col>
                <Col md="12" className="mt-4">
                    <Fields.InputField 
                        labelText="Last Name"
                        name="last_name"
                        disabled
                    />
                </Col>
                <Col md="6" lg="6" sm="6" xs="6" className="mt-4 d-flex justify-content-between" disabled>
                    <label style={{fontSize: 15, color: 'black'}}>Gender</label>
                    <Radio
                        label="Male"
                        name="gender"
                        value={1} 
                        checked={gender === 1}
                    />
                    <Radio
                        label="Female"
                        name="gender"
                        value={2} 
                        checked={gender === 2}
                    />
                </Col>
            </Col>
            <Col md="6" className="d-flex justify-content-center profile-image">
                <Col lg="12" xl="6">
                    <ImageProfile
                        image={image}
                        disabled
                    />
                </Col>
            </Col>
            
        </Row>
        <Row className="mt-4">
            <Col md="12" lg="6">
                <Col md="12">
                    <Fields.InputField 
                        labelText="Address"
                        name="address"
                        disabled
                    />
                </Col>
            </Col>
            <Col md="12" lg="6">
                <Col md="6">
                    <Fields.InputField 
                        labelText="City"
                        name="city"
                        disabled
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col xl="2" lg="3" sm="2">
                    <Fields.InputField 
                        labelText="Postal Code"
                        name="postalcode"
                        disabled
                    />
                </Col>
                <Col xl="2" lg="3" sm="3">
                    <Fields.InputField 
                        labelText="DOB"
                        name="dob"
                        disabled
                    />
                </Col>
                <Col xl="2" lg="3" sm="3">
                    <Fields.InputField 
                        labelText="Phone"
                        name="mobile"
                        disabled
                    />
                </Col>
                <Col xl="2" lg="3" sm="3">
                    <Fields.InputField 
                        labelText="Email"
                        name="email"
                        disabled
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" lg="6" className="d-flex">
                <Col md="6" lg="6">
                    <Fields.InputField 
                        labelText="Class No."
                        name="class_no"
                        disabled
                    />
                </Col>
                
            </Col>
        </Row>
    </React.Fragment>
)
}

export default reduxForm({
    form: 'studentPersonalForm',
    onSubmit: submit,
    enableReinitialize: true
})(StudentForm)