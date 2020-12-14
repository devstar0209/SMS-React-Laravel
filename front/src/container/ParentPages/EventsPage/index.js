import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, Form, CardHeader} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';

import EventList from './components/EventList'

import {getEventsList, requestEventDetail} from './eventactions'
class EventsPage extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }
    
    componentDidMount(){
        var data = {};
        data['student_id'] = this.props.id
        this.props.getEventsList(data);
    }

    handleSelectRow(row){
        var data = {}
        data['id'] = row.id
        this.props.requestEventDetail(data);
    }

    render(){
       
        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Event List
                            </CardHeader>
                            <CardBody>
                                <EventList data={this.props.events} handleSelectRow={this.handleSelectRow}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    events: state.kidEventReducer.events,
}
)

const mapDispatchToProps = {
    getEventsList,
    requestEventDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)