import React from 'react'
import {Col, Row} from 'reactstrap';
import { reduxForm,  submit  } from 'redux-form';

import { Fields } from '../../../../Common/Components';

const EventForm = (props) => {

    return(
    <React.Fragment>
        <Row>
            <Col md="12" className="d-flex">
                <Col md="2">
                    <Fields.InputField 
                        labelText="Event Name"
                        name="name"
                        disabled
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Event Type"
                        name="type"
                        disabled
                    />
                </Col>
                <Col md="2">
                <Fields.InputField 
                    labelText="Event Organiser"
                    name="organiser"
                    disabled
                />
            </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="8">
                    <Fields.InputField 
                        labelText="Location"
                        name="location"
                        disabled
                    />
                </Col>
                <Col md="4">
                    <Fields.InputField 
                        labelText="Status"
                        name="status"
                        disabled
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="2">
                    <Fields.InputField 
                        labelText="Start Time"
                        name="start_time"
                        disabled
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Finish Time"
                        name="finish_time"
                        disabled
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Start Date"
                        name="start_date"
                        disabled
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Finish Date"
                        name="finish_date"
                        disabled
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Total Entry Fee"
                        name="fee"
                        disabled
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                
                <Col md="6">
                    <Fields.InputField 
                        labelText="Students"
                        name="students"
                        disabled
                    />
                </Col>
            </Col>
        </Row>
    </React.Fragment>
)
}


export default reduxForm({
    form: 'studentEventForm',
    onSubmit: submit,
    enableReinitialize: true
})(EventForm)