import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux';
import * as  actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { AuthContext } from '../../context/auth-context';

const auth = (props) => {
    const {authData, authenticate } = useContext(AuthContext);
    const [authFormControls, authFormControlsUpdate] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, isSignupUpdate] = useState(true);

    const checkValidity = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        if (validation.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authFormControls,
            [controlName]: {
                ...authFormControls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authFormControls[controlName].validation),
                touched: true
            }
        }
        authFormControlsUpdate(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //HERE GET AUTHENTICATION FUNCTION FROM AUTH CONTEXT PROVIDER
        authenticate(authFormControls.email.value, authFormControls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        isSignupUpdate(!isSignup);
    }

    const authRender = (formContents) => {
        //HERE USE CONTEXT -> authData.userId
        if (authData.userId) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className={classes.AuthForm}>
                <div>User Authentication</div>
                <form onSubmit={submitHandler}>
                    {formContents}
                    <Button btnType="Success" >Submit</Button>
                    <Button
                        btnType="Danger"
                        clicked={switchAuthModeHandler}
                        type="button"
                    >Switch to {isSignup ? 'Signin' : 'Signup'}</Button>
                </form>
            </div>
        )
    }

    const formElementsArray = [];
    for (let key in authFormControls) {
        formElementsArray.push({
            id: key,
            config: authFormControls[key]
        });
    }

    const form = formElementsArray.map(formElement => {
        return (<Input
            key={formElement.id}
            type={formElement.config.elementConfig.type}
            elementtype={formElement.config.elementConfig.elementType}
            value={formElement.config.value}
            invalid={(!formElement.config.valid).toString()}
            shouldvalidate={formElement.config.validation.required.toString()}
            touched={formElement.config.touched.toString()}
            placeholder={formElement.config.elementConfig.placeholder}
            onChange={(event) => inputChangedHandler(event, formElement.id)}
        />);
    })
    return (
        <Aux>
            {authRender(form)}
        </Aux>
    );
};

export default auth;

