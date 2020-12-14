import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import moment from 'moment'

import StudentForm from '../components/StudentForm'
import Contact from './Contact'
import CompleteForm from '../components/CompleteForm'
import MultiStep from '../components/Wizard'

import {requestStudentCreate} from './../kidsactions'

class KidCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
            image: null,
            gender: 0,
            activemode: 2,
            makeup_1: null,
            makeup_2: null,
            makeup_3: null,
            profile: null,
            contact: null
        }

        this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeValueGender = this.handleChangeValueGender.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleActiveMode = this.handleActiveMode.bind(this);
        this.handleChangeMakeup = this.handleChangeMakeup.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/parent/kids');
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if(this.props !== nextProps) {
            if(nextProps.student != null)
                this.setState({contact: nextProps.student.contact})
            
            this.setState({profile: nextProps.student})
        // }
    }

    handleAccountUpdate(data) {
        if(this.state.image != null)
        data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        if(this.state.makeup_1)
            data['makeup_1'] = moment(this.state.makeup_1).format('DD/MM/YYYY');
        if(this.state.makeup_2)
            data['makeup_2'] = moment(this.state.makeup_2).format('DD/MM/YYYY');
        if(this.state.makeup_3)
            data['makeup_3'] = moment(this.state.makeup_3).format('DD/MM/YYYY');
        data['gender'] = this.state.gender
        data['active'] = this.state.activemode
        this.props.requestStudentCreate(data);
    }

    handleChangeValue(){
    }

    handleChangeValueGender(e, {value}){
        this.setState({gender: value})
    }

    handleChangeDOB(date){
        this.setState({dob: date});
    }

    handleCancel(){
        this.props.history.push('/admin/students')
        this.props.reset();
    }

    handleChangeImage(image){
        this.setState({image: image});
    }

    handleActiveMode(mode){
        this.setState({activemode: mode});
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

    render() {

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
            {name: 'Contact Information',   component: <Contact student_contact={null} id={!!this.state.profile ? this.state.profile.id: null}/>},
            {name: 'Finish',                component: <CompleteForm />}
        ];
        
        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    <div style={{width: '100%'}}>
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
                </Row>
               
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    student: state.parentKidReducer.student,
    classes: state.parentKidReducer.classes,
    contactflag: state.parentKidReducer.contactflag,
    paymentflag: state.parentKidReducer.paymentflag,
    student_id: state.parentKidReducer.student_id,
    loading: state.parentKidReducer.loading
})

const mapDispatchToProps = {
    requestStudentCreate,
}

const connectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(KidCreatePage);
export { connectedStudentsPage as KidCreatePage }; 