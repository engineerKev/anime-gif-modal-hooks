import * as actionTypes from '../actionTypes';

export const initialState = {
    likedGiphs: [],
    hasLikes: false,
    error: null,
    isLoading: false,
    fetchedSavedLikes: false
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