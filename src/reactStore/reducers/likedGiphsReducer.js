import * as actionTypes from '../actionTypes';
import axios from '../../axios-save-likes';

export const fetchLikes = (likesDispatch) => {
    return (token, userId) => {
        likesDispatch({
            type: actionTypes.GET_USER_LIKES_START
        });
        if (token && userId) {
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            axios.get('/liked-giphys.json' + queryParams)
                .then(response => {
                    console.log(response)
                    let likedGiphsArr = [];
                    for (let key in response.data) {
                        likedGiphsArr = likedGiphsArr.concat(response.data[key].likes);
                    }
                    likesDispatch({
                        type: actionTypes.GET_USER_LIKES_SUCCESS,
                        likes: likedGiphsArr
                    })
                })
                .catch(err => {
                    console.log(err);
                    likesDispatch({
                        type: actionTypes.GET_USER_LIKES_FAILED,
                        error: err.toString()
                    })

                });
        } else {
            likesDispatch({
                type: actionTypes.ONLY_LOAD_LOCAL_LIKES
            })
        }
    }
}

export const initialState = {
    likedGiphs: [],
    hasLikes: false,
    error: null,
    isLoading: false,
    fetchedSavedLikes: false,
    fetchUserLikes: fetchLikes
};

export const reducer = (state, action) => {
    let likedGiphsArray = [];
    switch (action.type) {
        case actionTypes.SAVED_LIKES_SUCCESS:
            return {
                ...state,
                error: null
            }
        case actionTypes.SAVED_LIKES_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.SAVE_LIKE:
            likedGiphsArray = [...state.likedGiphs, action.like];
            return {
                ...state,
                likedGiphs: likedGiphsArray,
                hasLikes: likedGiphsArray.length !== 0,
                error: null
            }
        case actionTypes.UPDATE_LIKED_GIPHS:
            return {
                ...state,
                hasLikes: action.likes.length !== 0,
                likedGiphs: [...action.likes],
                error: null
            }
        case actionTypes.GET_USER_LIKES_START:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case actionTypes.GET_USER_LIKES_SUCCESS:
            likedGiphsArray = [...state.likedGiphs, ...action.likes];
            return {
                ...state,
                likedGiphs: likedGiphsArray,
                hasLikes: likedGiphsArray.length !== 0,
                isLoading: false,
                fetchedSavedLikes: true,
            }
        case actionTypes.GET_USER_LIKES_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case actionTypes.CLEAR_LIKES:
            return {
                ...state,
                likedGiphs: [],
                hasLikes: false,
                fetchedSavedLikes: false
            }
        case actionTypes.ONLY_LOAD_LOCAL_LIKES:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}