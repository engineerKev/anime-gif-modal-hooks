import React, { useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import axios from '../../axios-save-likes';

import LikedGiphItems from '../LikedGiphItems/LikedGiphItems';
import Aux from '../../hoc/Aux';
import AdjacentButtons from '../../components/UI/AdjacentButtons/AdjacentButtons';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './LikedGiphs.module.css';
import { AuthContext } from '../../context/auth-context';
import * as actionTypes from '../../reactStore/actionTypes';


const likedGiphs = (props) => {
    const { authData } = useContext(AuthContext);

    const { userId: userIdHooks, token: tokenHooks }  = authData;
    const { savedLikesState, savedLikesDispatch, fetchUserLikes } = props;

    useEffect(() => {
        const {fetchedSavedLikes: fetchedSavedLikesHooks} = savedLikesState;
        if (!fetchedSavedLikesHooks) {
            fetchUserLikes(tokenHooks, userIdHooks);
        }
    }, [savedLikesState.fetchedSavedLikes]);
    
    const saveLikesHooks = (likes, token, userId) => {
        const likesPayload = {
            likes: [...likes],
            userId: userId
        }
        axios.put('/liked-giphys/'+userId+'.json?auth='+token, likesPayload)
            .then(response => {
                console.log("LIKES SAVED!!!");
                console.log(response);
                savedLikesDispatch({
                    type: actionTypes.SAVED_LIKES_SUCCESS
                });
            })
            .catch(err => {
                console.log("da error",err.toString());
                savedLikesDispatch({
                    type: actionTypes.SAVED_LIKES_FAILED,
                    error: err.toString()
                });
            })
    }

    const unlikeGiph = (giphUrl) => {
        const { likedGiphs: likedGiphsHooks } = savedLikesState;
        const updatedLikedGiphs = likedGiphsHooks.filter(giphObj => giphObj.url !== giphUrl)
        savedLikesDispatch({
            type: actionTypes.UPDATE_LIKED_GIPHS,
            likes: updatedLikedGiphs
        })
    }

    const saveLikesBtnClasses = () => {
        const { savedLikesState } = props;
        const auxilaryClasses = savedLikesState.hasLikes ? '' : 'Hide';
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
            clickHandler: () => { saveLikesHooks(savedLikesState.likedGiphs, tokenHooks, userIdHooks) }
        },
        {
            type: "Success",
            extraClasses: saveLikesBtnClasses,
            clickHandler: getGiphs,
            text: 'Get MOAR Giphs',
        }
    ];

    const renderOrRedirect = () => {
        const { savedLikesState } = props;

        if ((tokenHooks && userIdHooks) || savedLikesState.likedGiphs.length) {
            return (
                <Aux>
                    <div>
                        {ifUserSaveLikes()}
                    </div>
                    <div className={classes.LikesContainer}>
                        <LikedGiphItems likedGiphs={savedLikesState.likedGiphs} unlike={unlikeGiph} />
                    </div>
                </Aux>
            )
        } else {
            return <Redirect to="/" />
        }
    }

    return props.savedLikesState.isLoading ? <Spinner /> : renderOrRedirect();
}

export default withRouter(likedGiphs);