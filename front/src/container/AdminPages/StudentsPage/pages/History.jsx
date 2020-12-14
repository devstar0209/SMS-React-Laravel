import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Card, CardHeader, CardBody, Button, ButtonGroup } from 'reactstrap'
import { Dropdown } from 'semantic-ui-react';

import { requestStudentAttendance, saveAttendance, saveMakeupAttendance } from './../studentsactions'
import AttendanceHistory from '../components/AttendanceHistory';
import MakeupHistory from '../components/MakeupHistory';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            class_id: 0,
            attendance: null,
            makeup: null,
            makeup_attendance: null,
            makeup_present: null
        }
        this.student_id = props.id

        var temp_classes = props.attendance_classes.substr(1, props.attendance_classes.length - 2).split(',');
    
        this.renderclasses = [];
        if (props.classes !== undefined) {
            props.classes.map((item, index) => {
                if (temp_classes.includes("" + item.id)) this.renderclasses.push({ key: index, value: item.id, text: item.type });
            });
        }

        this.handleClass = this.handleClass.bind(this);
        this.handlePrevAttendance = this.handlePrevAttendance.bind(this);
        this.handleNextAttendance = this.handleNextAttendance.bind(this);
        this.handleCurrent = this.handleCurrent.bind(this);

        this.handleChangeMark = this.handleChangeMark.bind(this);
        this.handleChangeMakeupMark = this.handleChangeMakeupMark.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleMakeupSave = this.handleMakeupSave.bind(this);

    }

    componentDidMount() {
    }

    handleClass(e, {value}){
        this.setState({class_id: value});
        var data={};
        data['student_id'] = this.student_id;
        data['class_id'] = value;
        data['duration'] = 0;
        data['first_day'] = 'today';
        this.props.requestStudentAttendance(data);
    }

    handlePrevAttendance(){
        var data={};
        data['student_id'] = this.student_id;
        data['class_id'] = this.state.class_id;
        data['duration'] = 1;
        data['first_day'] = this.props.start_day;
        this.props.requestStudentAttendance(data);
    }
    handleNextAttendance(){
        var data={};
        data['student_id'] = this.student_id;
        data['class_id'] = this.state.class_id;
        data['duration'] = 2;
        data['first_day'] = this.props.start_day;
        this.props.requestStudentAttendance(data);
    }
    handleCurrent(){
        var data={};
        data['student_id'] = this.student_id;
        data['class_id'] = this.state.class_id;
        data['duration'] = 0;
        data['first_day'] = 'today';
        this.props.requestStudentAttendance(data);
    }

    handleChangeMark(date, e){
        if(e.target.checked){
            var data = this.state.attendance;
            data.push(date);
        }
        else
            var data = this.state.attendance.filter((item) => { return item !== date})

        this.setState({attendance: data});
    }

    handleSave(){
        var data={};
        data['student_id'] = this.student_id;
        data['class_id'] = this.state.class_id;
        data['data'] = this.state.attendance;
        this.props.saveAttendance(data);
    }

    handleChangeMakeupMark(date, e){
        // var data = this.state.makeup_present;
        // if(e.target.checked){
        //     data.push(date);
        // }
        // else
        //     data = this.state.makeup_present.filter((item) => { return item !== date})
        //     console.log(data)
        // this.setState({makeup_present: data});
    }

    handleMakeupSave(){
        var data={};
        data['student_id'] = this.student_id;
        data['data'] = this.state.makeup_present;
        this.props.saveMakeupAttendance(data);
    }

    render() {

        if(this.props.attendance_data && this.state.attendance === null){
            this.setState({attendance: this.props.attendance_data});
        }

        if(this.props.makeup_classes_history && this.state.makeup === null){
            this.setState({makeup: this.props.makeup_classes_history});
            var data = [];
            var present = [];
            this.props.makeup_classes_history.map(item => (
                item.status ? present.push(item.date): '',
                data.push(item.date)
            )
            );
            while(data.length < 10) data.push("");
            this.setState({makeup_attendance: data});
            this.setState({makeup_present: present});            
        }

        return (
            <Fragment>
                <div style={{width: '100%'}}>
                    <Col md="12">
                        <Card className=" mt-3" style={{height: 200}}>
                            <CardHeader>
                                <Dropdown
                                    style={{ width: 250 }}
                                    placeholder='Select Class'
                                    fluid
                                    selection
                                    onChange={this.handleClass}
                                    options={this.renderclasses}
                                />
                                <div className="btn-actions-pane-right">
                                    <ButtonGroup>
                                        <Button color="secondary" className="btn-common" onClick={this.handlePrevAttendance}>Prev</Button>
                                        <Button color="warning" className="btn-common" onClick={this.handleCurrent}>Current</Button>
                                        <Button color="secondary" className="btn-common" onClick={this.handleNextAttendance}>Next</Button>
                                    </ButtonGroup>
                                    {/* <Button color="info" className="ml-5" onClick={this.handleSave}>Save</Button> */}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <AttendanceHistory
                                    attendance_data={this.state.attendance}
                                    term = {this.props.term}
                                    handleChangeMark = {this.handleChangeMark}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className=" mt-3">
                            <CardHeader>
                                Makeup/Trial
                                <div className="btn-actions-pane-right">
                                    {/* <ButtonGroup>
                                        <Button color="secondary" onClick={this.handlePrevAttendance}>Prev</Button>
                                        <Button color="warning" onClick={this.handleCurrent}>Current</Button>
                                        <Button color="secondary" onClick={this.handleNextAttendance}>Next</Button>
                                    </ButtonGroup> */}
                                    {/* <Button color="info" className="ml-5" onClick={this.handleMakeupSave}>Save</Button> */}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <MakeupHistory
                                    data={this.state.makeup_attendance}
                                    present={this.state.makeup_present}
                                    handleChangeMakeupMark = {this.handleChangeMakeupMark}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    attendance_data: state.studentReducer.attendance,
    term: state.studentReducer.term,
    start_day: state.studentReducer.start_day,
})

const mapDispatchToProps = {
    requestStudentAttendance,
    saveAttendance,
    saveMakeupAttendance
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
