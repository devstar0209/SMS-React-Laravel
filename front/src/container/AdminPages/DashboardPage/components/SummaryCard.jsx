import React from 'react'
import styled from 'styled-components';

import {
    Card, CardBody
    } from 'reactstrap';

const Title = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #333333;
`;
const Text = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #333333;
`;
const Label = styled.h6`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #828282;
`;

export default ({title, text, label, action}) => {
    return(
        <Card className="main-card">
            <CardBody>
                <Title>{title}</Title>
                <Text>{text}</Text>
                <Label className="">{label}</Label>
            </CardBody>
        </Card>
    )
}