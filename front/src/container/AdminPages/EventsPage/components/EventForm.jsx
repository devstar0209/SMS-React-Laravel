import React from 'react'
import {Col, Row} from 'reactstrap';
import { Fields, validators } from '../../../../Common/Components';

export default (props) => {
    const {handleChangeValue, handleChangeStartTime, handleChangeFinishTime, handleChangeStartDate, handleChangeFinishDate} = props
    const {startTime, finishTime, startDate, finishDate, coaches, students} = props

    const classType = [{ key: 1, value: 1, label: 'Active' }, { key: 2, value: 2, label: 'Not Active' }, { key: 3, value: 3, label: 'Cancelled' }]

    const renderCoaches = () => {
        var renderCoaches = [];
        if(coaches !== undefined) {
            coaches.map((coache, idx) => renderCoaches.push({id: idx, value: coache.id+1, label: coache.first_name}))
        }
        return renderCoaches;
    }

    const renderStudents = () => {
        var renderStudents = [];
        if(students !== undefined) {
            students.map((student, idx) => renderStudents.push({id: idx, value: student.id+1, label: student.first_name}))
        }
        return renderStudents;
    }

    return(
    <React.Fragment>
        <Row>
            <Col md="12" className="d-flex justify-content-between">
                <Col md="3">
                    <Fields.InputField 
                        labelText="Event Name"
                        name="name"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="3">
                    <Fields.InputField 
                        labelText="Event Type"
                        name="type"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="3">
                <Fields.InputField 
                    labelText="Event Organiser"
                    name="organiser"
                    required
                    validate={[validators.required]}
                    onChange={handleChangeValue}
                />
            </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="8">
                    <Fields.InputField 
                        labelText="Location"
                        name="location"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="4">
                    <Fields.SelectField 
                        labelText="Status"
                        name="status"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                        options ={classType}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex justify-content-between">
                <Col md="2">
                    <Fields.TimePicker 
                        labelText="Start Time"
                        name="start_time"
                        selected = {startTime}
                        required
                        validate={[validators.required]}
                        onChange={handleChangeStartTime}
                    />
                </Col>
                <Col md="2">
                    <Fields.TimePicker 
                        labelText="Finish Time"
                        name="finish_time"
                        selected = {finishTime}
                        required
                        validate={[validators.required]}
                        onChange={handleChangeFinishTime}
                    />
                </Col>
                <Col md="2">
                    <Fields.DatePicker 
                        labelText="Start Date"
                        name="start_date"
                        selected = {startDate}
                        required
                        icon
                        validate={[validators.required]}
                        onChange={handleChangeStartDate}
                    />
                </Col>
                <Col md="2">
                    <Fields.DatePicker 
                        labelText="Finish Date"
                        name="finish_date"
                        selected = {finishDate}
                        required
                        icon
                        validate={[validators.required]}
                        onChange={handleChangeFinishDate}
                    />
                </Col>
                <Col md="2">
                    <Fields.InputField 
                        labelText="Total Entry Fee"
                        name="fee"
                        required
                        validate={[validators.required, validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md="12" className="d-flex">
                <Col md="6">
                    <Fields.MultiselectField 
                        labelText="Coaches"
                        name="coaches"
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                        options={renderCoaches()}
                    />
                </Col>
                <Col md="6">
                    <Fields.MultiselectField 
                        labelText="Students"
                        name="students"
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                        options={renderStudents()}
                    />
                </Col>
            </Col>
        </Row>
    </React.Fragment>
)
}