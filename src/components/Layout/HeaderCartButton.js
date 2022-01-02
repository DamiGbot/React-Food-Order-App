import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/CartContext";
import { DisplayModalContext } from "../../store/DisplayModalContext";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const modalContext = useContext(DisplayModalContext);
	const cartContext = useContext(CartContext);

	const { items } = cartContext;

	const numberOfCartItems = cartContext.items.reduce((prevVal, currVal) => {
		return prevVal + currVal.amount;
	}, 0);

	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button onClick={modalContext.onOpen} className={btnClasses}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
