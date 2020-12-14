import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import {confirmAlert} from 'react-confirm-alert'

import SummaryCard from './components/SummaryCard'
import LatestUpdate from './components/LatestUpdate'
import PaymentHistory from './components/PaymentHistory';
import InactiveStudents from './components/InactiveStudents';

import {getInitialData, approveMember} from './dashboardactions'
import MembersList from './components/MembersList';

import './react-confirm-alert.css';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.onApprove = this.onApprove.bind(this)
    }

    componentDidMount() {
        this.props.getInitialData();
    }    

    onApprove(id) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className='custom-ui'>
                        <h1>Confirm approve</h1>
                        <p>Are you sure you want to approve this player as a member?</p>
                        <Button onClick={onClose}>No</Button>
                        <Button onClick={() => {this.props.approveMember({'id':id}); onClose();}}>Yes</Button>
                    </div>
                )
            }
        })
    }

    render() {
        console.log('dashboard', this.props)

        return (
            <Fragment>
                <Row className="dashboard-page no-gutters" >
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Row>
                                <Col md="6">
                                    <SummaryCard 
                                        title="Jun 11, 2020"
                                        text="2 Classes & Test"
                                        label="Events for Today"
                                    />
                                </Col>
                                <Col md="6">
                                    <SummaryCard 
                                        title="Attendance"
                                        text={`${this.props.attendance} %`}
                                        label="Student Attendance"
                                    />
                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" className="mb-3">
                            <LatestUpdate data={this.props.tabledata}/>
                        </Col>
                        <Col md="12" className="mb-3">
                            <Row>
                                <Col md="6">
                                    <PaymentHistory data={this.props.checkouthistory}/>
                                </Col>
                                <Col md="6">
                                    <InactiveStudents data={this.props.inactivestudents}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <MembersList data={this.props.members} onApprove={this.onApprove}/>
                        </Col>
                    </div>
                </Row>
               
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
        tabledata: state.dashboardReducer.tabledata,
        attendance: state.dashboardReducer.attendance,
        checkouthistory: state.dashboardReducer.checkouthistory,
        inactivestudents: state.dashboardReducer.inactivestudents,
        members: state.dashboardReducer.members,
    }
)

const mapDispatchToProps = {
        getInitialData,
        approveMember
}

const connectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage }; 