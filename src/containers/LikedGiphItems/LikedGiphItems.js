import React from 'react';

import LikedGiphItem from './LikedGiphItem/LikedGiphItem';

const likedGifItems = (props) => {
    return (
       props.likedGiphs.map(giphyObj => {
           return (
               <LikedGiphItem title={giphyObj.title} key={giphyObj.id} dataUrl={giphyObj.url} unlikedGiph={props.unlike}/>
           )
       }) 
    );
};

export default likedGifItems;