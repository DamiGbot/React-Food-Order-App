import React, { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { DisplayModalContext } from "../../store/DisplayModalContext";

import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
	const context = useContext(DisplayModalContext);
	const cartContext = useContext(CartContext);

	const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
	const hasItem = cartContext.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartContext.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartContext.addItem({ ...item, amount: 1 });
	};

	const cartItems = cartContext.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			price={item.price}
			amount={item.amount}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	return (
		<Modal>
			<ul className={classes["cart-items"]}>{cartItems}</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button onClick={context.onModal} className={classes["button--alt"]}>
					Close
				</button>
				{hasItem && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
