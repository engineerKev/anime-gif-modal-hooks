import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import { AuthContext } from '../../../context/auth-context';


const logout = (props) => {
    const { logout: logoutHooks } = useContext(AuthContext);
    const {clearLikes} = props;
    useEffect(() => {
        logoutHooks();
        clearLikes();
    }, [logoutHooks, clearLikes]);

    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        clearLikes: () => { dispatch(actions.clearLikes()) }
    }
};


export default connect(null, mapDispatchToProps)(logout);