import React, {Fragment} from 'react'


import { Row, Col, Label} from 'reactstrap'

import {userSessionService} from '../../../Common/Services';

import UserLog from './components/UserLog'

class WelcomePage extends React.Component{
    constructor(props){
        super(props);

        this.profile = userSessionService.getCachedUserInfo()['userprofile'];

    }

    render(){
        return(
            <Fragment>
                <Row className="welcome-page no-gutters justify-content-center">
                    <UserLog />

                    <Col md="12" className="justify-content-center text-center mt-5">
                        <Label className="fsize-3">{this.profile !== null && this.profile.first_name} {this.profile !== null && this.profile.last_name}</Label>
                    </Col>

                    <Col md="12" className="justify-content-center text-center mt-5">
                        <Label className="fsize-4">WELCOME</Label>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default WelcomePage;