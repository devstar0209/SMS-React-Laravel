import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row,  Button } from 'reactstrap';
import { reduxForm, submit } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment'

import { Modal } from '../../../../Common/Components';
import StudentForm from '../components/StudentForm'
import Contact from './Contact'
import PaymentPage from './Payment'

import { requestStudentUpdate, requestStudentDelete, requestStudentContactDetail, gotoStudentPayment, requestStudentClasses, saveMakeupAttendance } from './../studentsactions'
import History from '../pages/History';

class StudentDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            image: null,
            deleteModalFlag: false,
            gender: -1,
            activemode: 0,
            makeup_1: null,
            makeup_2: null,
            makeup_3: null,
            makeup_attendance: null,
            makeup_present: null,
            makeup_present_temp: null,
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeValueGender = this.handleChangeValueGender.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleContact = this.handleContact.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleActiveMode = this.handleActiveMode.bind(this);

        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);

        this.handleChangeMakeup = this.handleChangeMakeup.bind(this);
        this.handleChangeMakeupMark = this.handleChangeMakeupMark.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/students');
    }

    handleSaveFormSubmit(data) {
        if (this.state.image != null)
            data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY');
        if (this.state.makeup_1)
            data['makeup_1'] = moment(this.state.makeup_1).format('DD/MM/YYYY');
        if (this.state.makeup_2)
            data['makeup_2'] = moment(this.state.makeup_2).format('DD/MM/YYYY');
        if (this.state.makeup_3)
            data['makeup_3'] = moment(this.state.makeup_3).format('DD/MM/YYYY');
        data['gender'] = this.state.gender;
        data['active'] = this.state.activemode;
        this.props.requestStudentUpdate(data);
        this.handleMakeupSave();
    }

    handleChangeValue() {
    }

    handleChangeValueGender(e, { value }) {
        this.setState({ gender: value })
    }

    handleChangeDOB(date) {
        this.setState({ dob: date });
    }

    handleCancel() {
        this.props.history.push('/admin/students');
    }

    handleDelete() {
        var data = {}
        data['id'] = this.props.initialValues.id;//student_id
        this.props.requestStudentDelete(data);
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleContact() {
        var data = {}
        data['id'] = this.props.initialValues.id;//student_id
        this.props.requestStudentContactDetail(data);
    }

    handleHistory() {
        var data = {}
        data['id'] = this.props.initialValues.id;//student_id
        this.props.requestStudentClasses(data);
    }

    handlePayment() {
        this.props.gotoStudentPayment()
    }

    handleChangeImage(image) {
        this.setState({ image: image });
    }

    handleActiveMode(mode) {
        this.setState({ activemode: mode });
    }

    toggleDeleteModal() {
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleChangeMakeup(date, index) {
        switch (index) {
            case 1:
                this.setState({ makeup_1: date });
                break;
            case 2:
                this.setState({ makeup_2: date });
                break;
            case 3:
                this.setState({ makeup_3: date });
                break;
        }

    }

    handleChangeMakeupMark(date, e) {
        var data = this.state.makeup_present;
        if (e.target.checked) {
            data.push(date);
        }
        else
            data = this.state.makeup_present.filter((item) => { return item !== date })
        console.log(data)
        this.setState({ makeup_present: data });
    }

    handleMakeupSave() {
        var data = {};
        data['student_id'] = this.props.initialValues.id;
        data['data'] = this.state.makeup_present;
        console.log('makeup mark', this.state.makeup_present)
        if (this.state.makeup_present !== this.state.makeup_present_temp)
            this.props.saveMakeupAttendance(data);
    }

    render() {

        const { handleSubmit } = this.props

        if (this.props.initialValues !== undefined && this.state.gender === -1) {
            this.setState({ gender: this.props.initialValues.gender });

        }

        if (this.props.initialValues !== undefined && this.state.activemode === 0) {
            this.setState({ activemode: this.props.initialValues.active });
        }

        if (this.props.makeup_classes && this.state.makeup_attendance === null) {
            var data = [];
            var present = [];

            this.props.makeup_classes.map(item => (
                item.status ? present.push(item.date) : '',
                data.push(item.date)
            )
            );
            while (data.length < 3) data.push("");
            this.setState({ makeup_attendance: data });
            this.setState({ makeup_present: present });
            this.setState({ makeup_present_temp: present });
        }

        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    {this.props.initialValues && !this.props.contactflag && !this.props.paymentflag && !this.props.historyflag &&
                        <div style={{ width: '100%' }}>
                            <Col md="12" className="mt-3">
                                <p className="fsize-3 mb-5">Student Detail</p>
                                <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                    <StudentForm
                                        handleChangeDOB={this.handleChangeDOB}
                                        handleChangeValue={this.handleChangeValue}
                                        handleChangeValueGender={this.handleChangeValueGender}
                                        handleActiveMode={this.handleActiveMode}
                                        initialValues={this.props.initialValues}
                                        image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                                        handleChangeImage={this.handleChangeImage}
                                        dob={this.state.dob}
                                        gender={this.state.gender}
                                        activemode={this.state.activemode}
                                        classes={this.props.classes}
                                        handleChangeMakeup={this.handleChangeMakeup}
                                        handleChangeMakeupMark={this.handleChangeMakeupMark}
                                        makeup_attendance={this.state.makeup_attendance}
                                        makeup_present={this.state.makeup_present}
                                        makeup_1={this.state.makeup_1}
                                        makeup_2={this.state.makeup_2}
                                        makeup_3={this.state.makeup_3}
                                    />
                                    <Row className="justify-content-end mr-5 mt-5">
                                        <Button
                                            className="mr-3 btn-common btn-icon"
                                            color="blue"
                                            type="button"
                                            onClick={this.handleCancel}
                                        ><Icon name='cancel' />Cancel</Button>
                                        {/* <Button
                                                    className="mr-3"
                                                    color="red"
                                                    type="button"
                                                    onClick={this.toggleDeleteModal}
                                                ><Icon name='trash' />Delete</Button> */}
                                        <Button
                                            className="mr-3 btn-common btn-icon"
                                            color="green"
                                            type="submit"
                                        ><Icon name='save' />Save</Button>
                                        <Button
                                            className="mr-3 btn-common btn-icon"
                                            color="brown"
                                            type="button"
                                            onClick={this.handleHistory}
                                        // disabled={!!!this.props.initialValues.class_id || this.props.initialValues.class_id === '[]' || this.props.initialValues.class_id === ''}
                                        ><Icon name='clock' className="mr-1" />History</Button>
                                        <Button
                                            className="mr-3 btn-common btn-icon"
                                            color="yellow"
                                            type="button"
                                            onClick={this.handleContact}
                                        ><Icon name='address book' className="mr-1" />Contact</Button>
                                        {/* <Button
                                                    className=""
                                                    color="orange"
                                                    type="button"
                                                    onClick={this.handlePayment}
                                                ><Icon name='vcard' className="mr-1" />Payment</Button> */}
                                    </Row>
                                </form>
                            </Col>

                        </div>
                    }
                    {this.props.contactflag &&
                        <Contact
                            student_contact={this.props.student_contact}
                            id={this.props.initialValues.id}
                        />
                    }
                    {this.props.paymentflag &&
                        <PaymentPage
                            id={this.props.initialValues.id}
                        />
                    }
                    {this.props.historyflag &&
                        <History
                            attendance_classes={this.props.initialValues.class_id}
                            classes={this.props.classes}
                            makeup_classes_history={this.props.makeup_classes_history}
                            attendance_data={this.props.attendance_data}
                            id={this.props.initialValues.id}
                        />
                    }
                </Row>
                <Modal
                    open={this.state.deleteModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to delete this student?"
                    hasActionButtons
                    onConfirm={this.handleDelete}
                    onCancel={this.toggleDeleteModal}
                />

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let initialValues = state.studentReducer.student;
    let classes = state.studentReducer.classes;
    let makeup_classes = state.studentReducer.makeup_classes;
    let makeup_classes_history = state.studentReducer.makeup_classes_history;
    let contactflag = state.studentReducer.contactflag;
    let paymentflag = state.studentReducer.paymentflag;
    let historyflag = state.studentReducer.historyflag;
    let student_contact = state.studentReducer.student_contact;
    let loading = state.studentReducer.loading;
    return {
        initialValues,
        classes,
        makeup_classes,
        makeup_classes_history,
        contactflag,
        paymentflag,
        historyflag,
        student_contact,
        loading
    }
};

const mapDispatchToProps = {
    requestStudentUpdate,
    requestStudentDelete,
    requestStudentContactDetail,
    gotoStudentPayment,
    requestStudentClasses,
    saveMakeupAttendance
}

const connectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'studentsDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(StudentDetailPage));
export { connectedStudentsPage as StudentDetailPage }; 