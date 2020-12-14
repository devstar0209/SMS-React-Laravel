import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import { reduxForm,  submit  } from 'redux-form';

import EventForm from '../components/EventForm'

class EventsDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
        }

    }

    componentDidMount() {
        if(this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/page/events');
    }

    render() {
        
        const {handleSubmit}= this.props

        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    {/* <Header title="EVENT UPDATE"/> */}
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <p className="fsize-3 mb-5">Event Detail</p>
                                    <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                        <EventForm 
                                            initialValues={this.props.initialValues}
                                        />
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                        
                    </div>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let initialValues = state.teacherEventReducer.event;
    let loading = state.teacherEventReducer.loading;

    return{
        initialValues,
        loading
    }
	
};

const mapDispatchToProps = {
}

const connectedEventsDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'eventDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(EventsDetailPage));
export { connectedEventsDetailPage as EventsDetailPage }; 