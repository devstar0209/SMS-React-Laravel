import React, {useState} from 'react'
import { reduxForm } from 'redux-form';
import {Link} from 'react-router-dom'

import {Button} from 'reactstrap';

import styled from 'styled-components'

import { Fields, validators } from '../../../Common/Components';
import ForgotPassword from './../Components/ForgotPassword';

import {logo_color} from '../../../Common/Assets/Icons'

const Form = styled.div`
    width: 410px;
    height: 613px;
    display: flex;
    padding: 50px;
    padding-bottom: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const options = [
    {value: 0, label: 'Manager'},
    {value: 1, label: 'Teacher'},
    {value: 2, label: 'Player'},
    {value: 3, label: 'Parent'},
];

const LoginForm =  (props) => {
    const { handleSubmit } = props;
    const {handleChangeValue} = props
    // const {loading} = props;

    // const[option, selectOption] = useState(0);

    // function handleOptionChange (option) {
    //     selectOption(option.value)
    // }

    return (
        <Form>
            <Link to="/">
                <img src={logo_color} width="139" height="111" alt="logo"/>
            </Link>
            <form className="login__form" onSubmit={handleSubmit}>
                <Fields.InputField
                    placeholder="Email Address"
                    name="email"
                    validate={[validators.required, validators.email]}
                    icon="envelope outline"
                    iconPosition='left'
                />
                <Fields.PasswordField
                    placeholder="Password"
                    name="password"
                    className="mt-3"
                    validate={[validators.required]}
                    icon="lock "
                    iconPosition='left'
                />
                <div style={{marginTop: 40}}>

                    <Fields.SelectField 
                        // value={option}
                        name="role"
                        // onChange={handleOptionChange}
                        placeholder="Select role"
                        options={options}
                    />
                </div>
                <ForgotPassword
                    // redirectForget={this.redirectForget}
                    initialValues={props.initialValues}
                    handleChangeValue={handleChangeValue}
                />
                <div className="login-button-container text-center mt-5">
                    <Button className="btn-common" type="submit" style={{width: 136, height:48}}>Login</Button>
                </div>
            </form>
        </Form>
    )
}

export default (reduxForm({
    form: 'loginForm',
    enableReinitialize: true,
})(LoginForm))