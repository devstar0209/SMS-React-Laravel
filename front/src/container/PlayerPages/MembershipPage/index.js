import React from 'react'
import { connect } from 'react-redux';
import {Card, CardBody, Col} from 'reactstrap'
import { ToastContainer } from 'react-toastify';

import ChooseMembership from './components/ChooseMembership';
import ConfirmBooking from './components/ConfirmBooking';
import Thanks from './components/Thanks';

import {sendMembershipData, sendMembershipFee} from './membershipactions'
import { AppContainer } from '../../../Layout/AppContainer';

class MembershipPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={start: true}

        this.sendMembershipData = this.sendMembershipData.bind(this);
        this.sendMembershipFee = this.sendMembershipFee.bind(this);

        this.id = this.props.match.params.id
    }

    sendMembershipData(data) {
        this.setState({start: false})
        data['id'] = this.id;
        this.props.sendMembershipData(data)
    }

    sendMembershipFee(data) {
        console.log('data', data)
        this.setState({start: false})
        data['id'] = this.id;
        this.props.sendMembershipFee(data)

    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer
					position="top-right"
					type="default"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					pauseOnHover
				/>
                <Col md="12" className="pt-3">
                    <Card>
                        <CardBody className="full-card justify-content-center">
                            {this.state.start && !!!this.props.status &&
                                <ChooseMembership handleSubmit={this.sendMembershipData}/>
                            }
                            {!this.state.start && this.props.status === 1 && 
                                <ConfirmBooking handleSubmit={this.sendMembershipFee} fee = {this.props.member_fee}/>
                            }
                            {!this.state.start && this.props.status === 2 && 
                                <Thanks />
                            }
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    status : state.membershipReducer.status,
    member_fee : state.membershipReducer.member_fee
});

const mapDispatchToProps = {
    sendMembershipData,
    sendMembershipFee
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPage)