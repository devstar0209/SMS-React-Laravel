import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import EventForm from '../components/EventForm'
import { requestEventCreate } from './../eventactions'

class EventsCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            finishDate: new Date(),
            startTime: new Date(),
            finishTime: new Date(),
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeFinishDate = this.handleChangeFinishDate.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFinishTime = this.handleChangeFinishTime.bind(this);

        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {

    }

    handleSaveFormSubmit(data) {
        data['start_time'] = moment(this.state.startTime).format('hh:mm A');
        data['finish_time'] = moment(this.state.finishTime).format('hh:mm A');
        data['start_date'] = moment(data['start_date']).format('MM/DD/YYYY')
        data['finish_date'] = moment(data['finish_date']).format('MM/DD/YYYY')
        this.props.requestEventCreate(data)
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

    handleCancel() {
        this.props.reset();
    }

    render() {

        const { handleSubmit } = this.props

        const classType = [{ key: 1, value: 'past', label: 'past' }, { key: 2, value: 'before', label: 'before' }]

        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    {/* <Header title="NEW EVENT SETUP"/> */}
                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <p className="fsize-3 mb-5">NEW EVENT SETUP</p>
                            <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                <EventForm
                                    handleChangeStartTime={this.handleChangeStartTime}
                                    handleChangeFinishTime={this.handleChangeFinishTime}
                                    handleChangeFinishDate={this.handleChangeFinishDate}
                                    handleChangeStartDate={this.handleChangeStartDate}
                                    handleChangeValue={this.handleChangeValue}
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
                                        type="button"
                                        onClick={this.handleCancel}
                                    ><Icon name='cancel' />Cancel</Button>

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

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    coaches: state.eventReducer.coaches,
    students: state.eventReducer.students,
})

const mapDispatchToProps = {
    requestEventCreate
}

const connectedEventsCreatePage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'eventCreateForm',
    onSubmit: submit,
})(EventsCreatePage));
export { connectedEventsCreatePage as EventsCreatePage }; 