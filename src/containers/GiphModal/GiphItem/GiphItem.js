import React from 'react';

import Aux from '../../../hoc/Aux';

import classes from './GiphItem.module.css';

const giphItem = (props) => {
    const prettifyTitle = (title = "") => {
        const lowercaseTitle = title.toLowerCase();
        return lowercaseTitle.replace("gif", "");
    }
    return (
        <Aux>
            <h1>{prettifyTitle(props.giphTitle)}</h1>
            <img src={props.srcUrl} className={classes.GiphItemImg} alt={props.giphTitle}/>
        </Aux>
    );
}
export default giphItem