//Overlay for When we want to edit on Map

import React from "react";
import ReactDOM  from "react-dom";

import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

import './Modal.css';

const ModalOverlay= (props)=>{
    const content =(
        <div className={`modal ${props.className}`} style={props.style} >
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit?props.onSubmit:event =>event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(content,document.getElementById('modal-hook'));
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel}/>}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
                <ModalOverlay {...props}/>{/*The Spread Operator is used to forward the props received in Modal to ModalOverLay */}
            </CSSTransition>
        </React.Fragment>
    );
};
//Anything between CSSTransition is animated and if the in attribute is false then anything inside CSSTransition does not show up

export default Modal;