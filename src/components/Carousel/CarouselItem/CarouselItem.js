import React from 'react';

import classes from './CarouselItem.module.css';

const CarouselItem = (props) => {
    const prettifyTitle = (title = "") => {
        const uppercaseTitle = title.toUpperCase();
        return uppercaseTitle.replace("GIF", "");
    }
    return (
        <React.Fragment>
            <div className={classes.Title} style={props.itemStyle}>{prettifyTitle(props.title)}</div>
            <img 
                className={`${classes.Item} ${classes.Fade}`}
                src={props.src}
                alt={props.title}
                style={props.itemStyle}
            />
        </React.Fragment>
    );
}

export default CarouselItem