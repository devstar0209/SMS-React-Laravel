import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody} from 'reactstrap';
import { reduxForm,  submit  } from 'redux-form';

import ClassForm from './../components/ClassForm'

class ClassDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.loading == undefined && this.props.initialValues == undefined)
            this.props.history.push('/page/classes');
    }

    handleSaveFormSubmit(e){
        e.preventDefault();

        this.props.submitAttendance();
    }

    render() {
        
        const {handleSubmit}= this.props

        return (
            <Fragment>
                
                <Row className="classes-page no-gutters" >
                    <div style={{width: '100%'}}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardBody>
                                    <p className="fsize-3 mb-5">Class Setup Detail</p>
                                    <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>
                                        <ClassForm 
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
    let initialValues = state.teacherClassReducer.class;
    let loading = state.teacherClassReducer.loading;
	return {
          initialValues,
          loading
	}
};

const mapDispatchToProps = {
}

const connectedClassDetailPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'teacherClassesDetailForm',
    onSubmit: submit,
    enableReinitialize: true,
})(ClassDetailPage));
export { connectedClassDetailPage as ClassDetailPage }; 