import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux'
import Modal from '../../components/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import GiphItem from './GiphItem/GiphItem';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const giphModal = (props) => {
  const handleLikeInModal = () => {
    const { giphyData, hideModalOnClick } = props;
    if (!giphAlreadyExistsInLikes()) {
      props.saveLikeOnClick(
        {
          'url': giphyData.image_url,
          'id': giphyData.id,
          'title': giphyData.title
        }
      );
    }
    hideModalOnClick();

  }
  const giphAlreadyExistsInLikes = () => {
    const { likedGiphs, giphyData } = props;
    const filterResults = likedGiphs ? likedGiphs.filter(e => e.id === giphyData.id) : [];
    return filterResults.length !== 0;
  }
  return (
    <Aux>
      <Modal
        isVisible={props.showModal}
        closeModal={props.hideModalOnClick}
      >
        <GiphItem
          giphTitle={props.giphyData.title}
          srcUrl={props.giphyData.image_url}
        />
        <hr />
        <Button
          btnType={"Success"}
          clicked={handleLikeInModal}
        >LIKE</Button>
      </Modal>
      <Button btnType={"Success"} clicked={props.showModalOnClick}>GIMME DA GIFS</Button>
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    showModal: state.modal.showModal,
    giphyData: state.modal.giphyData,
    likedGiphs: state.likedGiphs.likedGiphs
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showModalOnClick: () => dispatch(actions.initModal()),
    hideModalOnClick: () => dispatch({ type: actionTypes.HIDE_MODAL }),
    saveLikeOnClick: (payload) => dispatch(actions.saveLikedGiph(payload))
  };
}
//create a dispatch that will change the class to LIKED and also that will "log" the user's like
export default connect(mapStateToProps, mapDispatchToProps)(giphModal);