import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody,  CardHeader} from 'reactstrap';

import ClassesList from './components/ClassesList'

import {getClassesList, requestClassStudentAttendance} from './classactions'
class AttendancePage extends React.Component{
    constructor(props){
        super(props);

        this.handleSelectRow = this.handleSelectRow.bind(this);
    }
    
    componentDidMount(){
        this.props.getClassesList();
    }

    handleSelectRow(row){
        var data = {}
        data['id'] = row.id
        this.props.requestClassStudentAttendance(data);
    }

    render(){
       
        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Classes List
                            </CardHeader>
                            <CardBody>
                                <ClassesList data={this.props.classes} handleSelectRow={this.handleSelectRow}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    classes: state.teacherAttendanceReducer.classes,
}
)

const mapDispatchToProps = {
    getClassesList,
    requestClassStudentAttendance
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendancePage)