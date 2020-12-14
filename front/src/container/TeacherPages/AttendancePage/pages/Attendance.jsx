import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody, CardHeader, Button, ButtonGroup } from 'reactstrap';
import { reduxForm, reset, submit } from 'redux-form';

import { submitAttendance, requestNextWeekAttendance, requestPrevWeekAttendance, requestTodayAttendance } from './../classactions'
import AttendanceMarkForm from './../components/AttendanceMarkForm'
import MakeupMarkForm from './../components/MakeupMarkForm'


class ClassAttendancePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            attendance: [],
            makeup_data: [],
            
        }

        this.makeup_attendance = [];

        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckMakeup = this.handleCheckMakeup.bind(this);
        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handlePrevWeek = this.handlePrevWeek.bind(this)
        this.handleNextWeek = this.handleNextWeek.bind(this)
        this.handleToday = this.handleToday.bind(this)
    }

    componentDidMount() {

        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/page/attendance');
    }

    handleCheck(id, index, day) {

        var temp = this.state.data;

        var pos = temp[index].days.indexOf(day)
        if (pos !== -1) {
            // temp[index].days.splice(pos, 1);
        }
        else {
            temp[index].days.push(day)
        }

        var temp_attendance = this.state.attendance;
        var pos1 = temp_attendance.findIndex(item => item.student_id === id && item.day === day)
        if (pos1 === -1) {
            if (pos === -1)
                temp_attendance.push({
                    'student_id': id,
                    'day': day
                });
        }
        else {
            temp_attendance.splice(pos1, 1);
            temp[index].days.splice(pos, 1);
        }

        this.setState({ data: temp });
        this.setState({ attendance: temp_attendance })

    }

    handleCheckMakeup(id, e) {

        const checked = e.target.checked;

        console.log('id', id)
        
        var temp_attendance = this.makeup_attendance;
        
        if(checked)
            temp_attendance.push(id)
        else temp_attendance = this.makeup_attendance.filter((item) => { return item !== id})
        
    }

    handlePrevWeek() {
        // e.preventDefault();
        this.setState({data: []});
        var data = {}
        data['class_id'] = this.props.classId;
        data['startday'] = this.props.startday

        this.props.requestPrevWeekAttendance(data);
    }

    handleNextWeek() {
        // e.preventDefault();
        this.setState({data: []});
        var data = {}
        data['class_id'] = this.props.classId;
        data['startday'] = this.props.startday

        this.props.requestNextWeekAttendance(data);
    }

    handleToday() {
        // e.preventDefault();
        var data = {}
        data['id'] = this.props.classId;

        this.props.requestTodayAttendance(data);
    }

    handleSaveFormSubmit() {
        // e.preventDefault();
        var data = {}
        data['attendance'] = this.state.attendance;
        data['makeup_attendance'] = this.makeup_attendance;
        data['class_id'] = this.props.classId;

        this.props.submitAttendance(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.initialValues !== undefined && nextProps.initialValues !== undefined) {
            if (this.props.initialValues.length !== 0 && this.state.data.length === 0) {
                this.setState({ data: nextProps.initialValues })
            }
    
            if (this.props.makeup_attendance !== undefined && this.props.makeup_attendance.length !== 0 && this.state.makeup_data.length === 0) {
                var data = this.props.makeup_attendance;
                while(data.length < 10) data.push({first_name: '', last_name: '', status: -1});
                this.setState({ makeup_data: data })
            }
        }
    }

    render() {

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
                                        <Button className="btn-common btn-default-size" type="submit" color="primary" onClick={this.handleSaveFormSubmit}>Save</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>

                                    <Card>
                                        <CardHeader>
                                            {this.props.className} Attendace
                                            <div className="btn-actions-pane-right">
                                                <ButtonGroup>
                                                    <Button className="btn-common" color="secondary" onClick={this.handlePrevWeek}>Prev</Button>
                                                    <Button className="btn-common" color="warning" onClick={this.handleToday}>Current</Button>
                                                    <Button className="btn-common" color="secondary" onClick={this.handleNextWeek}>Next</Button>
                                                </ButtonGroup>
                                            </div>
                                            </CardHeader>
                                        <CardBody>
                                            <form>
                                                <AttendanceMarkForm
                                                    handleCheck={this.handleCheck}
                                                    initialValues={this.state.data}
                                                    term={this.props.term}
                                                    startday={this.props.startday}
                                                />
                                                <p className="fsize-2 mt-4">Makeup/Trial</p>
                                                <MakeupMarkForm
                                                    handleCheck={this.handleCheckMakeup}
                                                    data={this.state.makeup_data}
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
    let initialValues = state.teacherAttendanceReducer.attendance;
    let makeup_attendance = state.teacherAttendanceReducer.makeup_attendance;
    let classId = state.teacherAttendanceReducer.classId;
    let className = state.teacherAttendanceReducer.className;
    let term = state.teacherAttendanceReducer.term;
    let startday = state.teacherAttendanceReducer.startday;
    let loading = state.teacherAttendanceReducer.loading;
    return {
        initialValues,
        makeup_attendance,
        loading,
        classId,
        className,
        term,
        startday
    }
};

const mapDispatchToProps = {
    submitAttendance,
    requestNextWeekAttendance,
    requestPrevWeekAttendance,
    requestTodayAttendance
}

const connectedClassAttendancePage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'classesAttendanceForm',
    onSubmit: submit,
    enableReinitialize: true,
})(ClassAttendancePage));
export { connectedClassAttendancePage as ClassAttendancePage }; 