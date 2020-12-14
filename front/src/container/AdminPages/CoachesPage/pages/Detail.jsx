import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit, change } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment'
import { generate } from 'generate-password'

import { Modal } from '../../../../Common/Components';
import CoacheForm from '../components/CoacheForm'

import { requestCoacheUpdate, requestCoacheDelete, createPassword } from './../coachesactions'


class CoachesDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            image: null,
            deleteModalFlag: false,
            showPassword: false,
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/coaches');
    }

    handleSaveFormSubmit(data) {
        if (this.state.image != null)
            data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.requestCoacheUpdate(data)
    }

    handleChangeValue(e) {
        console.log('select', e);
    }

    handleChangePassword(e) {
        this.setState({ showPassword: true })
    }
    handleChangeDOB(date) {
        this.setState({ dob: date });
    }

    handleCancel() {
        this.props.history.push('/admin/coaches');
    }

    handleDelete() {
        var data = {}
        data['id'] = this.props.initialValues.id;
        this.props.requestCoacheDelete(data);
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleChangeImage(image) {
        this.setState({ image: image });
    }

    handleGeneratePassword() {
        // this.props.createPassword(this.props.initialValues)
        this.setState({ showPassword: true })

        var password = generate({
            length: 10,
            numbers: true,
            uppercase: true,
            lowercase: true,
            symbols: true
        });

        this.props.changePassword("password", password)
    }

    toggleDeleteModal() {
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    render() {

        const { handleSubmit } = this.props

        const classType = [{ key: 1, value: 'lv1', label: 'lv1' }, { key: 2, value: 'lv2', label: 'lv2' }]
        console.log('init', this.props.initialValues)
        return (
            <Fragment>
                <Row className="coaches-page no-gutters" >

                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <p className="fsize-3 mb-5">Coache Detail</p>
                            <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                <CoacheForm
                                    handleChangeDOB={this.handleChangeDOB}
                                    handleChangeValue={this.handleChangeValue}
                                    handleChangeImage={this.handleChangeImage}
                                    handleGeneratePassword={this.handleGeneratePassword}
                                    handleChangePassword={this.handleChangePassword}
                                    initialValues={this.props.initialValues}
                                    classType={classType}
                                    dob={this.state.dob}
                                    classes={this.props.classes}
                                    image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                                    showPassword={this.state.showPassword}
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
                                </Row>
                            </form>
                        </Col>

                    </div>
                </Row>
                <Modal
                    open={this.state.deleteModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to delete this student?"
                    hasActionButtons
                    onConfirm={this.handleDelete}
                    onCancel={this.toggleDeleteModal}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let initialValues = state.coacheReducer.coache;
    let classes = state.coacheReducer.classes;
    let loading = state.coacheReducer.loading;
    return {
        initialValues,
        classes,
        loading
    }
};

const mapDispatchToProps = dispatch => ({
    requestCoacheUpdate: (data) => dispatch(requestCoacheUpdate(data)),
    requestCoacheDelete: (data) => dispatch(requestCoacheDelete(data)),
    changePassword: (field, value) => dispatch(change('coacheDetailForm', field, value))
})

const connectedCoachesDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'coacheDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(CoachesDetailPage));
export { connectedCoachesDetailPage as CoachesDetailPage }; 