import React, { useState, useCallback } from 'react';
import axios from 'axios';

import * as projectData from '../creds';

export const AuthContext = React.createContext();

export default props => {
    const [authObj, setAuthObj] = useState({
        token: null,
        userId: null,
        error: null,
        loading: false
    });

    const logoutHooks = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        setAuthObj(prevAuthState => {
            return {
                ...prevAuthState,
                userId: null,
                token: null
            }
        });
    }, [authObj.userId, authObj.token]);

    const checkAuthTimeoutHooks = useCallback((expirationTime) => {
        setTimeout(() => {
            logoutHooks()
        }, expirationTime );
    }, [logoutHooks]);

    const authCheckStateHooks = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            logoutHooks();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                setAuthObj(prevAuthState => {
                    return {
                        ...prevAuthState,
                        userId: userId,
                        token: token
                    } 
                });
                checkAuthTimeoutHooks(expirationDate.getTime() - new Date().getTime());
            } else {
                logoutHooks();
            }
        }
    },[checkAuthTimeoutHooks, logoutHooks, authObj.token, authObj.userId]);

    const authHooks = (email, password, isSignup) => {
        const postUrl = isSignup ? projectData.fireBaseSignupUrl : projectData.fireBaseSigninUrl;
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(postUrl + projectData.fireBaseApiKey, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                setAuthObj(prevAuthState => {
                    return {
                        ...prevAuthState,
                        token: response.data.idToken,
                        userId: response.data.localId
                    } 
                });
                checkAuthTimeoutHooks(response.data.expiresIn * 1000)
            })
            .catch(err => {
                console.log(err);
                setAuthObj(prevAuthState => {
                    return {
                        ...prevAuthState,
                        error: err.toString()
                    } 
                });
            })
    };

    return (
        <AuthContext.Provider value={{
            authData: authObj, 
            authenticate: (email, pw, isSignup) => authHooks(email, pw, isSignup),
            logout: logoutHooks,
            tryAutoSignIn: authCheckStateHooks 
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}