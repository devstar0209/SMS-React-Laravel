import React, {useState} from 'react'
import {Row, Col, Button, Label} from 'reactstrap';
import {Radio, Input} from 'semantic-ui-react'
import ImageUploader from 'react-images-upload'
import { Link } from 'react-router-dom';
import { LinkButton } from '../../../../Common/Components';

const ChooseMembership = (props) => {
    const {handleSubmit} = props
    const [pictures, setPictures] = useState();
    const [radioValue, setRadioChanged] = useState(1)
    const [memberValue, onChangeMemberNo] = useState('')

    const onDrop = picture => {
        setPictures( picture);
    };

    const onRadioChanged = (e, {value}) => {
        console.log('raiod', value)
        setRadioChanged(value);
    }

    const onMemberNoChanged = (e, {value}) => {
        onChangeMemberNo(value)
    }

    const handleMemberData = () => {
        console.log('upload image', pictures)
        const formData = new FormData();
        const reader = new FileReader();

        if (pictures) {
            reader.readAsDataURL(pictures[0]);
            console.log('reader', reader)
        }

        reader.addEventListener("load", function () {
            var data = {};
            data['member_plan'] = radioValue;
            data['member_card'] = reader.result;
            data['member_no'] = memberValue;
            handleSubmit(data)
        }, false);
        // formData.append(
        //     "member_card",
        //     pictures[0],
        //     pictures[0].name
        // )
        
    }

    return(
        <React.Fragment>
            <Row className="no-gutters justify-content-center">
                <Col md="12" className="text-center">
                    <h1>Choose Membership</h1>
                </Col>
                <Row md="12" className="mt-5 justify-content-center">
                    <Col md="12">

                        <Radio
                            label="Lifetime member (Fee $1)"
                            name="membership"
                            checked={radioValue === 1}
                            onChange={onRadioChanged}
                            value={1}
                            style={{display: 'block'}}
                            />
                        <Radio
                            label="Adult member (Half-year Fee $30)"
                            name="membership"
                            className="mt-3"
                            checked={radioValue === 2}
                            onChange={onRadioChanged}
                            value={2}
                            style={{display: 'block'}}
                            />
                        <Radio
                            label="Adult member (full-year Fee $60)"
                            name="membership"
                            className="mt-3"
                            checked={radioValue === 3}
                            onChange={onRadioChanged}
                            value={3}
                            style={{display: 'block'}}
                            />
                        <Radio
                            label="Junior member (Fee $60)"
                            name="membership"
                            className="mt-3"
                            checked={radioValue === 4}
                            onChange={onRadioChanged}
                            value={4}
                            style={{display: 'block'}}
                            />
                        <Row className="mt-5">
                            <Col md="12" >
                                <p>Enter Membership Number</p>
                                <Input
                                    name="membership_number"
                                    onChange={onMemberNoChanged}
                                    value={memberValue}
                                    style={{width: '100%'}}
                                />
                            </Col>
                        </Row>
                        <Row className="no-gutters mt-5">
                            <Label>Upload Membership Card/ID</Label>
                            <ImageUploader
                                {...props}
                                withIcon={true}
                                onChange={onDrop}
                                singleImage={true}
                                withPreview={true}
                                imgExtension={[".jpg", ".png", "jpeg"]}
                            />
                        </Row>
                        <Row className="mt-5 no-gutters justify-content-center">
                            <Button className="pl-5 pr-5 btn-common btn-icon" type="submit" onClick={handleMemberData}>Pay Membership Fee</Button>
                        </Row>
                        <Row className="mt-5 no-gutters justify-content-center">
                            <span>Don't you want to register as a member? </span><LinkButton path="/pla/login" label="Login"/>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </React.Fragment>
    )
}

export default ChooseMembership