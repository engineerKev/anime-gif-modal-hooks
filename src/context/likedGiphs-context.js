import React, { createContext, useState } from 'react';
import axios from '../axios-save-likes';

export const SavedLikedGiphsContext = createContext();

export default props => {
    const setSavedLikesObj = useState({
        error: null,
    })[1];

    const saveLikes = (likes, token, userId) => {
        const likesPayload = {
            likes: [...likes],
            userId: userId
        }
        axios.put('/liked-giphys/'+userId+'.json?auth='+token, likesPayload)
            .then(response => {
                console.log("LIKES SAVED!!!");
                console.log(response);
                setSavedLikesObj(prevSavedLikesState => {
                    return {
                        ...prevSavedLikesState,
                        error: null
                    }
                });
            })
            .catch(err => {
                console.log(err);
                setSavedLikesObj(prevSavedLikesState => {
                    return {
                        ...prevSavedLikesState,
                        error: err
                    }
                })
            })
    }

    return (
        <SavedLikedGiphsContext.Provider value={{
           saveLikes: (likes, token, userId) => saveLikes(likes, token, userId),
           fetchUserLikes: () => {}
        }}>
            {props.children}
        </SavedLikedGiphsContext.Provider>
    );
}