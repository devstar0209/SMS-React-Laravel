import React from 'react'
import { Col, Row } from 'reactstrap';
import { Fields, validators } from '../../../../Common/Components';

export default (props) => {
    const { handleChangeValue, handleChangeStartTime, handleChangeFinishTime, handleChangeDuration } = props
    const { startTime, finishTime, coaches, duration, students } = props

    const days = [{ value: 1, label: 'Mon' }, { value: 2, label: 'Tue' }, { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' }, { value: 5, label: 'Fri' }, { value: 6, label: 'Sat' }, { value: 7, label: 'Sun' }];

    const renderCoaches = () => {
        var renderCoaches = [];
        if (coaches !== undefined) {
            coaches.map((coache, idx) => renderCoaches.push({ id: idx, value: coache.id, label: coache.first_name + ' ' + coache.last_name }))
        }
        return renderCoaches;
    }

    const renderStudents = () => {
        var renderStudents = [];
        if (students !== undefined) {
            students.map((student, idx) => renderStudents.push({ id: idx, value: student.id, label: student.first_name + ' ' + student.last_name }))
        }
        return renderStudents;
    }


    return (
        <React.Fragment>
            <Row>
                <Col md="4">
                    <Fields.InputField
                        labelText="Class Type"
                        name="type"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="4">
                    <Fields.InputField
                        labelText="Class Area"
                        name="area"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col md="4" style={{ zIndex: 1000 }}>
                    <Fields.SelectField
                        className="class-day"
                        labelText="Day"
                        name="day"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                        options={days}

                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="4">
                    <Fields.TimePicker
                        labelText="Start Time"
                        name="start_time"
                        selected={startTime}
                        required
                        validate={[validators.required]}
                        onChange={handleChangeStartTime}
                    />
                </Col>
                <Col md="4">
                    <Fields.InputField
                        labelText="Duration(minutes)"
                        name="duration"
                        required
                        value={duration}
                        validate={[validators.required]}
                        onChange={handleChangeDuration}
                    />
                </Col>
                <Col md="4">
                    <Fields.TimePicker
                        labelText="Finish Time"
                        name="finish_time"
                        // selected = {finishTime}
                        required
                        readOnly
                        validate={[validators.required]}
                    // onChange={handleChangeFinishTime}
                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg="6">
                    <Fields.MultiselectField
                        labelText="Coaches"
                        name="coaches"
                        onChange={handleChangeValue}
                        options={renderCoaches()}
                    />
                </Col>
                <Col lg="6">
                    <Row>
                        <Col md="4">
                            <Fields.InputField
                                labelText="Min. Age"
                                name="min_age"
                                required
                                validate={[validators.required, validators.onlyNumbers]}
                                onChange={handleChangeValue}
                            />

                        </Col>
                        <Col md="4">

                            <Fields.InputField
                                labelText="Max. Age"
                                name="max_age"
                                required
                                validate={[validators.required, validators.onlyNumbers]}
                                onChange={handleChangeValue}
                            />
                        </Col>
                        <Col md="4">
                            <Fields.InputField
                                labelText="Max No. in Class"
                                name="max_no"
                                required
                                validate={[validators.required, validators.onlyNumbers]}
                                onChange={handleChangeValue}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-4">

                        <Col md="4">
                            <Fields.InputField
                                labelText="Amount"
                                required
                                validate={[validators.required, validators.positiveNumbers]}
                                name="price"
                            />
                        </Col>
                        <Col md="4">
                            <Fields.InputField
                                labelText="Casual Rate"
                                required
                                validate={[validators.required, validators.positiveNumbers]}
                                name="fee"
                            />
                        </Col>
                        <Col md="4">
                            <Fields.InputField
                                labelText="Member Rate"
                                name="member_fee"
                                required
                                validate={[validators.required, validators.positiveNumbers]}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}