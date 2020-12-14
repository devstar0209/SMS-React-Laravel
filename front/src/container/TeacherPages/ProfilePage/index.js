import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import { reduxForm,  submit  } from 'redux-form';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

import ProfileForm from './components/ProfileForm'

import {requestProfileUpdate, requestProfileDetail} from './profileactions'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dob: new Date(),
            image: null
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    componentDidMount() {
        this.props.requestProfileDetail();
    }

    handleSaveFormSubmit(data) {
        if(this.state.image !=  null)
        data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('MM/DD/YYYY')
        this.props.requestProfileUpdate(data);
    }

    handleChangeValue(e){
        console.log(e.target.value)
    }
    
    handleChangeDOB(date){
        this.setState({dob: date});
    }
    
    handleChangeImage(image){
        this.setState({image: image});
    }

    render() {
        
        const {handleSubmit}= this.props

        const classType=[{key:1, value:'lv1', label: 'lv1'}, {key:2, value:'lv2', label: 'lv2'}]
        return (
            <Fragment>
                <Row className="profile-page no-gutters" >
                    {/* <Header 
                        handleChangeImage={this.handleChangeImage} 
                        image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                    /> */}
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <p className="fsize-3 mb-5">Profile Detail</p>
                                    <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                    
                                        <ProfileForm 
                                            handleChangeDOB={this.handleChangeDOB}
                                            handleChangeValue={this.handleChangeValue}
                                            handleChangeImage={this.handleChangeImage} 
                                            initialValues={this.props.initialValues}
                                            classType={classType}
                                            dob={this.state.dob}
                                            image={this.props.initialValues != undefined ? this.props.initialValues.profile : null}
                                        />
                                        <Row className="justify-content-end mr-5 mt-5">
                                            <Button 
                                                className="mr-3"
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

const mapStateToProps = (state) => {
    let initialValues = state.teacherProfileReducer.profile;
	return {
          initialValues,
	}
};

const mapDispatchToProps = {
    requestProfileUpdate, 
    requestProfileDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'profileDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(ProfilePage));