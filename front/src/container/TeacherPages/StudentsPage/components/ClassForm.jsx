import React from 'react'
import {Col, Row} from 'reactstrap';
import { reduxForm, submit  } from 'redux-form';

import { Fields } from '../../../../Common/Components';

const ClassForm = (props) => {

    return(
    <React.Fragment>
        <Row>
            <Col md="4">
                <Col xl="9" lg="11" md="12">
                <Fields.InputField 
                    labelText="Class Type"
                    name="type"
                    onlyRead
                />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                <Fields.InputField 
                    labelText="Class Area"
                    name="area"
                    required
                />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Day"
                        name="day"
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Start Time"
                        name="start_time"
                    />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Finish Time"
                        name="finish_time"
                    />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Duration"
                        name="duration"
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            
            <Col md="6">
                <Row>
                    <Col md="6">
                        <Col xl="9" lg="12">
                            <Fields.InputField 
                                labelText="Min. Age"
                                name="min_age"
                            />
                            
                        </Col>
                    </Col>
                    <Col md="6">
                        <Col xl="9" lg="12">
                        
                            <Fields.InputField 
                                labelText="Max. Age"
                                name="max_age"
                            />
                        </Col>
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col md="6">
                        <Col xl="9" lg="12">
                            <Fields.InputField 
                                labelText="Max No. in Class"
                                name="max_no"
                            />
                        </Col>
                    </Col>
                    
                </Row>
            </Col>
        </Row>
    </React.Fragment>
)
}

export default reduxForm({
    form: 'studentClassForm',
    onSubmit: submit,
    enableReinitialize: true
})(ClassForm)