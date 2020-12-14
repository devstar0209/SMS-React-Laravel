import React from 'react';
import styled from 'styled-components'
import { awesomeuser } from '../../../../Common/Assets/Images';

const UserLog = styled.div`
    background-image: url('../../../../Common/Assets/Images/Path2095.png');
    margin-top: 20vh;
`;

export default ({}) => {
    return (
        <UserLog>
            <img src={awesomeuser} width="80"/>
        </UserLog>
    )
}