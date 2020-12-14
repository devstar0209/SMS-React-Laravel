import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment'

import { Modal } from '../../../../Common/Components';
import PlayerForm from '../components/PlayerForm'

import { requestPlayerUpdate, requestPlayerDelete, requestPlayerApprove } from './../playersactions'


class PlayerDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            image: null,
            deleteModalFlag: false,
            approveModalFlag: false,
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleApproveModal = this.toggleApproveModal.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/players');
    }

    handleSaveFormSubmit(data) {
        if (this.state.image != null)
            data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.requestPlayerUpdate(data)
    }

    handleChangeValue(e) {
        console.log('select', e);
    }

    handleChangeDOB(date) {
        this.setState({ dob: date });
    }

    handleCancel() {
        this.props.history.push('/admin/players');
    }

    handleDelete() {
        var data = {}
        data['id'] = this.props.initialValues.id;
        this.props.requestPlayerDelete(data);
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleApprove() {
        var data = {}
        data['id'] = this.props.initialValues.id;
        this.props.requestPlayerApprove(data);
        this.setState({ approveModalFlag: !this.state.approveModalFlag })
    }

    handleChangeImage(image) {
        this.setState({ image: image });
    }

    toggleDeleteModal() {
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    toggleApproveModal() {
        this.setState({ approveModalFlag: !this.state.approveModalFlag })
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <Fragment>
                <Row className="coaches-page no-gutters" >

                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <p className="fsize-3 mb-5">Player Detail</p>
                            <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                <PlayerForm
                                    handleChangeDOB={this.handleChangeDOB}
                                    handleChangeValue={this.handleChangeValue}
                                    handleChangeImage={this.handleChangeImage}
                                    initialValues={this.props.initialValues}
                                    dob={this.state.dob}
                                    classes={this.props.classes}
                                    image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                                />
                                <Row className="justify-content-end mr-5 mt-5">
                                    <Button
                                        className="mr-3 btn-common btn-icon"
                                        color="blue"
                                        onClick={this.handleCancel}
                                    ><Icon name='cancel' />Cancel</Button>
                                    <Button
                                        className="mr-3 btn-common btn-icon"
                                        color="red"
                                        type="button"
                                        onClick={this.toggleDeleteModal}
                                    ><Icon name='trash' />Delete</Button>
                                    <Button
                                        className="mr-3 btn-common btn-icon"
                                        color="green"
                                        type="submit"
                                    ><Icon name='save' />Save</Button>
                                    {!!this.props.initialValues && !!this.props.initialValues.membership && this.props.initialValues.membership.pay_status === 1 && this.props.initialValues.membership.status === 0 &&
                                        <Button
                                            className="mr-3 btn-common btn-icon"
                                            color="green"
                                            type="button"
                                            onClick={this.toggleApproveModal}
                                        >Approve</Button>}
                                </Row>
                            </form>
                        </Col>

                    </div>
                </Row>
                <Modal
                    open={this.state.deleteModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to delete this player?"
                    hasActionButtons
                    onConfirm={this.handleDelete}
                    onCancel={this.toggleDeleteModal}
                />
                <Modal
                    open={this.state.approveModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to approve this player?"
                    hasActionButtons
                    onConfirm={this.handleApprove}
                    onCancel={this.toggleApproveModal}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let initialValues = state.playerReducer.player;
    let loading = state.playerReducer.loading;
    return {
        initialValues,
        loading
    }
};

const mapDispatchToProps = ({
    requestPlayerUpdate,
    requestPlayerDelete,
    requestPlayerApprove
})

const connectedPlayersDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'playerDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(PlayerDetailPage));
export { connectedPlayersDetailPage as PlayerDetailPage }; 