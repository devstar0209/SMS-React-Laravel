import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {  Row, Card, CardBody } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';

import { requestNewStudentPayment, requestStudentPayment, submitCheckout, submitPaymentOption, backDetail } from '../kidsactions'

import PaymentMethodEdit from '../components/PaymentMethodEdit';
import PaymentMethod from '../components/PaymentMethod';
import Checkout from '../components/Checkout';

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: 0,
            cardNumber: '',
            expiry: '',
            cvc: '',
            cashAmount: '',
            pay_plan: 0,
            paymentMethod: 1,
            payment_method_edit: null
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
        this.handleChangePayPlan = this.handleChangePayPlan.bind(this);

        this.submitCheckout = this.submitCheckout.bind(this);

        this.togglePaymentMethodEdit = this.togglePaymentMethodEdit.bind(this);

    }

    componentDidMount() {
        var data = {}
        data['student_id'] = this.props.id
        this.props.requestStudentPayment(data)
    }

    handleSaveFormSubmit(data) {
        
        // var data ={}
        if (data.method === 1) {
            data['card_no'] = this.state.cardNumber.replace(/\s+/g, '');
            data['card_expiry'] = this.state.expiry.replace(/\s+/g, '');
            data['card_cvc'] = this.state.cvc;
        }
        data['student_id'] = this.props.id;
        // data['method'] = data.method;
        data['plan'] = this.state.pay_plan;
        console.log("save negtid", data)
        this.props.requestNewStudentPayment(data)
    }

    handleCardNumberChange(e) {
        e.preventDefault();
        this.setState({ cardNumber: e.target.value });
    }
    handleCardExpiryChange(e) {
        e.preventDefault();
        this.setState({ expiry: e.target.value });
    }
    handleCardCVCChange(e) {
        e.preventDefault();
        this.setState({ cvc: e.target.value });
    }

    handleChangePayPlan(value) {
        this.setState({ pay_plan: value })
    }

    togglePaymentMethodEdit() {
        this.setState({ payment_method_edit: !this.state.payment_method_edit });
    }

    submitCheckout(data) {
        data['student_id'] = this.props.id;
        this.props.submitCheckout(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.initialValues !== undefined && nextProps.initialValues.option !== undefined) {
            this.setState({ payment_method_edit: true })
            // this.props.initialValues.option.price = nextProps.initialValues.option.price
        }
    }

    render() {

        if (this.props.initialValues !== undefined && this.props.initialValues.id !== undefined && this.state.payment_method_edit === null) {
            this.setState({ payment_method_edit: true })
            this.setState({ pay_plan: this.props.initialValues.plan })
        }

        return (
            <Fragment>
                {this.props.initialValues !== undefined &&
                <div style={{ width: '100%' }}>
                    <Row className="justify-content-end mr-3 mt-3">
                        <Button
                            className="mr-3"
                            color="blue"
                            type="button"
                            onClick={this.props.backDetail}
                        ><Icon name='cancel' />Back</Button>
                    </Row>
                    <div className="row">
                    <div className="col-md-12 col-lg-6 mt-3">
                        <Card className="full-card">
                            <CardBody>
                                {!this.state.payment_method_edit ?
                                    <PaymentMethodEdit
                                        initialValues={this.props.initialValues}
                                        cardNumber={this.state.cardNumber}
                                        expiry={this.state.expiry}
                                        cvc={this.state.cvc}
                                        pay_plan={this.state.pay_plan}
                                        togglePaymentMethodEdit={this.togglePaymentMethodEdit}
                                        onSubmit={this.handleSaveFormSubmit}
                                        handleCardNumberChange={this.handleCardNumberChange}
                                        handleCardExpiryChange={this.handleCardExpiryChange}
                                        handleCardCVCChange={this.handleCardCVCChange}
                                        handleChangePayPlan={this.handleChangePayPlan}
                                    /> :
                                    <PaymentMethod
                                        data={this.props.initialValues}
                                        togglePaymentMethodEdit={this.togglePaymentMethodEdit}
                                    />
                                }

                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-12 col-lg-6 mt-3 ">
                        <Card className="full-card">
                            <CardBody>
                                <Checkout 
                                    onSubmit={this.submitCheckout}
                                    initialValues={this.props.initialValues.option}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    </div>
                </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    initialValues: state.parentKidReducer.student_payment
})

const mapDispatchToProps = {
    requestNewStudentPayment,
    requestStudentPayment,
    submitCheckout,
    submitPaymentOption,
    backDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
