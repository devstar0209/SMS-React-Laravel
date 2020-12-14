import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import moment from 'moment'

import { requestStudentUpdate, gotoStudentPayment, requestStudentClasses, gotoStudentEvents } from '../kidsactions'

import StudentForm from '../components/StudentForm'
import Contact from './Contact'
import CompleteForm from '../components/CompleteForm'
import MultiStep from '../components/Wizard'

class KidDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            image: null,
            gender: -1,
            activemode: 0,
            makeup_1: null,
            makeup_2: null,
            makeup_3: null,
            makeup_attendance: null,
            makeup_present: null,
            profile: null,
            contact: null
        }

        this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeValueGender = this.handleChangeValueGender.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleEvents = this.handleEvents.bind(this);
        this.handleActiveMode = this.handleActiveMode.bind(this);

        this.handleChangeImage = this.handleChangeImage.bind(this);

        this.handleChangeMakeup = this.handleChangeMakeup.bind(this);
        this.handleChangeMakeupMark = this.handleChangeMakeupMark.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/parent/kids');
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if(this.props !== nextProps) {
            if(!!nextProps.student)
            this.setState({contact: nextProps.student.contact})
            this.setState({profile: nextProps.student})
        // }
    }

    handleAccountUpdate(data) {
        if (this.state.image != null)
            data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY');
        if(this.state.makeup_1)
            data['makeup_1'] = moment(this.state.makeup_1).format('DD/MM/YYYY');
        if(this.state.makeup_2)
            data['makeup_2'] = moment(this.state.makeup_2).format('DD/MM/YYYY');
        if(this.state.makeup_3)
            data['makeup_3'] = moment(this.state.makeup_3).format('DD/MM/YYYY');
        data['gender'] = this.state.gender;
        data['active'] = this.state.activemode;
        this.props.requestStudentUpdate(data);
        // this.handleMakeupSave();
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
        this.props.history.push('/parent/kids');
    }

    handleContact() {
        var data = {}
        data['id'] = this.props.initialValues.id;//student_id
        // this.props.requestStudentContactDetail(data);
    }

    handleHistory() {
        var data = {}
        data['id'] = this.props.initialValues.id;//student_id
        this.props.requestStudentClasses(data);
    }

    handlePayment() {
        this.props.gotoStudentPayment()
    }

    handleEvents() {
        this.props.gotoStudentEvents()
    }

    handleChangeImage(image) {
        this.setState({ image: image });
    }

    handleActiveMode(mode) {
        this.setState({ activemode: mode });
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

    handleChangeMakeupMark(date, e){
        var data = this.state.makeup_present;
        if(e.target.checked){
            data.push(date);
        }
        else
            data = this.state.makeup_present.filter((item) => { return item !== date})
            console.log(data)
        this.setState({makeup_present: data});
    }

    handleMakeupSave(){
        var data={};
        data['student_id'] = this.props.initialValues.id;
        data['data'] = this.state.makeup_present;
        // this.props.saveMakeupAttendance(data);
    }

    render() {

        const { handleSubmit } = this.props

        if (this.props.initialValues !== undefined && this.state.gender === -1) {
            this.setState({ gender: this.props.initialValues.gender });

        }

        if (this.props.initialValues !== undefined && this.state.activemode === 0) {
            this.setState({ activemode: this.props.initialValues.active });
        }

        if(this.props.makeup_classes && this.state.makeup_attendance === null){
            var data = [];
            var present = [];
            
            this.props.makeup_classes.map(item => (
                item.status ? present.push(item.date): '',
                data.push(item.date)
            )
            );
            while(data.length < 3) data.push("");
            this.setState({makeup_attendance: data});
            this.setState({makeup_present: present});     
        }

        const steps = [
            {name: 'Account Information',   component: <StudentForm 
                                                        initialValues={this.state.profile} 
                                                        onSubmit={this.handleAccountUpdate}
                                                        handleChangeDOB={this.handleChangeDOB}
                                                        handleChangeValue={this.handleChangeValue}
                                                        handleChangeValueGender={this.handleChangeValueGender}
                                                        handleChangeImage={this.handleChangeImage} 
                                                        handleActiveMode={this.handleActiveMode} 
                                                        dob={this.state.dob}
                                                        gender={this.state.gender}
                                                        activemode={this.state.activemode}
                                                        classes={this.props.classes}
                                                        handleChangeMakeup={this.handleChangeMakeup}
                                                        makeup_1={this.state.makeup_1}
                                                        makeup_2={this.state.makeup_2}
                                                        makeup_3={this.state.makeup_3}/>},
            {name: 'Contact Information',   component: <Contact student_contact={this.state.contact} id={!!this.state.profile ? this.state.profile.id: null}/>},
            {name: 'Finish',                component: <CompleteForm />}
        ];

        return (
            <Fragment>
                {!!this.state.profile &&
                <Row className="students-page no-gutters" >
                        <div style={{ width: '100%' }}>
                            <Col md="12" className="mt-3">
                                <Card className="full-card">
                                    <CardBody>
                                        <div className="">
                                            <MultiStep showNavigation={true} steps={steps} profile={this.state.profile} contact={this.state.contact}/>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                        </div>
                    {/* {this.props.paymentflag &&
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
                    {this.props.eventflag &&
                        <EventPage
                            id={this.props.initialValues.id}
                        />
                    } */}
                </Row>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let student = state.parentKidReducer.student;
    let classes = state.parentKidReducer.classes;
    let makeup_classes = state.parentKidReducer.makeup_classes;
    let makeup_classes_history = state.parentKidReducer.makeup_classes_history;
    let paymentflag = state.parentKidReducer.paymentflag;
    let historyflag = state.parentKidReducer.historyflag;
    let eventflag = state.parentKidReducer.eventflag;
    let loading = state.parentKidReducer.loading;
    return {
        student,
        classes,
        makeup_classes,
        makeup_classes_history,
        paymentflag,
        historyflag,
        eventflag,
        loading
    }
};

const mapDispatchToProps = {
    requestStudentUpdate,
    gotoStudentPayment,
    requestStudentClasses,
    gotoStudentEvents
}

const connectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(KidDetailPage);
export { connectedStudentsPage as KidDetailPage }; 