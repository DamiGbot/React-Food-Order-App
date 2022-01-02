import React, { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
	const [isAmountValid, setIsAmountValid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setIsAmountValid(false);
			return;
		}
		setIsAmountValid(true);
		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<Input
				label="Amount"
				ref={amountInputRef}
				input={{
					id: `amount_${props.id}`,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
