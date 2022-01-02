import { useReducer } from "react";

const defaultValue = {
	value: "",
	isTouched: false,
};

const inputReducer = (state, action) => {
	if (action.type === "CHANGE") {
		return { value: action.val, isTouched: state.isTouched };
	}

	if (action.type === "BLUR") {
		return { value: state.value, isTouched: true };
	}
	return defaultValue;
};

const useInput = (validateInput) => {
	const [inputState, dispatchInputFn] = useReducer(inputReducer, defaultValue);

	const enteredValueIsValid = validateInput(inputState.value);
	const hasError = !enteredValueIsValid && inputState.isTouched;

	const valueChangedHandler = (e) => {
		dispatchInputFn({ type: "CHANGE", val: e.target.value });
	};

	const valueBlurHandler = (e) => {
		dispatchInputFn({ type: "BLUR" });
	};

	const reset = () => {
		dispatchInputFn({});
	};

	return {
		value: inputState.value,
		isValid: enteredValueIsValid,
		isTouched: inputState.isTouched,
		hasError,
		valueBlurHandler,
		valueChangedHandler,
		reset,
	};
};

export default useInput;
