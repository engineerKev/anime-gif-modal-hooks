import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    const modalIsVisible = () => {
        if(props.isVisible) {
            return classes.Visible;
        } else {
            return '';
        }
    }
    return (
        <Aux>
            <Backdrop show={props.isVisible} clicked={props.closeModal}/>
            <div className={classes.Modal+" "+modalIsVisible()}>
                    {props.children}
            </div>
        </Aux>
    );
};

export default modal;
//export default Modal;