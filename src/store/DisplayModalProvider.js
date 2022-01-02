import React, { useState } from "react";
import Cart from "../components/Cart/Cart";

import { DisplayModalContext } from "./DisplayModalContext";

const DisplayModalProvider = (props) => {
	const [isModal, setIsModal] = useState(false);

	const showCartHandler = () => {
		setIsModal(true);
	};

	const closeModalHandler = () => {
		setIsModal(false);
	};

	return (
		<DisplayModalContext.Provider
			value={{
				onModal: isModal,
				onOpen: showCartHandler,
				onClose: closeModalHandler,
			}}
		>
			{isModal && <Cart />}
			{props.children}
		</DisplayModalContext.Provider>
	);
};

export default DisplayModalProvider;
