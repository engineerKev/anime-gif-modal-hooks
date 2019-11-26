import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

import LikedGiphItems from '../LikedGiphItems/LikedGiphItems';
import Aux from '../../hoc/Aux';
import AdjacentButtons from '../../components/UI/AdjacentButtons/AdjacentButtons';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './LikedGiphs.module.css';
import * as actions from '../../store/actions/index';
import { AuthContext } from '../../context/auth-context';

const likedGiphs = (props) => {
    const { authData } = useContext(AuthContext);
    const { userId: userIdHooks, token: tokenHooks }  = authData;
    const { fetchedSavedLikes, getUserLikes } = props;

    useEffect(() => { 
        if (!fetchedSavedLikes) {
            getUserLikes(tokenHooks, userIdHooks);
        }
    }, [fetchedSavedLikes, getUserLikes]);
    const unlikeGiph = (giphUrl) => {
        const { likedGiphs, updateLikedGiphs } = props;
        const updatedLikedGiphs = likedGiphs.filter(giphObj => giphObj.url !== giphUrl)
        updateLikedGiphs(updatedLikedGiphs);
    }

    const saveLikesBtnClasses = () => {
        const { showLoggedInButtons } = props;
        const auxilaryClasses = showLoggedInButtons ? '' : 'Hide';
        return `${auxilaryClasses}`;
    }

    const getGiphs = () => {
        const { history } = props;
        history.push("/");
    }

    const ifUserSaveLikes = () => {
        if (!tokenHooks) {
            return (
                <span
                    className={classes.Announcement}
                >Please <Link className={classes.Link} to="/auth"> sign-in / sign-up </Link> to save likes
            </span>);
        } else {
            return (
                <AdjacentButtons numOfButtons={2} buttons={adjacentButtonsControls} />
            )
        }
    }
    
    const adjacentButtonsControls = [
        {
            type: "Success",
            extraClasses: saveLikesBtnClasses,
            text: 'Save Likes',
            clickHandler: () => { props.saveLikes(props.likedGiphs, tokenHooks, userIdHooks) }
        },
        {
            type: "Success",
            extraClasses: saveLikesBtnClasses,
            clickHandler: getGiphs,
            text: 'Get MOAR Giphs',
        }
    ];

    const renderOrRedirect = () => {
        const { likedGiphs } = props;

        if ((tokenHooks && userIdHooks) || likedGiphs.length) {
            return (
                <Aux>
                    <div>
                        {ifUserSaveLikes()}
                    </div>
                    <div className={classes.LikesContainer}>
                        <LikedGiphItems likedGiphs={likedGiphs} unlike={unlikeGiph} />
                    </div>
                </Aux>
            )
        } else {
            return <Redirect to="/" />
        }
    }

    return props.isLoading ? <Spinner /> : renderOrRedirect();
}

const mapStateToProps = state => {
    return {
        likedGiphs: state.likedGiphs.likedGiphs,
        showLoggedInButtons: state.likedGiphs.hasLikes,
        isLoading: state.likedGiphs.isLoading,
        fetchedSavedLikes: state.likedGiphs.fetchedSavedLikes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLikedGiphs: (updatedLikedGiphs) => dispatch(actions.updateLikedGiphs(updatedLikedGiphs)),
        saveLikes: (likes, token, userId) => dispatch(actions.saveLikes(likes, token, userId)),
        getUserLikes: (token, userId) => dispatch(actions.getUserLikes(token, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(likedGiphs));