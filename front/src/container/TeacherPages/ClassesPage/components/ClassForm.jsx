import React from 'react'
import {Col, Row} from 'reactstrap';
import { Fields, validators } from '../../../../Common/Components';

export default (props) => {

    return(
    <React.Fragment>
        <Row>
            <Col md="4">
                <Col xl="9" lg="11" md="12">
                <Fields.InputField 
                    labelText="Class Type"
                    name="type"
                    disabled
                />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                <Fields.InputField 
                    labelText="Class Area"
                    name="area"
                    disabled
                />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Day"
                        name="day"
                        disabled
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
                        disabled
                    />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Finish Time"
                        name="finish_time"
                        disabled
                    />
                </Col>
            </Col>
            <Col md="4">
                <Col xl="9" lg="11" sm="12">
                    <Fields.InputField 
                        labelText="Duration"
                        name="duration"
                        disabled
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
                                disabled
                            />
                            
                        </Col>
                    </Col>
                    <Col md="6">
                        <Col xl="9" lg="12">
                        
                            <Fields.InputField 
                                labelText="Max. Age"
                                name="max_age"
                                disabled
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
                                disabled
                            />
                        </Col>
                    </Col>
                    
                </Row>
            </Col>
        </Row>
    </React.Fragment>
)
}