import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm  } from 'redux-form';

import { Col, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';

import { LinkButton } from '../../Common/Components';

import { signUpAction } from './authactions';

import RegisterForm from './Components/RegisterForm';

class ParentRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
        }

        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSignUpFormSubmit = this.handleSignUpFormSubmit.bind(this);
    }

    handleChangeDOB(date){
        this.setState({dob: date});
    }

    handleChangeValue = (e) => {
        // const {name, value} = e.target;
		// this.setState({
		// 	[name]: value
		// })
    }

    handleSignUpFormSubmit(data) {
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.submitSignup(data)
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

                                        <RegisterForm
                                            handleChangeDOB={this.handleChangeDOB}
                                            dob={this.state.dob}
                                        />
                                        <div className="" style={{ height: 30 }}></div>
                                        <div className="login-button-container text-center mt-5 mb-3" >
                                            <Button className="btn-common" type="submit" style={{ width: 136, height: 48 }}>SignUp</Button>
                                            <div className="d-flex justify-content-center mt-3">
                                                <p className="mt-3 mr-2">Already have an account? </p>
                                                <LinkButton path="/login" label="Log In" />
                                            </div>
                                            {/* <LinkButton path="/" label="Home" /> */}
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
	submitSignup: data => dispatch(signUpAction(data)),
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
	form: 'parentsignupForm',
	enableReinitialize: true,
})(ParentRegisterPage)));
