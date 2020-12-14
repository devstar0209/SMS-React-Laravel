import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, CardHeader, Button} from 'reactstrap';
import { Icon } from 'semantic-ui-react';

import StudentList from './components/StudentList'

import {getStudentList, requestStudentDetail, requestClassList} from './kidsactions'

class KidsPage extends React.Component{
    constructor(props){
        super(props);

        this.handleStudentCreate = this.handleStudentCreate.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }

    componentDidMount(){
        this.props.getStudentList();
    }
    
    handleStudentCreate(){
        this.props.requestClassList();
        
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
                            Kid List
                            <div className="btn-actions-pane-right">
                                <Button className="btn-common btn-new" color="primary" onClick={this.handleStudentCreate}><Icon name='plus' />New</Button>
                            </div>
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
    students: state.parentKidReducer.students,
}
)

const mapDispatchToProps = {
    getStudentList,
    requestStudentDetail,
    requestClassList
}

export default connect(mapStateToProps, mapDispatchToProps)(KidsPage)