import React from 'react'

import styled from 'styled-components'

const EllipsisText = styled.div`
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export default ({text}) => (
    <EllipsisText>{text}</EllipsisText>
)