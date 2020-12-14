import React from 'react';
import styled from 'styled-components';

import { Fields, LinkButton } from '../../../Common/Components';

const ForgotPassword = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export default (props) => (
    <ForgotPassword>
        <Fields.CheckboxField
            label="Remember Me"
            name="RememberMe"
            onChange={(value) => props.handleChangeValue(value, 'RememberMe')}
        />

        {/* <LinkButton path="/forgot-password" label="Forgot password?" /> */}
    </ForgotPassword>
)