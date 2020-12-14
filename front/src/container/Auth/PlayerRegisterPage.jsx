import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm  } from 'redux-form';
import moment from 'moment'

import { Col, Row, Button, Card, CardBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { LinkButton,  Loader } from '../../Common/Components';

import { registerPlayer } from './authactions';
import {securityService} from '../../Common/Services';
import {AppContainer} from '../../Layout/AppContainer'
import PlayerRegisterForm from './Components/PlayerRegisterForm'

class PlayerRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
        }

        this.handleChangeDOB = this.handleChangeDOB.bind(this);

        if(securityService.getToken())
            this.props.history.push('/player/welcome');
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSignUpFormSubmit = this.handleSignUpFormSubmit.bind(this);
    }

    handleChangeValue = (e) => {
        const {name, value} = e.target;
		this.setState({
			[name]: value
		})
	}

    handleSignUpFormSubmit(data) {
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.submitSignup(data)
    }

    handleChangeDOB(date){
        this.setState({dob: date});
    }

    render() {
        const {handleSubmit} = this.props;
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
                <div className="bg-page">
                    <div className="pt-5">
                        <Col lg="12" md="12" className="mt-3">
                            <div className="d-flex justify-content-center">
                                <Col lg="5" md="10" className="box mb-3">

                                    <form className="login__form" onSubmit={handleSubmit(this.handleSignUpFormSubmit)}>

                                        <PlayerRegisterForm
                                            handleChangeDOB={this.handleChangeDOB}
                                            dob={this.state.dob}
                                        />
                                        <div className="" style={{ height: 30 }}></div>
                                        <div className="login-button-container text-center mt-3 mb-3" >
                                            <Button className="btn-common" type="submit" style={{ width: 136, height: 48 }}>SignUp</Button>
                                            <div className="d-flex justify-content-center mt-3">
                                                <p className="mt-3 mr-2">Already have an account? </p>
                                                <LinkButton path="/pla/login" label="Log In" />
                                            </div>
                                            <LinkButton path="/" label="Home" />
                                        </div>
                                    </form>
                                </Col>
                            </div>
                        </Col>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => ({
	submitSignup: data => dispatch(registerPlayer(data))
});

const mapStateToProps = (state) => {
	
	const isLoading = state.authenticationReducer.isLoading
	return {
		  isLoading
	}
};

export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'signupForm',
	enableReinitialize: true,
})(PlayerRegisterPage)));
