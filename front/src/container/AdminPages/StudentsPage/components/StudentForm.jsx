import React from "react";
import { Col, Row, ButtonGroup, Button } from "reactstrap";
import { Radio } from "semantic-ui-react";
import MakeupHistory from './MakeupHistory';
import {
    Fields,
    validators,
    ImageDragDrop
} from "../../../../Common/Components";

export default props => {
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
                <Col md="12" lg="6">
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
                <Col md="12" lg="6">
                    <Col md="6">
                        <Fields.InputField
                            labelText="City"
                            name="city"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="12" className="d-flex justify-content-between">
                    <Col xl="2" lg="3" sm="3">
                        <Fields.InputField
                            labelText="State"
                            name="state"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col xl="2" lg="3" sm="3">
                        <Fields.InputField
                            labelText="Postal Code"
                            name="postalcode"
                            required
                            validate={[validators.onlyNumbers]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="3" lg="3">
                        <Fields.InputField
                            labelText="Phone"
                            name="mobile"
                            required
                            validate={[validators.required]}
                            onChange={handleChangeValue}
                        />
                    </Col>
                    <Col md="3" lg="3">
                        <Fields.InputField
                            labelText="Email"
                            name="email"
                            required
                            validate={[validators.required, validators.email]}
                            onChange={handleChangeValue}
                        />
                    </Col>
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
                    <Col md="6" lg="6">
                        <Fields.InputField
                            labelText="Grade/Level"
                            name="grade"
                            required
                            validate={[validators.required]}
                        />
                    </Col>
                </Col>
                <Col md="6" className="d-flex">
                    <Col md="6">
                        <Fields.InputField
                            labelText="GOL ID"
                            name="gol_id"
                            required
                            validate={[validators.required]}
                        />
                    </Col>
                </Col>
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
                <Col md="12" className="mt-4">
                <p className="fsize-3">Makeup/Trial</p>
                    <Row>
                    <Col md="6">
                        <Row>
                            <Col md="4">
                                <Fields.DatePicker
                                    labelText="Date1"
                                    name="makeup_1"
                                    icon
                                    selected={makeup_1}
                                    onChange={(value)=>handleChangeMakeup(value, 1)}
                                />
                            </Col>
                            <Col md="4">
                                <Fields.DatePicker
                                    labelText="Date2"
                                    name="makeup_2"
                                    icon
                                    selected={makeup_2}
                                    onChange={(value)=>handleChangeMakeup(value, 2)}
                                />
                            </Col>
                            <Col md="4">
                                <Fields.DatePicker
                                    labelText="Date3"
                                    name="makeup_3"
                                    icon
                                    selected={makeup_3}
                                    onChange={(value)=>handleChangeMakeup(value, 3)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6" className="mt-4">
                        <MakeupHistory
                            data={props.makeup_attendance}
                            present={props.makeup_present}
                            handleChangeMakeupMark = {handleChangeMakeupMark}
                        />
                    </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};
