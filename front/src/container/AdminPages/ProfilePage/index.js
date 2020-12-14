import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import moment from 'moment';

import ProfileForm from './components/ProfileForm'
import PaymentForm from './components/PaymentForm'
import CompleteForm from './components/CompleteForm'
import MultiStep from './components/Wizard'

import {requestAccountUpdate, requestCardUpdate, requestBankUpdate, requestProfileDetail} from './profileactions'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
            image: null,
            data: null,
            profile: null,
            payment: null
        }

        this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
        
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.props.requestProfileDetail();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if(this.props !== nextProps) {
            console.log('nextProps', nextProps)
            this.setState({payment: nextProps.payment})
            this.setState({profile: nextProps.profile})
        // }
    }

    handleAccountUpdate(data) {
        if(this.state.image !=  null)
        data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.requestAccountUpdate(data);
    }


    handleChangeValue(e){
        console.log(e.target.value)
    }
    
    handleChangeDOB(date){
        this.setState({dob: date});
    }
    
    handleChangeImage(image){
        this.setState({image: image});
    }

    render() {
        
        const steps = [
            {name: 'Account Information',   component: <ProfileForm initialValues={this.props.profile} 
                                                        image={this.state.image}
                                                        onSubmit={this.handleAccountUpdate} 
                                                        handleChangeImage={this.handleChangeImage}
                                                        handleChangeDOB={this.handleChangeDOB}
                                                        history={this.props.history}
                                                        dob={this.state.dob}/>},
            {name: 'Payment Information',   component: <PaymentForm data={this.props.payment} />},
            {name: 'Finish',                component: <CompleteForm />}
        ];

        return (
            <Fragment>
                {/* {this.state.profile !== null && */}
                <Row className="profile-page no-gutters" >
                    {/* <Header 
                        handleChangeImage={this.handleChangeImage} 
                        image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                    /> */}
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <div className="forms-wizard-vertical">
                                        <MultiStep showNavigation={true} steps={steps} profile={this.state.profile} payment={this.state.payment}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        
                    </div>
                </Row>
                {/* } */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let profile = state.profileReducer.profile;
    let payment = state.profileReducer.payment;
	return {
          profile,
          payment,
	}
};

const mapDispatchToProps = {
    requestAccountUpdate, 
    requestCardUpdate,
    requestBankUpdate,
    requestProfileDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);