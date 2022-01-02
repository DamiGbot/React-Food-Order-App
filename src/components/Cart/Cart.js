import React, { useContext, useState } from "react";
import { CartContext } from "../../store/CartContext";
import { DisplayModalContext } from "../../store/DisplayModalContext";

import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [submitError, setSubmitError] = useState("");

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

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userDetails) => {
		try {
			setIsSubmitting(true);
			const response = await fetch(
				"https://react-http-9b75a-default-rtdb.firebaseio.com",
				{
					method: "POST",
					body: JSON.stringify({
						user: userDetails,
						orderedItems: cartContext.items,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Something went wrong");
			}

			setIsSubmitting(false);
			setDidSubmit(true);

			cartContext.clearCart();
		} catch (err) {
			setIsSubmitting(false);
			setSubmitError(err.message);
		}
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

	const modalActions = (
		<div className={classes.actions}>
			<button onClick={context.onClose} className={classes["button--alt"]}>
				Close
			</button>
			{hasItem && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContext = (
		<>
			<ul className={classes["cart-items"]}>{cartItems}</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>

			{isCheckout && <Checkout onConfirm={submitOrderHandler} />}

			{!isCheckout && modalActions}
		</>
	);

	const didSubmitModalContext = (
		<>
			<p>Successfully sent order!</p>
			<div className={classes.actions}>
				<button onClick={context.onClose} className={classes.button}>
					Close
				</button>
			</div>
		</>
	);

	const submitHasError = (
		<>
			<p>{submitError}</p>
			<div className={classes.actions}>
				<button onClick={context.onClose} className={classes.button}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal>
			{submitError && !isSubmitting && submitHasError}
			{!isSubmitting && !didSubmit && !submitError && cartModalContext}
			{isSubmitting && <p>Sending order data...</p>}
			{didSubmit && !isSubmitting && didSubmitModalContext}
		</Modal>
	);
};

export default Cart;
