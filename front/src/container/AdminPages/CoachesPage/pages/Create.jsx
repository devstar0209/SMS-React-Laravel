import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, Button} from 'reactstrap';
import { reduxForm, submit, change  } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment'
import {generate} from 'generate-password'

import CoacheForm from '../components/CoacheForm'

import {requestCoacheCreate, createPassword} from './../coachesactions'


class CoachesCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
            image: null,
        }


        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {

    }

    handleSaveFormSubmit(data) {
        if(this.state.image != null)
        data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        this.props.requestCoacheCreate(data)
    }

    handleChangeValue(e){
        console.log('select', e);
    }
    handleChangeDOB(date){
        this.setState({dob: date});
    }

    handleCancel(){
        this.props.history.push('/admin/coaches')
        this.props.reset()
    }

    handleChangeImage(image){
        this.setState({image: image});
    }

    handleGeneratePassword(e) {
        e.preventDefault();

        var password = generate({
            length: 10,
            numbers: true,
            uppercase: true,
            lowercase: true,
            symbols: true
        });

        this.props.changePassword("password", password)
        
    }

    render() {
        
        const {handleSubmit}= this.props
        const classType=[{key:1, value:'lv1', label: 'lv1'}, {key:2, value:'lv2', label: 'lv2'}]
        return (
            <Fragment>
                <Row className="coaches-page no-gutters" >
                    {/* <Header 
                        title="NEW COACHE SETUP"
                        handleChangeImage={this.handleChangeImage} 
                    /> */}
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <p className="fsize-3 mb-5">NEW COACHE SETUP</p>
                                    <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                        <CoacheForm 
                                            handleChangeDOB={this.handleChangeDOB}
                                            handleChangeImage={this.handleChangeImage} 
                                            handleChangeValue={this.handleChangeValue}
                                            handleGeneratePassword={this.handleGeneratePassword}
                                            dob={this.state.dob}
                                            classes={this.props.classes}
                                            classType={classType}
                                            initialValues={this.props.initialValues}
                                            showPassword={true}
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
                                </CardBody>
                            </Card>
                        </Col>
                        
                    </div>
                </Row>
               
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    classes: state.coacheReducer.classes,
    initialValues: state.coacheReducer.coache
})

const mapDispatchToProps = dispatch => ({
    requestCoacheCreate: (data) => dispatch(requestCoacheCreate(data)),
    changePassword: (field, value) => dispatch(change('coacheCreateForm', field, value))    
}) 

const connectedCoachesCreatePage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'coacheCreateForm',
    fields: ['password'],
    onSubmit: submit,
})(CoachesCreatePage));
export { connectedCoachesCreatePage as CoachesCreatePage }; 