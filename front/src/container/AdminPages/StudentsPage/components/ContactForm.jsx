import React from 'react';
import {Col, Row} from 'reactstrap';
import { reduxForm, reset, submit  } from 'redux-form';
import { Button, Icon } from 'semantic-ui-react';

import { Fields, validators } from '../../../../Common/Components';

const ContactForm = (props) => {
    const {handleChangeValue, handleCancel, handleDelete} = props
    const {handleSubmit} = props
    const {initialValues} = props
    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="First Name"
                        name="first_name"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="Last Name"
                        name="last_name"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                
            </Row>
            <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="Mobile No."
                        name="mobile"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="Work No."
                        name="work"
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row>
            {/* <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="Occupation"
                        name="occupation"
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row> */}
            <Row>
                <Col md="9">
                    <Fields.InputField 
                        labelText="Relationship"
                        name="relationship"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row>
            <input name="id" style={{display: 'none'}} />
            <Row className="justify-content-end mr-5 mt-5">
                {/* <Button 
                    className="mr-3"
                    color="blue"
                    type="button"
                    onClick={handleCancel}
                ><Icon name='cancel' />Back</Button> */}
                {/* {initialValues != undefined && initialValues != null &&
                <Button 
                    className="mr-3"
                    color="red"
                    type="button"
                    onClick={(e) => handleDelete(initialValues.id)}
                ><Icon name='trash' />Delete</Button>
                }
                <Button 
                    className="mr-3"
                    color="green"
                    // type="submit"
                ><Icon name='save' />Save</Button> */}
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'contactForm',
    onSubmit: submit,
    enableReinitialize: true
})(ContactForm)