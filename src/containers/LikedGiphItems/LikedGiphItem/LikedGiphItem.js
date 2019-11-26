import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../../components/UI/Button/Button';
import classes from './LikedGiphItem.module.css'

const likedGiphItem = (props) =>{
    const prettifyTitle = (title = "") => {
        const lowercaseTitle = title.toLowerCase();
        return lowercaseTitle.replace("gif", "");
    }
    return (
        <Aux>
            <div className={classes.GiphItemContainer}>
                <h3>{prettifyTitle(props.title)}</h3>
                <img className={classes.GiphItem} src={props.dataUrl} alt="favorite giphy gif" />
                <hr/>
                <Button btnType="Danger" clicked={() => props.unlikedGiph(props.dataUrl)}>Unlike</Button>
            </div>
        </Aux>

    );
}; 

export default likedGiphItem;