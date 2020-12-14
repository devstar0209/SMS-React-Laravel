import React from 'react'
import { reduxForm, submit } from 'redux-form';

import { Button, Col, Row } from 'reactstrap';
import { Fields, validators, ImageDragDrop } from '../../../../Common/Components';

const ProfileForm = (props) => {
    const { handleChangeValue, handleChangeDOB, handleChangeImage } = props;
    const { dob, image } = props
    const { handleSubmit } = props
    console.log('profile', props.history)
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Row className="no-gutters">
                    <Col sm="6" >
                        <ImageDragDrop
                            handleChangeImage={handleChangeImage}
                            image={image}
                        />
                    </Col>
                    <Col sm="6">
                        {props.history.location.pathname.startsWith('/admin') && 
                        <Fields.InputField
                            labelText="School/Club Name"
                            name="school_name"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="First Name"
                            name="first_name"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="Last Name"
                            name="last_name"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md="12" className="d-flex">
                        <Fields.InputField
                            labelText="Address"
                            name="address"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Row>
                <Row >
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="City"
                            name="city"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="State"
                            name="state"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="Country"
                            name="country"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="6" className="mt-4">
                        <Fields.InputField
                            labelText="Postal Code"
                            name="postalcode"
                            required
                            validate={[validators.onlyNumbers]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="mt-4">
                        <Fields.DatePicker
                            labelText="DOB"
                            name="dob"
                            selected={dob}
                            required
                            icon
                            validate={[validators.required]}
                            onChange={handleChangeDOB}
                        />
                    </Col>
                    <Col md="4" className="mt-4">
                        <Fields.InputField
                            labelText="Phone"
                            name="mobile"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="4" className="mt-4">
                        <Fields.InputField
                            labelText="Email"
                            name="email"
                            required
                            validate={[validators.required, validators.email]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Row>

                <Row className="mt-5 justify-content-center">
                    <Button className="btn-common btn-icon" >Save</Button>
                </Row>
            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'profileForm',
    onSubmit: submit,
    enableReinitialize: true
})(ProfileForm)