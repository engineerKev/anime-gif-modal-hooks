import React, { useState, useCallback } from 'react';

import CarouselItem from './CarouselItem/CarouselItem';
import classes from './Carousel.module.css'

const testData = [
    {
        "id": "Xh2NX0GGpSDWU",
        "title": "japanese dinner GIF",
        "url": "https://media0.giphy.com/media/Xh2NX0GGpSDWU/giphy.gif"
    },
    {
        "id": "55JcfWFM5u8y4",
        "title": "studio ghibli GIF",
        "url": "https://media2.giphy.com/media/55JcfWFM5u8y4/giphy.gif"
    },
    {
        "id": "oktW1eBGpHOoM",
        "title": "studio ghibli spirit GIF",
        "url": "https://media0.giphy.com/media/oktW1eBGpHOoM/giphy.gif"
    },
    {
        "id": "X5HzwMAgjBLWM",
        "title": "bleach GIF",
        "url": "https://media0.giphy.com/media/X5HzwMAgjBLWM/giphy.gif"
    },
    {
        "id": "10ZuedtImbopos",
        "title": "cowboy bebop gun GIF",
        "url": "https://media0.giphy.com/media/10ZuedtImbopos/giphy.gif"
    },
    {
        "id": "CsYky4zTeSrew",
        "title": "fullmetal alchemist GIF",
        "url": "https://media3.giphy.com/media/CsYky4zTeSrew/giphy.gif"
    },
    {
        "id": "jsOU42Wmd7Vfy",
        "title": "hayao miyazaki GIF",
        "url": "https://media0.giphy.com/media/jsOU42Wmd7Vfy/giphy.gif"
    },
    {
        "id": "TTedQxhzd5T4A",
        "title": "studio ghibli flowers GIF",
        "url": "https://media1.giphy.com/media/TTedQxhzd5T4A/giphy.gif"
    },
    {
        "id": "4QTRR1Dhxp3zi",
        "title": "studio ghibli GIF",
        "url": "https://media3.giphy.com/media/4QTRR1Dhxp3zi/giphy.gif"
    },
    {
        "id": "La9mIgaoqh6q4",
        "title": "mecha GIF",
        "url": "https://media2.giphy.com/media/La9mIgaoqh6q4/giphy.gif"
    }
]
// STILL NEED TO HANDLE THE ACTUAL USER LIKES AND GET RID OF THE TEST DATA
const Carousel = (props) => {
    const [currentActiveIndex, setActiveIndex ] = useState(0);

    const itemStyle = useCallback((elemIndex) => (elemIndex === currentActiveIndex ? {display: "block"} : {display: "none"}), [currentActiveIndex]);

    const leftArrowClick = () => {
        let newActiveIndex = currentActiveIndex - 1;
        newActiveIndex = newActiveIndex < 0 ? testData.length - 1 : newActiveIndex;
        setActiveIndex(newActiveIndex);
    };

    const rightArrowClick = () => {
        let newActiveIndex = currentActiveIndex + 1;
        newActiveIndex = newActiveIndex >= testData.length ? 0 : newActiveIndex;
        setActiveIndex(newActiveIndex);
    };
    return(
        <React.Fragment>
            <div className={classes.Container}>
                {testData.map((testObj, i) => {
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
        </React.Fragment>
    );
}

export default Carousel