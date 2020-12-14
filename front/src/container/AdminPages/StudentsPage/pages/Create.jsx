import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { reduxForm, submit } from 'redux-form';
import { Icon } from 'semantic-ui-react';
import moment from 'moment'

import StudentForm from '../components/StudentForm'
import Contact from './Contact'
import PaymentPage from './Payment'

import { requestStudentCreate } from './../studentsactions'

class StudentCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: new Date(),
            image: null,
            gender: 0,
            activemode: 2,
            makeup_1: null,
            makeup_2: null,
            makeup_3: null,
        }

        this.handleSaveFormSubmit = this.handleSaveFormSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeValueGender = this.handleChangeValueGender.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleActiveMode = this.handleActiveMode.bind(this);
        this.handleChangeMakeup = this.handleChangeMakeup.bind(this);
    }

    componentDidMount() {

    }

    handleSaveFormSubmit(data) {
        if (this.state.image != null)
            data['profile'] = this.state.image;
        data['dob'] = moment(data['dob']).format('DD/MM/YYYY')
        if (this.state.makeup_1)
            data['makeup_1'] = moment(this.state.makeup_1).format('DD/MM/YYYY');
        if (this.state.makeup_2)
            data['makeup_2'] = moment(this.state.makeup_2).format('DD/MM/YYYY');
        if (this.state.makeup_3)
            data['makeup_3'] = moment(this.state.makeup_3).format('DD/MM/YYYY');
        data['gender'] = this.state.gender
        data['active'] = this.state.activemode
        this.props.requestStudentCreate(data);
    }

    handleChangeValue() {
    }

    handleChangeValueGender(e, { value }) {
        this.setState({ gender: value })
    }

    handleChangeDOB(date) {
        this.setState({ dob: date });
    }

    handleCancel() {
        this.props.history.push('/admin/students')
        this.props.reset();
    }

    handleChangeImage(image) {
        this.setState({ image: image });
    }

    handleActiveMode(mode) {
        this.setState({ activemode: mode });
    }

    handleChangeMakeup(date, index) {
        switch (index) {
            case 1:
                this.setState({ makeup_1: date });
                break;
            case 2:
                this.setState({ makeup_2: date });
                break;
            case 3:
                this.setState({ makeup_3: date });
                break;
        }

    }

    render() {

        const { handleSubmit } = this.props

        return (
            <Fragment>
                <Row className="students-page no-gutters" >
                    {/* <Header 
                        title="NEW STUDNET SETUP"
                        handleChangeImage={this.handleChangeImage} 
                    /> */}
                    {!this.props.contactflag && !this.props.paymentflag &&
                        <div style={{ width: '100%' }}>
                            <Col md="12" className="mt-3">
                                <p className="fsize-3 mb-5">NEW STUDNET SETUP</p>
                                <form onSubmit={handleSubmit(this.handleSaveFormSubmit)}>

                                    <StudentForm
                                        handleChangeDOB={this.handleChangeDOB}
                                        handleChangeValue={this.handleChangeValue}
                                        handleChangeValueGender={this.handleChangeValueGender}
                                        handleChangeImage={this.handleChangeImage}
                                        handleActiveMode={this.handleActiveMode}
                                        dob={this.state.dob}
                                        gender={this.state.gender}
                                        activemode={this.state.activemode}
                                        classes={this.props.classes}
                                        handleChangeMakeup={this.handleChangeMakeup}
                                        makeup_1={this.state.makeup_1}
                                        makeup_2={this.state.makeup_2}
                                        makeup_3={this.state.makeup_3}
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
                    }
                    {this.props.contactflag &&
                        <Contact
                            id={this.props.student_id}
                        />
                    }
                    {this.props.paymentflag &&
                        <PaymentPage id={this.props.student_id} />
                    }
                </Row>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    classes: state.studentReducer.classes,
    contactflag: state.studentReducer.contactflag,
    paymentflag: state.studentReducer.paymentflag,
    student_id: state.studentReducer.student_id
})

const mapDispatchToProps = {
    requestStudentCreate,
}

const connectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'studentCreateForm',
    onSubmit: submit,
})(StudentCreatePage));
export { connectedStudentsPage as StudentCreatePage }; 