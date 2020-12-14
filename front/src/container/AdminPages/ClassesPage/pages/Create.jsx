import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import { reduxForm, submit, change  } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import ClassForm from './../components/ClassForm'
import {requestClassCreate} from './../classactions'


class ClassCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            startTime: new Date(),
            finishTime: new Date(),
            hour: ''
        }

        this.startTime = new Date();
        this.duration = 0;

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFinishTime = this.handleChangeFinishTime.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);

        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {

    }

    handleSaveFormSubmit(data) {
        data['start_time'] = moment(this.state.startTime).format('hh:mm A');
        this.props.requestClassCreate(data);
    }

    handleCancel(){
        this.props.history.push('/admin/classes')
        this.props.reset()
    }

    handleChangeValue(e){
        console.log('select', e);
    }

    handleChangeDuration(e){
        const {value} = e.target;
        this.duration = value;
        var finish = moment(this.startTime, 'hh:mm A').add(value, 'minutes').format('hh:mm A');
        this.props.changeFinishTime('finish_time', finish);
    }

    handleChangeStartTime(time){

        var finish = moment(time, 'hh:mm A').add(this.duration, 'minutes').format('hh:mm A');
        this.props.changeFinishTime('finish_time', finish);

        this.startTime = moment(time, 'hh:mm A');

        this.setState({startTime: time});

        let hour = ''
        var hrs = Math.floor(moment(this.state.finishTime).diff(moment(time), 'minutes') / 60);
        if(hrs > 0)
            hour =hrs + 'hr ' + moment(this.state.finishTime).diff(moment(time), 'minutes') % 60 + 'mins';
        else hour = moment(this.state.finishTime).diff(moment(time), 'minutes') % 60 + 'mins';

        this.setState({hour});
    }
    
    handleChangeFinishTime(time){
        this.setState({finishTime: time});

        let hour = ''
        var hrs = Math.floor(moment(time).diff(moment(this.state.startTime), 'minutes') / 60);
        if(hrs > 0)
            hour =hrs + 'hr ' + moment(time).diff(moment(this.state.startTime), 'minutes') % 60 + 'mins';
        else hour = moment(time).diff(moment(this.state.startTime), 'minutes') % 60 + 'mins';

        console.log('hour', hour)

        this.setState({hour});
    }

    render() {
        
        const {handleSubmit}= this.props

        return (
            <Fragment>
                
                <Row className="classes-page no-gutters" >
                    {/* <Header title="NEW CLASS SETUP"/> */}
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                                    <p className="fsize-3 mb-5">Class Setup Detail</p>
                                    <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                        <ClassForm 
                                            handleChangeStartTime={this.handleChangeStartTime}
                                            // handleChangeFinishTime={this.handleChangeFinishTime}
                                            handleChangeValue={this.handleChangeValue}
                                            handleChangeDuration={this.handleChangeDuration}
                                            startTime={this.state.startTime}
                                            // finishTime={this.state.finishTime}
                                            coaches={this.props.coaches}
                                            duration = {this.state.hour}
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
    coaches: state.classReducer.coaches
})

const mapDispatchToProps = dispatch => ({
    requestClassCreate: data => dispatch(requestClassCreate(data)),
    changeFinishTime: (field, value) => dispatch(change('classesCreateForm', field, value))  

})

const connectedClassCreatePage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'classesCreateForm',
    onSubmit: submit,
})(ClassCreatePage));
export { connectedClassCreatePage as ClassCreatePage }; 