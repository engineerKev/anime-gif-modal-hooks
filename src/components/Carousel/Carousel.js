import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import CarouselItem from './CarouselItem/CarouselItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Carousel.module.css'

const Carousel = (props) => {
    const { authData } = useContext(AuthContext);
    const { userId: userIdHooks, token: tokenHooks }  = authData;
    const [ currentActiveIndex, setActiveIndex ] = useState(0);
    const { savedLikesState, fetchUserLikes  } = props
    const { likedGiphs, hasLikes, fetchedSavedLikes, isLoading} = savedLikesState;

    useEffect(() => {
        const {fetchedSavedLikes: fetchedSavedLikesHooks} = props.savedLikesState;
        if (!fetchedSavedLikesHooks) {
            fetchUserLikes(tokenHooks, userIdHooks);
        }
    }, [savedLikesState.fetchedSavedLikes]);
    
    const itemStyle = useCallback((elemIndex) => (elemIndex === currentActiveIndex ? {display: "block"} : {display: "none"}), [currentActiveIndex]);

    const leftArrowClick = () => {
        let newActiveIndex = currentActiveIndex - 1;
        newActiveIndex = newActiveIndex < 0 ? likedGiphs.length - 1 : newActiveIndex;
        setActiveIndex(newActiveIndex);
    };

    const rightArrowClick = () => {
        let newActiveIndex = currentActiveIndex + 1;
        newActiveIndex = newActiveIndex >= likedGiphs.length ? 0 : newActiveIndex;
        setActiveIndex(newActiveIndex);
    };

    const componentContent = () => {
        if(hasLikes || fetchedSavedLikes || userIdHooks) {
            return (isLoading ? <Spinner /> 
                :
                <React.Fragment>
                    <div className={classes.Container}>
                        {likedGiphs.map((testObj, i) => {
                            return (
                                <CarouselItem
                                    title={testObj.title}
                                    src={testObj.url}
                                    key={`${testObj.id}_${i}`}
                                    itemStyle={itemStyle(i)}
                                />
                            )
                        })}
                        <button type="button" className={classes.Left} onClick={leftArrowClick}>&#10094;</button>
                        <button type="button" className={classes.Right} onClick={rightArrowClick}>&#10095;</button>
                    </div>
                </React.Fragment>);
        } else {
            return <Redirect to="/" />
        }
    }
    return componentContent();
}

export default Carousel