import React, { useState } from "react";
import Cart from "../components/Cart/Cart";

import { DisplayModalContext } from "./DisplayModalContext";

const DisplayModalProvider = (props) => {
	const [showCart, setShowCart] = useState(false);

	const showCartHandler = () => {
		setShowCart((prevState) => {
			return !prevState;
		});
	};

	return (
		<DisplayModalContext.Provider value={{ onModal: showCartHandler }}>
			{showCart && <Cart />}
			{props.children}
		</DisplayModalContext.Provider>
	);
};

export default DisplayModalProvider;
