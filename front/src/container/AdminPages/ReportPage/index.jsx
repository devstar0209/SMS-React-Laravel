import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody, CardHeader } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import StudentEnrol from './components/StudentEnrol';
import StudentFee from './components/StudentFee';
import StudentGrade from './components/StudentGrade';
import Class from './components/Class';
import Staff from './components/Staff';

import {requestReport} from './reportactions'

class ReportPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            report_type: 0
        }

        this.handleReport = this.handleReport.bind(this)
    }

    handleReport(e, {value}){
        this.setState({report_type: value})
        this.props.requestReport({'report_type': value});
        
    }

    renderReport(){
        if(!!this.props.data){
            switch(this.state.report_type){
                case 1:
                    return <StudentEnrol data={this.props.data}/>
                case 2:
                    return <StudentFee data={this.props.data}/>
                case 3:
                    return <StudentGrade data={this.props.data}/>
                case 4:
                    return <Class data={this.props.data}/>
                case 5:
                    return <Staff data={this.props.data}/>
            }
        }
    }

    render() {
        const reportOptions = [
            {
                key: 1,
                text: 'Student Enrollment',
                value: 1,
            },
            {
                key: 2,
                text: 'Student Fee',
                value: 2,
            },
            {
                key: 3,
                text: 'Student Grade',
                value: 3,
            },
            {
                key: 4,
                text: 'Class',
                value: 4,
            },
            {
                key: 5,
                text: 'Staff',
                value: 5,
            },

        ]
        return (
            <Fragment>
                <Row className="report-page no-gutters" >
                    <div style={{ width: '100%' }}>
                        <Col md="12" className="mt-3">
                            <Card className="full-card">
                                <CardHeader>
                                    <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                                        Report
                                    <div className="btn-actions-pane-right">
                                        <Dropdown
                                            style={{width: 250}}
                                            placeholder='Select Report'
                                            fluid
                                            selection
                                            onChange={this.handleReport}
                                            options={reportOptions}
                                        />
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <p className="fsize-3 text-center">Please select report type</p>
                                    {this.renderReport()}
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </Row>
            </Fragment>
        )

    }

}

const mapStateToProps = (state) => ({
    data: state.reportReducer.data
}
)

const mapDispatchToProps = {
    requestReport, 
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)