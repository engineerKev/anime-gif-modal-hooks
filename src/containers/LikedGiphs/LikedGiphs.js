import React, { useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import axios from '../../axios-save-likes';

import LikedGiphItems from '../LikedGiphItems/LikedGiphItems';
import Aux from '../../hoc/Aux';
import AdjacentButtons from '../../components/UI/AdjacentButtons/AdjacentButtons';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './LikedGiphs.module.css';
import { AuthContext } from '../../context/auth-context';
import { SavedLikedGiphsContext } from '../../context/likedGiphs-context';
import * as actionTypes from '../../reactStore/actionTypes';


const likedGiphs = (props) => {
    const { authData } = useContext(AuthContext);
    const { saveLikes: saveLikesHooks } = useContext(SavedLikedGiphsContext);

    const { userId: userIdHooks, token: tokenHooks }  = authData;
    const { savedLikesDispatch, savedLikesState } = props;

    const getUserLikesHooks = (token, userId) => {
        savedLikesDispatch({
            type: actionTypes.GET_USER_LIKES_START
        });
        if(token && userId) {
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
            axios.get('/liked-giphys.json'+queryParams)
                .then(response => {
                    console.log(response)
                    let likedGiphsArr = [];
                    for(let key in response.data) {
                        likedGiphsArr = likedGiphsArr.concat(response.data[key].likes);
                    }
                    savedLikesDispatch({
                        type: actionTypes.GET_USER_LIKES_SUCCESS,
                        likes:  likedGiphsArr
                    })
                })
                .catch(err => {
                    console.log(err);
                    savedLikesDispatch({
                        type: actionTypes.GET_USER_LIKES_FAILED,
                        error: err
                    })

                });
        } else {
            savedLikesDispatch({
                type: actionTypes.ONLY_LOAD_LOCAL_LIKES
            })
        }
    }

    useEffect(() => {
        const {fetchedSavedLikes: fetchedSavedLikesHooks} = savedLikesState;
        if (!fetchedSavedLikesHooks) {
            getUserLikesHooks(tokenHooks, userIdHooks);
        }
    }, [savedLikesState.fetchedSavedLikes]);
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