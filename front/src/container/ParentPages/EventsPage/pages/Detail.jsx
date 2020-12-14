import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import { reduxForm, submit  } from 'redux-form';

import EventForm from '../components/EventForm'

class EventsDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            startDate: new Date(),
            finishDate: new Date(),
            startTime: new Date(),
            finishTime: new Date(),
        }

        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeFinishDate = this.handleChangeFinishDate.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFinishTime = this.handleChangeFinishTime.bind(this);

        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        if(this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/parent/kids');
    }

    handleCancel(){
        this.props.history.push('/parent/kids');
    }
    
    handleChangeValue(e){
        console.log('select', e);
    }

    handleChangeStartDate(date){
        this.setState({startDate: date});
    }
    
    handleChangeFinishDate(date){
        this.setState({finishDate: date});
    }

    handleChangeStartTime(time){
        this.setState({startTime: time});
    }
    
    handleChangeFinishTime(time){
        this.setState({finishTime: time});
    }

    render() {
        
        const {handleSubmit}= this.props

        const classType=[{key:1, value:'past', label: 'past'}, {key:2, value:'before', label: 'before'}]

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
    let initialValues = state.kidEventReducer.event;
    let coaches = state.kidEventReducer.coaches;
    let students = state.kidEventReducer.students;
    let loading = state.kidEventReducer.loading;

    return{
        initialValues,
        coaches,
        students,
        loading
    }
	
};

const mapDispatchToProps = {
}

const connectedEventsDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'kideventDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(EventsDetailPage));
export { connectedEventsDetailPage as EventsDetailPage }; 