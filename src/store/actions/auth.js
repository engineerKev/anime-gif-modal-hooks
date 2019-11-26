import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as projectData from '../../../src/creds';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    const postUrl =  isSignup ? projectData.fireBaseSignupUrl : projectData.fireBaseSigninUrl;
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(postUrl+projectData.fireBaseApiKey, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
            } else {
                dispatch(logout());
            }
        }

    }
}