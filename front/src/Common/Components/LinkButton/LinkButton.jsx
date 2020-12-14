import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const LinkButton = styled.div`
    text-align: center;
    padding-top: .9rem;        
    text-decoration: none;
    font-size: 15px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;

    color: #333333;

    &:hover {
        cursor: pointer;
    }

    a {
        color: #000;
    }
`;

export default ({path, label}) => (
    <LinkButton>
        <Link to={path}>{label}</Link>
    </LinkButton>
)