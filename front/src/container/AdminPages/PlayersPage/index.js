import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody,  CardHeader} from 'reactstrap';

import PlayersList from './components/PlayersList'

import {getPlayersList, requestPlayerDetail} from './playersactions'

class PlayersPage extends React.Component{
    constructor(props){
        super(props);

        this.handleSelectRow = this.handleSelectRow.bind(this);
    }

    componentDidMount(){
        this.props.getPlayersList();
    }
    
    handleSelectRow(row){
        var data = {};
        data['id'] = row.id
        this.props.requestPlayerDetail(data);
    }

    render(){
        
        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Players List
                            </CardHeader>
                            <CardBody>
                                <PlayersList data={this.props.players} handleSelectRow={this.handleSelectRow}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    players: state.playerReducer.players,
}
)

const mapDispatchToProps = {
    getPlayersList,
    requestPlayerDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersPage)