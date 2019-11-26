
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    likedGiphs: [],
    hasLikes: false,
    error: null,
    isLoading: false,
    fetchedSavedLikes: false
};

const reducer = (state = initialState, action) => {
    let likedGiphsArray;
    switch(action.type) {
        case actionTypes.SAVE_LIKE:
            likedGiphsArray = [...state.likedGiphs, action.data]; 
            return {
                ...state,
                likedGiphs: likedGiphsArray,
                hasLikes: likedGiphsArray.length !== 0,
                error: null
            }
        case actionTypes.UPDATE_LIKED_GIPHS: 
            return {
                ...state,
               hasLikes: action.data.length !== 0,
               likedGiphs: [...action.data],
               error: null
            }
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
        default:
            return state;
    }
}

export default reducer;