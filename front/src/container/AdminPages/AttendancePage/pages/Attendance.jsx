import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody, CardHeader, Button, ButtonGroup } from 'reactstrap';
import { reduxForm, reset, submit } from 'redux-form';

import { submitAttendance, requestClassStudentAttendance } from './../classactions'
import AttendanceMarkForm from './../components/AttendanceMarkForm'
import MakeupMarkForm from './../components/MakeupMarkForm'


class ClassAttendancePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attendance: [],
            absent: []
        }

        this.data = [];
        this.origin = [];

        this.makeup_attendance = [];

        this.handleCheck = this.handleCheck.bind(this);
        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handlePrev = this.handlePrev.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleCurrent = this.handleCurrent.bind(this)
    }

    componentDidMount() {

        if (this.props.loading === undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/attendance');
    }

    handleCheck(id, index, day, e) {

        var temp = this.data;
        var origin = this.origin;
        var pos_temp = temp[index].days.indexOf(day);
        var pos = origin[index].days.indexOf(day);
        console.log('pos', pos)
        console.log('origin', origin)

        if (pos_temp !== -1) {
            temp[index].days = temp[index].days.filter((item) =>  item !== day)
        }
        else {
            temp[index].days.push(day)
        }

        var temp_attendance = this.state.attendance;
        var temp_absent = this.state.absent;
        if(e.target.checked){
            var pos1 = temp_attendance.findIndex(item => item.student_id === id && item.day === day)
            // if (pos1 === -1) {
            //     if (pos === -1)
            //         temp_attendance.push({
            //             'student_id': id,
            //             'day': day
            //         });
            // }
            // else {
            //     temp_attendance.splice(pos1, 1);
            //     temp[index].days.splice(pos, 1);
            // }
            if (pos === -1)
                    temp_attendance.push({
                        'student_id': id,
                        'day': day
                    });
            var pos_absent = temp_absent.findIndex(item => item.student_id === id && item.day === day)
            if(pos_absent !== -1) temp_absent.splice(pos_absent, 1)
            console.log('temp_absent', temp_absent)
            console.log('temp_attendance', temp_attendance)
        }
        else{
            var pos1 = temp_absent.findIndex(item => item.student_id === id && item.day === day)
            // if (pos1 === -1) {
            //     if (pos !== -1)
            //         temp_absent.push({
            //             'student_id': id,
            //             'day': day
            //         });
            // }
            // else {
            //     temp_absent.splice(pos1, 1);
            //     temp[index].days.splice(pos, 1);
            // }
            if (pos !== -1)
                    temp_absent.push({
                        'student_id': id,
                        'day': day
                    });
            var pos_present = temp_attendance.findIndex(item => item.student_id === id && item.day === day)
            if(pos_present !== -1) temp_attendance.splice(pos_present, 1)
            console.log('temp_absent', temp_absent)
            console.log('temp_attendance', temp_attendance)
        }
        
        this.data = temp;
        this.setState({ attendance: temp_attendance })
        this.setState({ absent: temp_absent })

    }

    handlePrev() {
        this.data = [];
        var data = {}
        data['class_id'] = this.props.classId;
        data['first_day'] = this.props.startday;
        data['duration'] = 1;

        this.props.requestClassStudentAttendance(data);
    }

    handleNext() {
        this.data = [];
        var data = {}
        data['class_id'] = this.props.classId;
        data['first_day'] = this.props.startday
        data['duration'] = 2;

        this.props.requestClassStudentAttendance(data);
    }

    handleCurrent() {
        this.data = [];
        var data = {}
        data['class_id'] = this.props.classId;
        data['duration'] = 0;

        this.props.requestClassStudentAttendance(data);
    }

    handleSaveFormSubmit() {
        this.data = [];
        var data = {}
        data['attendance'] = this.state.attendance;
        data['absent'] = this.state.absent;
        data['class_id'] = this.props.classId;

        this.props.submitAttendance(data);
    }

    render() {

        if(this.props.initialValues !== undefined) {
            this.data = this.props.initialValues
            console.log(this.origin.length)
            if(this.origin.length === 0)
            this.origin = this.props.initialValues
        }

        const { handleSubmit } = this.props

        return (
            <Fragment>
                {this.props.initialValues != undefined &&
                    <Row className="classes-page no-gutters" >
                        {/* <div style={{ width: '100%' }}> */}

                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardHeader>
                                    <p className="fsize-3">Attendance Setup </p>
                                    <div className="btn-actions-pane-right">
                                        <Button className="btn-common btn-icon" type="submit" color="primary" onClick={this.handleSaveFormSubmit}>Save</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>

                                    <Card>
                                        <CardHeader>
                                            {this.props.className} Attendace
                                            <div className="btn-actions-pane-right">
                                                <ButtonGroup>
                                                    <Button color="secondary" className="btn-common" onClick={this.handlePrev}>Prev</Button>
                                                    <Button color="warning" className="btn-common" onClick={this.handleCurrent}>Current</Button>
                                                    <Button color="secondary" className="btn-common" onClick={this.handleNext}>Next</Button>
                                                </ButtonGroup>
                                            </div>
                                            </CardHeader>
                                        <CardBody>
                                            <form>
                                                <AttendanceMarkForm
                                                    handleCheck={this.handleCheck}
                                                    initialValues={this.data}
                                                    term={this.props.term}
                                                    startday={this.props.startday}
                                                />
                                            </form>
                                        </CardBody>
                                    </Card>

                                </CardBody>
                            </Card>
                        </Col>

                        {/* </div> */}
                    </Row>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let initialValues = state.attendanceReducer.attendance;
    let classId = state.attendanceReducer.classId;
    let className = state.attendanceReducer.className;
    let term = state.attendanceReducer.term;
    let startday = state.attendanceReducer.startday;
    let loading = state.attendanceReducer.loading;
    return {
        initialValues,
        loading,
        classId,
        className,
        term,
        startday
    }
};

const mapDispatchToProps = {
    submitAttendance,
    requestClassStudentAttendance
}

const connectedClassAttendancePage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'attendanceForm',
    onSubmit: submit,
    enableReinitialize: true,
})(ClassAttendancePage));
export { connectedClassAttendancePage as ClassAttendancePage }; 