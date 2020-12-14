import React from "react";
import { reduxForm, reset, submit  } from 'redux-form';

import { Col, Row, ButtonGroup } from "reactstrap";
import { Radio } from "semantic-ui-react";
import { Button, Icon } from 'semantic-ui-react';

import MakeupHistory from './MakeupHistory';

import {
    Fields,
    validators,
    ImageDragDrop
} from "../../../../Common/Components";

const StudentForm = props => {
    const {
        handleChangeValue,
        handleChangeDOB,
        handleChangeImage,
        handleChangeValueGender,
        handleActiveMode,
        handleChangeMakeup,
        handleChangeMakeupMark
    } = props;

    const { dob, image, gender, classes, activemode, makeup_1, makeup_2, makeup_3 } = props;
    const {handleSubmit} = props

    const renderClassses = () => {
        var renderclasses = [];
        if (classes !== undefined) {
            classes.map((item, index) => {
                renderclasses.push({ value: item.id, label: item.type });
            });
        }
        return renderclasses;
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
            <Row>
                <Col md="6">
                    <Col md="12">
                        <Fields.InputField
                            labelText="First Name"
                            name="first_name"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="12" className="mt-4">
                        <Fields.InputField
                            labelText="Last Name"
                            name="last_name"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Col>
                <Col md="6" className="d-flex justify-content-center profile-image">
                    <Col lg="12" xl="6">
                        <ImageDragDrop
                            handleChangeImage={handleChangeImage}
                            image={image}
                        />
                        <Col md="12">
                            <ButtonGroup size="lg">
                                <Button
                                    outline
                                    className=" "
                                    color="danger"
                                    active={activemode === 1}
                                    onClick={() => handleActiveMode(1)}
                                >
                                    Active
                </Button>
                                <Button
                                    outline
                                    className=" "
                                    color="warning"
                                    active={activemode === 2}
                                    onClick={() => handleActiveMode(2)}
                                >
                                    Trial
                </Button>
                                <Button
                                    outline
                                    className=" "
                                    color="secondary"
                                    active={activemode === 3}
                                    onClick={() => handleActiveMode(3)}
                                >
                                    Inactive
                </Button>
                            </ButtonGroup>
                        </Col>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6">
                    <Col md="6" lg="6" className="mt-4 d-flex justify-content-between">
                        <label style={{ fontSize: 15, color: "black" }}>Gender</label>
                        <Radio
                            label="Male"
                            name="gender"
                            value={1}
                            checked={gender === 1}
                            onChange={handleChangeValueGender}
                        />
                        <Radio
                            label="Female"
                            name="gender"
                            value={2}
                            checked={gender === 2}
                            onChange={handleChangeValueGender}
                        />
                    </Col>
                </Col>

                <Col md="6" lg="6">
                    <Col md="6" lg="6">
                        <Fields.DatePicker
                            labelText="DOB"
                            name="dob"
                            selected={dob}
                            required
                            icon
                            validate={[validators.required]}
                            onChange={handleChangeDOB}
                        />
                    </Col>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="12" lg="3">
                    <Col md="12">
                        <Fields.InputField
                            labelText="Address"
                            name="address"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Col>
                <Col md="12" lg="3">
                    <Col md="12">
                        <Fields.InputField
                            labelText="City"
                            name="city"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Col>
                <Col xl="3" lg="3" sm="12">
                    <Fields.InputField
                        labelText="State"
                        name="state"
                        required
                        validate={[validators.required]}
                        onChange={handleChangeValue}
                    />
                </Col>
                <Col xl="3" lg="3" sm="12">
                    <Fields.InputField
                        labelText="Postal Code"
                        name="postalcode"
                        required
                        validate={[validators.onlyNumbers]}
                        onChange={handleChangeValue}
                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="12" className="d-flex justify-content-between">
                    
                    {/* <Col md="3" lg="3">
                        <Fields.InputField
                            labelText="Phone"
                            name="mobile"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col> */}
                    {/* <Col md="3" lg="3">
                        <Fields.InputField
                            labelText="Email"
                            name="email"
                            required
                            validate={[validators.required, validators.email]}
                            onChange={handleChangeValue}
                        />
                    </Col> */}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="6" lg="6" className="d-flex">
                    <Col md="6" lg="6">
                        {/* <Fields.InputField 
                        labelText="Class No."
                        name="class_no"
                        // required
                        // validate={[validators.required]}
                        onChange={handleChangeValue}
                    /> */}
                        <Fields.MultiselectField
                            labelText="Class"
                            name="class_id"
                            // required
                            // validate={[validators.required]}
                            onChange={handleChangeValue}
                            options={renderClassses()}
                        />
                    </Col>
                    {/* <Col md="6" lg="6">
                        <Fields.InputField
                            labelText="Grade/Level"
                            name="grade"
                            required
                            validate={[validators.required]}
                        />
                    </Col> */}
                </Col>
                {/* <Col md="6" className="d-flex">
                    <Col md="6">
                        <Fields.InputField
                            labelText="GOL ID"
                            name="gol_id"
                            required
                            validate={[validators.required]}
                        />
                    </Col>
                </Col> */}
                <Col md="12" className="d-flex">
                    <Col md="12" className="note-textarea">
                        <Fields.InputField
                            labelText="Note"
                            name="note"
                            type="textarea"
                            style={{ height: 150 }}
                        />
                    </Col>
                </Col>
                {/* <Col md="12" className="mt-4">
                <p className="fsize-3">Makeup/Trial</p>
                    <Col md="6" className="mt-4">
                        <MakeupHistory
                            data={props.makeup_attendance}
                            present={props.makeup_present}
                            handleChangeMakeupMark = {handleChangeMakeupMark}
                        />
                    </Col>
                </Col> */}
            </Row>
            <Col md="12" className="text-center mt-4">

                <Button 
                    className="mr-3"
                    color="green"
                    // type="submit"
                ><Icon name='save' />Save</Button>
            </Col>
            </form>
        </React.Fragment>
    );
};

export default reduxForm({
    form: 'studentForm',
    onSubmit: submit,
    enableReinitialize: true
})(StudentForm)