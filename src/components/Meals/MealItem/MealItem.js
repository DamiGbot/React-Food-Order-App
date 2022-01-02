import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";
import { CartContext } from "../../../store/CartContext";

const MealItem = (props) => {
	const cartContext = useContext(CartContext);

	const price = `$${props.meal.price.toFixed(2)}`;

	const AddToCartHandler = (amount) => {
		cartContext.addItem({
			id: props.meal.id,
			name: props.meal.name,
			amount: amount,
			price: props.meal.price,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.meal.name}</h3>
				<div className={classes.description}>{props.meal.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.meal.id} onAddToCart={AddToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
