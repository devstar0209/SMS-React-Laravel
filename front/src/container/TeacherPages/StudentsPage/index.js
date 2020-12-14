import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody,  CardHeader} from 'reactstrap';

import StudentList from './components/StudentList'

import {getStudentList, requestStudentDetail} from './studentsactions'

class StudentsPage extends React.Component{
    constructor(props){
        super(props);

        this.handleSelectRow = this.handleSelectRow.bind(this);
    }

    componentDidMount(){
        this.props.getStudentList();
    }
    
    handleSelectRow(row){
        var data = {}
        data['id'] = row.id
        this.props.requestStudentDetail(data);
    }

    render(){

        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Student List
                            </CardHeader>
                            <CardBody>
                                <StudentList data={this.props.students} handleSelectRow={this.handleSelectRow}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    students: state.teacherStudentReducer.students,
}
)

const mapDispatchToProps = {
    getStudentList,
    requestStudentDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage)