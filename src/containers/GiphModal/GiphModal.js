import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Aux'
import Modal from '../../components/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import GiphItem from './GiphItem/GiphItem';
import * as actionTypes from '../../reactStore/actionTypes';
import { animeAxios } from '../../axios-giphy';
import * as creds from '../../creds';


const giphModal = (props) => {
  const [isOpen, setOpenState] = useState(false);
  const [modalGiphObj, setModalGiphObj] = useState({});

  useEffect(() => {
    if(Object.keys(modalGiphObj).length) {
      setOpenState(true);
    }
  }, [modalGiphObj]);
  const fetchGiphy = () => {
    animeAxios.get('/gifs/random?', {
      params: {
        api_key: creds.giphyKey,
        tag: 'anime',
        rating: 'R'
      }
    })
      .then(response => {
        console.log(response)
        const { data } = response.data;
        setModalGiphObj(data);
      })
      .catch(error => {
        console.error(error)
      })
  }
  
  const closeModal = () => {
    setOpenState(false);
    if(Object.keys(modalGiphObj).length) {
      setModalGiphObj({});
    }
  }
  
  const handleLikeInModal = () => {
    const { savedLikedDispatch} = props;
    if (!giphAlreadyExistsInLikes()) {
      savedLikedDispatch({
        type: actionTypes.SAVE_LIKE,
        like:{
          'url': modalGiphObj.image_url,
          'id': modalGiphObj.id,
          'title': modalGiphObj.title
        }
      });
    }
    closeModal();
  }

  const giphAlreadyExistsInLikes = () => {
    const { savedLikedState } = props;
    const filterResults = savedLikedState.likedGiphs ? savedLikedState.likedGiphs.filter(e => e.id === modalGiphObj.id) : [];

    return filterResults.length !== 0;
  }
  
  return (
    <Aux>
      <Modal
        isVisible={isOpen}
        closeModal={closeModal}
      >
        <GiphItem
          giphTitle={modalGiphObj ? modalGiphObj.title : null}
          srcUrl={modalGiphObj ? modalGiphObj.image_url : null}
        />
        <hr />
        <Button
          btnType={"Success"}
          clicked={handleLikeInModal}
        >LIKE</Button>
      </Modal>
      <Button btnType={"Success"} clicked={fetchGiphy}>GIMME DA GIFS</Button>
    </Aux>
  );
}

export default giphModal;