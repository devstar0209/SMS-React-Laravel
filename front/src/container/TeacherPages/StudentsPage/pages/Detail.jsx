import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, Form} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import StudentForm from '../components/StudentForm'
import Contact from './Contact'
import EventForm from '../components/EventForm';

class StudentDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
            image: null,
            gender: 1
        }

    }

    componentDidMount() {
        if(this.props.loading == undefined && this.props.personal == undefined)
            this.props.history.push('/page/students');
    }

    render() {
        
        const {handleSubmit}= this.props
        if (this.props.personal !== undefined && this.state.gender === -1)
        this.setState({ gender: this.props.personal.gender })
        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <p className="fsize-3 mb-5">Student Detail</p>
                                    <ReactCSSTransitionGroup
                                        component="div"
                                        transitionName="TabsAnimation"
                                        transitionAppear={true}
                                        transitionAppearTimeout={0}
                                        transitionEnter={false}
                                        transitionLeave={false}>
                    
                                    <Tabs
                                        defaultActiveKey="1"
                                        renderTabBar={() => <ScrollableInkTabBar/>}
                                        renderTabContent={() => <TabContent/>}
                                    >
                                        <TabPane tab='Personal Details' key="1">
                                            <StudentForm 
                                                initialValues={this.props.personal}
                                                image={this.props.personal != undefined ? this.props.personal.profile : null}
                                                gender={this.state.gender}
                                            />
                                        </TabPane>
                                        {/* <TabPane tab ="Class Details" key ="2">
                                            <ClassForm initialValues={this.props.class}/>
                                        </TabPane> */}
                                        <TabPane tab='Contact Details' key="3">
                                            <Contact 
                                                student_contact={this.props.contact}
                                            />
                                        </TabPane>
                                        {/* <TabPane tab='PaymentDetails' key="4">
                                            <PaymentPage
                                                payment = {this.props.payment}
                                            />
                                        </TabPane> */}
                                        <TabPane tab ="Event Details" key ="5">
                                            <EventForm initialValues={this.props.events}/>
                                        </TabPane>
                                    </Tabs>
                                    </ReactCSSTransitionGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
	let personal = state.teacherStudentReducer.personal;
	let contact = state.teacherStudentReducer.contact;
	let payment = state.teacherStudentReducer.payment;
	let events = state.teacherStudentReducer.events;
	let loading = state.teacherStudentReducer.loading;
	return {
        personal,
        contact,
        payment,
        events,
        loading
	}
};

const mapDispatchToProps = {
}

const connectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(StudentDetailPage);
export { connectedStudentsPage as StudentDetailPage }; 