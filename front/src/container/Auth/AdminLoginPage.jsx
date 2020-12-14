import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { LinkButton } from '../../Common/Components';

import { submitLoginAction } from './authactions';
import { securityService } from '../../Common/Services';
// import { AppContainer } from '../../Layout/AppContainer'
import LoginForm from './Components/LoginForm';

class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props);


        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    }

    componentDidMount() {
        if (securityService.getToken())
            this.props.history.push('/admin/dashboard');
    }

    handleChangeValue = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleLoginFormSubmit(data) {
        if (data.RememberMe) {
            securityService.setRememberMe(data);
        }
        else securityService.removeRememberMe()

        this.props.submitLogin(data)
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
                {/* <AppContainer> */}
                {/* {this.props.isLoading && <Loader />} */}
                <div className="bg-page">
                    <div className="d-flex align-items-center" style={{ height: '100vh' }}>
                        <Col md="12">
                            <Row className="justify-content-center no-gutters">
                                <div className="box" style={{width: 410, minHeight: 613}}>
                                    <LoginForm onSubmit={this.handleLoginFormSubmit} handleChangeValue={this.handleChangeValue} loading={this.props.isLoading}/>
                                    <div className="d-flex justify-content-center mt-3">
                                        <p className="mt-3 mr-2 caption">Not registered yet? </p>
                                        <LinkButton path="/back/signup" label="Sign Up" />
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </div>
                </div>

                {/* </AppContainer> */}
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    submitLogin: data => dispatch(submitLoginAction(data))
});

const mapStateToProps = (state) => {
    let initialValues = securityService.getLoginInfo();
    const isLoading = state.authenticationReducer.isLoading
    return {
        initialValues,
        isLoading
    }
};

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLoginPage));
