import React, {useState} from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { Input } from 'semantic-ui-react';
// import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

import FormField from '../FormField';
import Icon from '../../Icon/Icon'

import '../FormFields.scss';

import styled from 'styled-components';

const PasswordField = styled.div`
    display: flex;
    flex-direction: column;
    .icon__eye__input {
        z-index: 1000;
        margin-top: -29px;
        display: flex;
        align-self: flex-end;
        margin-right: 9px;

        &:hover {
            cursor: pointer;
        }
    }
`;

export default ({
    className,
    icon,
    ...props
}) => { 
    const [hidden, setHidden] = useState(true);
    return(
        <PasswordField>
            <Field
                component={FormField}
                as={Input}
                icon={icon}
                iconPosition='left'
                {...props}
                type={ hidden ? "password" : "text"}
                className={classNames({
                    'form-field__text-input': true,
                    [className]: className,
                })}
            />
            {
                hidden ? <Icon className="icon-eye-outline icon--dark-blue icon__eye__input" onClick={(e) =>setHidden(false)} /> 
                        : <Icon className="icon-eye-off-2-outline icon--dark-blue icon__eye__input" onClick={(e) => setHidden(true)} />
            }
        </PasswordField>
    );
}