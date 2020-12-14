import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';

import ContactForm from '../components/ContactForm';
import ContactForm1 from '../components/ContactForm1';

class StudentContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
        }

    }

    componentDidMount() {

    }

    render() {
        
        return (
            <Fragment>
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Row className="no-gutters">
                            <Col md="6">
                                <Card className=" mr-3">
                                    <CardBody>
                                        <p className="fsize-2">First Contact</p>
                                        <ContactForm 
                                            initialValues={this.props.student_contact != null && this.props.student_contact[0]?this.props.student_contact[0]:null}
                                        />
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className=" ml-3">
                                    <CardBody>
                                        <p className="fsize-2">Second Contact</p>
                                        <ContactForm1
                                            initialValues={this.props.student_contact != null && this.props.student_contact[1]?this.props.student_contact[1]:null}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                            </Row>
                            
                        </Col>
                        
                    </div>
               
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentContactPage); 