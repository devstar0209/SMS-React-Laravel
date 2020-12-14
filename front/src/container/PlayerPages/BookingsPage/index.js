import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Col, Row, Card, CardBody,  CardHeader} from 'reactstrap';

import {getClassesList} from './bookingactions'
import ClassCard from './components/ClassCard';

import { Modal } from '../../../Common/Components';

class BookingsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            bookingModalFlag: false,
            selectedClass: 0
        }

        this.handleBook = this.handleBook.bind(this);
    }
    
    componentDidMount(){
        this.props.getClassesList();
    }

    handleBook(){
        // e.preventDefault();
        var data = {}
        data['id'] = this.state.selectedClass;
        this.props.requestClassPayment(data);
    }

    toggleBookModal(id) {
        this.setState({selectedClass: id});
        this.setState({ bookingModalFlag: !this.state.bookingModalFlag })
    }

    render(){
       
        return(
            <Fragment>
                <Row className="no-gutter">
                    <Col md="12">
                        <Card className="mt-3 ml-3 mr-3 full-card">
                            <CardHeader>
                            <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                            Booking Classes List
                            </CardHeader>
                            <CardBody>
                                <Row>
                                {!!this.props.classes && this.props.classes.map(item => (
                                    <Col md="3" className="mt-3">
                                        <ClassCard data = {item} handleBook = {this.toggleBookModal.bind(this)}/>
                                    </Col>
                                ))}
                                
                                </Row>
                                {!!this.props.classes && this.props.classes.length === 0 &&
                                    <Row className="justify-content-center no-gutters">
                                        <h2>No Classes</h2>
                                    </Row>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    open={this.state.bookingModalFlag}
                    confirmText={"OK"}
                    title="Are you sure you want to book this class?"
                    hasActionButtons
                    onConfirm={this.handleBook}
                    onCancel={this.toggleBookModal.bind(this)}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    classes: state.bookingClassReducer.classes,
}
)

const mapDispatchToProps = {
    getClassesList,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsPage)