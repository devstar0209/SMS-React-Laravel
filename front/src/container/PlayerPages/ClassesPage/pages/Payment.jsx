import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { submitCheckout } from './../classactions'

import PaymentMethodEdit from '../components/PaymentMethodEdit';

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumber: '',
            expiry: '',
            cvc: '',
        }

        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this);

        this.submitCheckout = this.submitCheckout.bind(this);

    }

    componentDidMount() {
        if(!this.props.class_id && !this.props.loading)
            this.props.history.push('/player/classes')
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

    submitCheckout(data) {
        if (data.method === 1) {
            data['card_no'] = this.state.cardNumber.replace(/\s+/g, '');
            data['card_expiry'] = this.state.expiry.replace(/\s+/g, '');
            data['card_cvc'] = this.state.cvc;
        }
        data['class_id'] = this.props.class.id;
        this.props.submitCheckout(data);

    }

    render() {

        return (
            <Fragment>
                <div style={{ width: '100%' }}>
                        <Card className="full-card">
                            <CardBody>
                                    <PaymentMethodEdit
                                        initialValues={this.props.class}
                                        cardNumber={this.state.cardNumber}
                                        expiry={this.state.expiry}
                                        cvc={this.state.cvc}
                                        togglePaymentMethodEdit={this.togglePaymentMethodEdit}
                                        onSubmit={this.submitCheckout}
                                        handleCardNumberChange={this.handleCardNumberChange}
                                        handleCardExpiryChange={this.handleCardExpiryChange}
                                        handleCardCVCChange={this.handleCardCVCChange}
                                    /> 
                            </CardBody>
                        </Card>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    class: state.playerClassReducer.class,
    loading: state.playerClassReducer.loading
})

const mapDispatchToProps = {
    submitCheckout,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
