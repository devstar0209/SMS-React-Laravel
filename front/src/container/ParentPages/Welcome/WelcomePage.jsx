import React, {Fragment} from 'react'

import {Button, Row, Col, Label} from 'reactstrap'

import {userSessionService} from '../../../Common/Services';

import UserLog from './components/UserLog'

class WelcomePage extends React.Component{
    constructor(props){
        super(props);

        this.profile = userSessionService.getCachedUserInfo()['userprofile'];
        this.payment = userSessionService.getCachedUserInfo()['payment'];

    }

    handleProfile() {
        this.props.history.push('/parent/profile');
    }

    render(){
        return(
            <Fragment>
                <Row className="welcome-page no-gutters justify-content-center">
                    <UserLog />

                    <Col md="12" className="justify-content-center text-center mt-5">
                        <Label className="fsize-3">{this.profile !== null && this.profile.first_name}</Label>
                    </Col>

                    <Col md="12" className="justify-content-center text-center mt-5">
                        <Label className="fsize-4">WELCOME</Label>
                    </Col>
                    {(this.profile === null || this.payment === null) &&
                    <Col md="12" className="justify-content-center text-center mt-5">
                        <p className="fsize-4">Please complete your profile.</p>
                        <Button className="btn-common btn-icon mt-3" color="primary" onClick={this.handleProfile.bind(this)}>Go to Profile</Button>
                    </Col>
                    }
                </Row>
            </Fragment>
        )
    }
}

export default WelcomePage;