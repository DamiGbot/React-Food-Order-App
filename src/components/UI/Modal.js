import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { DisplayModalContext } from "../../store/DisplayModalContext";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
	const context = useContext(DisplayModalContext);

	return <div onClick={context.onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
	return (
		<>
			<div className={classes.modal}>
				<div className={classes.content}>{props.children}</div>
			</div>
		</>
	);
};

const elementContainer = document.getElementById("overlays-root");

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, elementContainer)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				elementContainer
			)}
			;
		</>
	);
};

export default Modal;
