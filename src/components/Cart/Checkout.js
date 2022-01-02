import React, { useContext } from "react";

import useInput from "../../hooks/use-input";
import { DisplayModalContext } from "../../store/DisplayModalContext";

import classes from "./Checkout.module.css";

const inputClasses = (data) => {
	return data ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
};

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
	const displayContext = useContext(DisplayModalContext);
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueBlurHandler: nameBlurHandler,
		valueChangedHandler: nameChangedHandler,
		reset: resetName,
	} = useInput(isNotEmpty);

	const {
		value: enteredStreet,
		isValid: streetIsValid,
		hasError: streetHasError,
		valueBlurHandler: streetBlurHandler,
		valueChangedHandler: streetChangedHandler,
		reset: resetStreet,
	} = useInput(isNotEmpty);

	const {
		value: enteredPostalCode,
		isValid: postalCodeIsValid,
		hasError: postalCodeHasError,
		valueBlurHandler: postalCodeBlurHandler,
		valueChangedHandler: postalCodeChangedHandler,
		reset: resetPostalCode,
	} = useInput(isFiveChars);

	const {
		value: enteredCity,
		isValid: cityIsValid,
		hasError: cityHasError,
		valueBlurHandler: cityBlurHandler,
		valueChangedHandler: cityChangedHandler,
		reset: resetCity,
	} = useInput(isNotEmpty);

	let formIsValid = false;

	if (nameIsValid && postalCodeIsValid && cityIsValid && streetIsValid) {
		formIsValid = true;
	}

	const inputDetails = {
		name: enteredName,
		city: enteredCity,
		street: enteredStreet,
		postalCode: enteredPostalCode,
	};

	const formSubmittingHandler = (e) => {
		e.preventDefault();

		props.onConfirm(inputDetails);

		resetName();
		resetPostalCode();
		resetCity();
		resetStreet();
	};

	return (
		<form className={classes.form} onSubmit={formSubmittingHandler}>
			<div className={inputClasses(nameHasError)}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameHasError && (
					<p className={classes.error}>Please enter a valid name</p>
				)}
			</div>

			<div className={inputClasses(streetHasError)}>
				<label htmlFor="street">Street</label>
				<input
					type="text"
					id="street"
					onChange={streetChangedHandler}
					onBlur={streetBlurHandler}
					value={enteredStreet}
				/>
				{streetHasError && (
					<p className={classes.error}>Please enter a valid Street</p>
				)}
			</div>

			<div className={inputClasses(postalCodeHasError)}>
				<label htmlFor="postal">Postal Code</label>
				<input
					type="text"
					id="postal"
					onChange={postalCodeChangedHandler}
					onBlur={postalCodeBlurHandler}
					value={enteredPostalCode}
				/>
				{postalCodeHasError && (
					<p className={classes.error}>
						Please enter a valid Postal Code (5 Characters long)
					</p>
				)}
			</div>

			<div className={inputClasses(cityHasError)}>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					onChange={cityChangedHandler}
					onBlur={cityBlurHandler}
					value={enteredCity}
				/>
				{cityHasError && (
					<p className={classes.error}>Please enter a valid city</p>
				)}
			</div>

			<div className={classes.actions}>
				<button type="button" onClick={displayContext.onClose}>
					Cancel
				</button>
				<button className={classes.submit} disabled={!formIsValid}>
					Confirm
				</button>
			</div>
		</form>
	);
};

export default Checkout;
