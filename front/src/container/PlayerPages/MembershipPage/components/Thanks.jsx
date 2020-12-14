import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row, Card, CardBody} from 'reactstrap'
import { check_circle } from '../../../../Common/Assets/Images';
export default (props) => {
    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col md="3">
                    <Card>
                        <CardBody>
                            <Col md="12" className="d-flex justify-content-center mt-5">
                                <img src={check_circle}/>
                            </Col>
                            <Col md="12" className="d-flex justify-content-center mt-5">
                                <h1 className="fsize-2">Thanks for Registering!</h1>
                            </Col>
                            <Col md="12" className="d-flex justify-content-center mt-5">
                                <p >Your membership request will be reviewed and approved by admin shortly</p>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md="3" className="pr-5 pl-5 text-center">
                    <Link to="/pla/login">Go to Login</Link>
                </Col>
            </Row>

        </React.Fragment>
    )
}