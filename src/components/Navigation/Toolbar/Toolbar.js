import React, {useContext } from 'react';
import { withRouter } from 'react-router-dom';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import { AuthContext } from '../../../context/auth-context';

const toolbar = (props) => {
    const userIdHooks = useContext(AuthContext).authData.userId;
    const generateNavItems = () => {
        const { hasLikesHooks } = props;
        let navElements = [
            {
                active: false,
                path: "/",
                text: "Random",
                show: true
            },
            {
                active: false,
                path: "/likes",
                text: "My Likes",
                show: hasLikesHooks || userIdHooks
            },
            {
                active: false,
                path: "/auth",
                text: "User Login",
                show: !userIdHooks
            },
            {
                active: false,
                path: "/logout",
                text: "Logout",
                show: userIdHooks !== null
            }
        ];
        const indexOfRoute = getIndexOfCurrentRoute(navElements);
        const indexOfActive = getIndexOfCurrentActive(navElements);
        if (indexOfActive > -1) {
            navElements[indexOfActive].active = !navElements[indexOfActive].active;
        }
        navElements[indexOfRoute].active = !navElements[indexOfRoute].active;
        return navElements;
    }

    const getIndexOfCurrentRoute = (navItems) => {
        return navItems.map(e => e.path).indexOf(props.history.location.pathname);
    }

    const getIndexOfCurrentActive = (navItems) => {
        return navItems.map(e => e.active).indexOf(true);
    }

    return (
        <header className={classes.ToolbarContainer}>
            <div className={classes.Toolbar}>
                <NavigationItems navItems={generateNavItems()} />
            </div>
        </header>
    );
}

export default withRouter(toolbar);