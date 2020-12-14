import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit, change } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import {Modal } from '../../../../Common/Components';
import ClassForm from './../components/ClassForm'
import { requestClassUpdate, requestClassDelete } from './../classactions'


class ClassDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: new Date(),
            finishTime: new Date(),
            deleteModalFlag: false,
            hour: ''
        }

        this.startTime = new Date();
        this.duration = 0;

        this.day = null;

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFinishTime = this.handleChangeFinishTime.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);

        this.handleCancel = this.handleCancel.bind(this)
        this.handleDelete = this.handleDelete.bind(this);

        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/classes');
    }

    handleSaveFormSubmit(data) {
        data['start_time'] = moment(this.state.startTime).format('hh:mm A');
        this.props.requestClassUpdate(data)
    }

    handleCancel() {
        this.props.history.push('/admin/classes')
        this.props.reset()
    }

    handleDelete() {
        var data = {}
        data['id'] = this.props.initialValues.id
        this.props.requestClassDelete(data);
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleChangeValue(e) {
        console.log('select', e);
    }

    handleChangeDuration(e) {
        const { value } = e.target;
        this.duration = value
        var finish = moment(this.startTime, 'hh:mm A').add(value, 'minutes').format('hh:mm A');
        this.props.changeFinishTime('finish_time', finish);
    }

    handleChangeStartTime(time) {

        var finish = moment(time, 'hh:mm A').add(this.duration, 'minutes').format('hh:mm A');
        this.props.changeFinishTime('finish_time', finish);

        this.startTime = moment(time, 'hh:mm A');

        this.setState({ startTime: time });

        let hour = ''
        var hrs = Math.floor(moment(this.state.finishTime).diff(moment(time), 'minutes') / 60);
        if (hrs > 0)
            hour = hrs + 'hr ' + moment(this.state.finishTime).diff(moment(time), 'minutes') % 60 + 'mins';
        else hour = moment(this.state.finishTime).diff(moment(time), 'minutes') % 60 + 'mins';

        this.setState({ hour });
    }

    handleChangeFinishTime(time) {
        this.setState({ finishTime: time });

        let hour = ''
        var hrs = Math.floor(moment(time).diff(moment(this.state.startTime), 'minutes') / 60);
        if (hrs > 0)
            hour = hrs + 'hr ' + moment(time).diff(moment(this.state.startTime), 'minutes') % 60 + 'mins';
        else hour = moment(time).diff(moment(this.state.startTime), 'minutes') % 60 + 'mins';

        this.setState({ hour });
    }

    toggleDeleteModal() {
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    render() {

        const days = [
            { value: 1, label: 'Mon' }, { value: 2, label: 'Tue' }, { value: 3, label: 'Wed' },
            { value: 4, label: 'Thu' }, { value: 5, label: 'Fri' }, { value: 6, label: 'Sat' }, { value: 7, label: 'Sun' }
        ];

        if (this.props.initialValues && this.day === null) {
            this.day = days.filter(({ value }) => value === this.props.initialValues.day)
            this.props.changeDay("day", this.day)
            this.startTime = this.props.initialValues.start_time
            this.duration = this.props.initialValues.duration
        }

        const { handleSubmit } = this.props

        return (
            <Fragment>

                <Row className="classes-page no-gutters" >
                    {/* <Header title="CLASS UPDATE"/> */}
                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <p className="fsize-3 mb-5">Class Setup Detail</p>
                            <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                <ClassForm
                                    initialValues={this.props.initialValues}
                                    handleChangeStartTime={this.handleChangeStartTime}
                                    // handleChangeFinishTime={this.handleChangeFinishTime}
                                    handleChangeDuration={this.handleChangeDuration}
                                    handleChangeValue={this.handleChangeValue}
                                    startTime={this.state.startTime}
                                    finishTime={this.state.finishTime}
                                    coaches={this.props.coaches}
                                    students={this.props.students}
                                    duration={this.state.hour}
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
    let coaches = state.classReducer.coaches;
    let students = state.classReducer.students;
    let loading = state.classReducer.loading;
    let initialValues = state.classReducer.class;
    return {
        initialValues,
        coaches,
        students,
        loading
    }
};

const mapDispatchToProps = dispatch => ({
    requestClassUpdate: data => dispatch(requestClassUpdate(data)),
    requestClassDelete: data => dispatch(requestClassDelete(data)),
    changeDay: (field, value) => dispatch(change('classesDetailForm', field, value)),
    changeFinishTime: (field, value) => dispatch(change('classesDetailForm', field, value))
})

const connectedClassDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'classesDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(ClassDetailPage));
export { connectedClassDetailPage as ClassDetailPage }; 