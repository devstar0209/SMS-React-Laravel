import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Card, CardHeader, Button} from 'reactstrap';
import { Icon } from 'semantic-ui-react';

import ClassesList from './components/ClassesList'

import {getClassesList, requestClassDetail, requestGotoCreate} from './classactions'
class ClassPage extends React.Component{
    constructor(props){
        super(props);

        this.handleClassCreate = this.handleClassCreate.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }
    
    componentDidMount(){
        this.props.getClassesList();
    }

    handleClassCreate(){
        this.props.requestGotoCreate();
    }

    handleSelectRow(row){
        var data = {}
        data['id'] = row.id
        this.props.requestClassDetail(data);
    }

    render(){
       
        return(
            <Fragment>
                <Col md="12">
                    <Card className="full-card">
                        <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Classes List
                            <div className="btn-actions-pane-right">
                                <Button className="btn-common btn-new" color="primary" onClick={this.handleClassCreate}><Icon name='plus' />New</Button>
                            </div>
                        </CardHeader>
                        <div className="mt-3">
                            <ClassesList data={this.props.classes} handleSelectRow={this.handleSelectRow}/>
                        </div>
                    </Card>
                </Col>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    classes: state.classReducer.classes,
}
)

const mapDispatchToProps = {
    getClassesList,
    requestClassDetail,
    requestGotoCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage)