import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, CardHeader, Button} from 'reactstrap';
import { Icon } from 'semantic-ui-react';

import EventList from './components/EventList'

import {getEventsList, requestEventDetail, requestGotoCreate} from './eventactions'
class EventsPage extends React.Component{
    constructor(props){
        super(props);

        this.handleEventCreate = this.handleEventCreate.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }
    
    componentDidMount(){
        this.props.getEventsList();
    }

    handleEventCreate(){
        this.props.requestGotoCreate();
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
                            <div className="btn-actions-pane-right">
                                <Button className="btn-common btn-new" color="primary" onClick={this.handleEventCreate}><Icon name='plus' />New</Button>
                            </div>
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
    events: state.eventReducer.events,
}
)

const mapDispatchToProps = {
    getEventsList,
    requestEventDetail,
    requestGotoCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)