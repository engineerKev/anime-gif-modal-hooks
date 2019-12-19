import * as actionTypes from './actionTypes';
import axios from '../../axios-save-likes';

export const saveLikedGiph = (payload) => {
    return {
        type: actionTypes.SAVE_LIKE,
        data: payload
    }
}

export const updateLikedGiphs = () => {
    return {
        type: actionTypes.UPDATE_LIKED_GIPHS
    }
}

export const useCurrentLikes = () => {
    return {
        type: actionTypes.ONLY_LOAD_LOCAL_LIKES,
    }
}

export const getUserLikesStart = () => {
    return {
        type: actionTypes.GET_USER_LIKES_START
    }
}

export const getUserLikesSuccess = (likes) => {
    return {
        type: actionTypes.GET_USER_LIKES_SUCCESS,
        likes: likes
    }
}

export const getUserLikesFailed = () => {
    return {
        type: actionTypes.GET_USER_LIKES_FAILED
    }
}

export const clearLikes = () => {
    return {
        type: actionTypes.CLEAR_LIKES
    }
}

export const getUserLikes = (token, userId) => {
    return dispatch => {
        dispatch(getUserLikesStart());
        if(token && userId) {
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
            axios.get('/liked-giphys.json'+queryParams)
                .then(response => {
                    console.log(response)
                    let likedGiphsArr = [];
                    for(let key in response.data) {
                        likedGiphsArr = likedGiphsArr.concat(response.data[key].likes);
                    }
                    dispatch(getUserLikesSuccess(likedGiphsArr));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(getUserLikesFailed(err));

                });
        } else {
            dispatch(useCurrentLikes());
        }
    }
}