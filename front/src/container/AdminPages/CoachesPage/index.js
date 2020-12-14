import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody, CardHeader, Button} from 'reactstrap';
import { Icon } from 'semantic-ui-react';

import CoachesList from './components/CoachesList'

import {getCoachesList, requestCoacheDetail, requestGotoCreate} from './coachesactions'

class CoachesPage extends React.Component{
    constructor(props){
        super(props);

        this.handleCoacheCreate = this.handleCoacheCreate.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }

    componentDidMount(){
        this.props.getCoachesList();
    }
    
    handleCoacheCreate(){
        this.props.requestGotoCreate();
    }

    handleSelectRow(row){
        var data = {};
        data['id'] = row.id
        this.props.requestCoacheDetail(data);
    }

    render(){
        
        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Coaches List
                            <div className="btn-actions-pane-right">
                                <Button className="btn-common btn-new" color="primary" onClick={this.handleCoacheCreate}><Icon name='plus' />New</Button>
                            </div>
                            </CardHeader>
                            <CardBody>
                                <CoachesList data={this.props.coaches} handleSelectRow={this.handleSelectRow}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    coaches: state.coacheReducer.coaches,
}
)

const mapDispatchToProps = {
    getCoachesList,
    requestCoacheDetail,
    requestGotoCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(CoachesPage)