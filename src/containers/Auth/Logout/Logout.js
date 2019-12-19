import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import * as actionTypes from '../../../store/actions/actionTypes';
import { AuthContext } from '../../../context/auth-context';


const logout = (props) => {
    const { logout: logoutHooks } = useContext(AuthContext);
    const { savedLikedDispatch } = props;
    useEffect(() => {
        logoutHooks();
        savedLikedDispatch({
            type: actionTypes.CLEAR_LIKES
        })
    }, [logoutHooks, savedLikedDispatch]);

    return <Redirect to="/" />;
}

export default logout;