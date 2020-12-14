import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';

import {  Modal } from '../../../../Common/Components';

import { requestStudentContactCreate, requestStudentContactUpdate, requestStudentContactDelete, gotoStudentPayment, backDetail } from '../kidsactions'

import ContactForm from '../components/ContactForm';
import ContactForm1 from '../components/ContactForm1';

class KidContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            deleteModalFlag: false,
            deleteid: 0
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    componentDidMount() {
        console.log(this.props.id)
    }

    handleSaveFormSubmit(data) {
        data['student_id'] = this.props.id;//student_id
        this.props.requestStudentContactUpdate(data)
    }

    handleChangeValue(e) {
        console.log('select', e);
    }

    handlePayment() {
        this.props.gotoStudentPayment()
    }

    handleDelete() {
        var data = {}
        data['id'] = this.state.deleteid
        this.props.requestStudentContactDelete(data)
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    toggleDeleteModal(id) {
        this.setState({ deleteid: id })
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    render() {

        return (
            <Fragment>
                <div style={{ width: '100%' }}>
                    <Col md="12" className="mt-3">
                        <Row className="no-gutters">
                            <Col md="6">
                                <Card className=" mr-3">
                                    <CardBody>
                                        <p className="fsize-2">First Contact</p>
                                        <ContactForm
                                            onSubmit={this.handleSaveFormSubmit}
                                            handleChangeValue={this.handleChangeValue}
                                            handleDelete={this.toggleDeleteModal}
                                            handleCancel={this.props.backDetail}
                                            initialValues={this.props.student_contact != null && this.props.student_contact[0] ? this.props.student_contact[0] : null}
                                        />
                                        {/* <div className="d-flex justify-content-center mt-5">
                                            <Button 
                                                    className=""
                                                    color="orange"
                                                    type="button"
                                                    onClick={this.handlePayment}
                                                ><Icon name='hand point right outline' className="mr-1"/>Payment</Button>
                                        </div> */}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className=" ml-3">
                                    <CardBody>
                                        <p className="fsize-2">Second Contact</p>
                                        <ContactForm1
                                            onSubmit={this.handleSaveFormSubmit}
                                            handleChangeValue={this.handleChangeValue}
                                            handleDelete={this.toggleDeleteModal}
                                            handleCancel={this.props.backDetail}
                                            initialValues={this.props.student_contact != null && this.props.student_contact[1] ? this.props.student_contact[1] : null}
                                        />
                                        {/* <div className="d-flex justify-content-center mt-5">
                                            <Button 
                                                    className=""
                                                    color="orange"
                                                    type="button"
                                                    onClick={this.handlePayment}
                                                ><Icon name='hand point right outline' className="mr-1"/>Payment</Button>
                                        </div> */}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Col>

                </div>
                <Modal
                    open={this.state.deleteModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to delete this kid?"
                    hasActionButtons
                    onConfirm={this.handleDelete}
                    onCancel={this.toggleDeleteModal}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    // let student_contact = state.parentKidReducer.student_contact;
    // return {
    //     student_contact,
    // }
};

const mapDispatchToProps = {
    requestStudentContactCreate,
    requestStudentContactUpdate,
    requestStudentContactDelete,
    gotoStudentPayment,
    backDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(KidContactPage); 