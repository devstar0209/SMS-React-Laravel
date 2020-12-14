import React, { Fragment } from 'react'

import { Row, Col } from 'reactstrap'
import {ToastContainer} from 'react-toastify'

import { securityService, userSessionService, notificationService } from '../../Common/Services';
import UserGroup from './components/UserGroup'
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdmin = this.handleAdmin.bind(this);
        this.handleInstructor = this.handleInstructor.bind(this);
        this.handleParent = this.handleParent.bind(this);
        this.handlePlayer = this.handlePlayer.bind(this);
    }

    handleAdmin(e) {
        e.preventDefault();
        if(securityService.getToken() && userSessionService.getUserGrade() !== 0)
            notificationService.error("Please logout prev page");
        else
            this.props.history.push('admin/dashboard')
    }

    handleInstructor(e) {
        e.preventDefault();
        if(securityService.getToken() && userSessionService.getUserGrade() !== 1)
            notificationService.error("Please logout prev page");
        else
        this.props.history.push('page/welcome')
    }
    
    handleParent(e) {
        e.preventDefault();
        if(securityService.getToken() && userSessionService.getUserGrade() !== 3)
            notificationService.error("Please logout prev page");
        else
        this.props.history.push('parent/welcome')
    }

    handlePlayer(e) {
        e.preventDefault();
        if(securityService.getToken() && userSessionService.getUserGrade() !== 2)
            notificationService.error("Please logout prev page");
        else
        this.props.history.push('player/welcome')
    }

    render() {
        return (
            <Fragment>
                <ToastContainer
					position="top-right"
					type="default"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					pauseOnHover
				/>
                <div className="app-main">
                    <div className="app-main__outer">
                        <div className="bg-page">
                            <div className="d-flex align-items-center" style={{height: '100vh'}}>
                                <Col md="12">
                                    <Row className=" no-gutters justify-content-center">
                                        <UserGroup 
                                            handleAdmin = {this.handleAdmin}
                                            handlePlayer = {this.handlePlayer}
                                            handleInstructor = {this.handleInstructor}
                                            handleParent = {this.handleParent}
                                        />
                                            
                                    </Row>
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default HomePage;