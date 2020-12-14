import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import { Modal } from '../../../../Common/Components';
import EventForm from '../components/EventForm'
import { requestEventUpdate, requestEventDelete } from './../eventactions'

class EventsDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            finishDate: new Date(),
            startTime: new Date(),
            finishTime: new Date(),
            deleteModalFlag: false,
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeFinishDate = this.handleChangeFinishDate.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFinishTime = this.handleChangeFinishTime.bind(this);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    componentDidMount() {
        if (this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/admin/events');
    }

    handleSaveFormSubmit(data) {
        data['start_time'] = moment(this.state.startTime).format('hh:mm A');
        data['finish_time'] = moment(this.state.finishTime).format('hh:mm A');
        data['start_date'] = moment(data['start_date']).format('MM/DD/YYYY')
        data['finish_date'] = moment(data['finish_date']).format('MM/DD/YYYY')
        this.props.requestEventUpdate(data)
    }

    handleCancel() {
        this.props.history.push('/admin/events');
    }

    handleDelete() {
        var data = {}
        data['id'] = this.props.initialValues.id;
        this.props.requestEventDelete(data);
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    handleChangeValue(e) {
        console.log('select', e);
    }

    handleChangeStartDate(date) {
        this.setState({ startDate: date });
    }

    handleChangeFinishDate(date) {
        this.setState({ finishDate: date });
    }

    handleChangeStartTime(time) {
        this.setState({ startTime: time });
    }

    handleChangeFinishTime(time) {
        this.setState({ finishTime: time });
    }

    toggleDeleteModal() {
        this.setState({ deleteModalFlag: !this.state.deleteModalFlag })
    }

    render() {

        const { handleSubmit } = this.props

        const classType = [{ key: 1, value: 'past', label: 'past' }, { key: 2, value: 'before', label: 'before' }]

        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    {/* <Header title="EVENT UPDATE"/> */}
                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <p className="fsize-3 mb-5">Event Detail</p>
                            <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                <EventForm
                                    handleChangeStartTime={this.handleChangeStartTime}
                                    handleChangeFinishTime={this.handleChangeFinishTime}
                                    handleChangeFinishDate={this.handleChangeFinishDate}
                                    handleChangeStartDate={this.handleChangeStartDate}
                                    handleChangeValue={this.handleChangeValue}
                                    initialValues={this.props.initialValues}
                                    classType={classType}
                                    startTime={this.state.startTime}
                                    finishTime={this.state.finishTime}
                                    startDate={this.state.startDate}
                                    finishDate={this.state.finishDate}
                                    coaches={this.props.coaches}
                                    students={this.props.students}
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
    let initialValues = state.eventReducer.event;
    let coaches = state.eventReducer.coaches;
    let students = state.eventReducer.students;
    let loading = state.eventReducer.loading;

    return {
        initialValues,
        coaches,
        students,
        loading
    }

};

const mapDispatchToProps = {
    requestEventUpdate,
    requestEventDelete
}

const connectedEventsDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'eventDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(EventsDetailPage));
export { connectedEventsDetailPage as EventsDetailPage }; 