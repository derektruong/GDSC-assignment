import { useState, useContext } from 'react';
import FormContext from '../store/form-context';

const useForm = (validateValue, defaultValue, type, index) => {
	const [enteredValue, setEnteredValue] = useState(defaultValue);
	const [isTouch, setIsTouch] = useState(false);
	const ctx = useContext(FormContext);

	const isValueValid = validateValue(enteredValue);
	const hasError = !isValueValid && isTouch;

	const valueBlurHandler = (event) => {
		setIsTouch(true);
	}

	const valueChangeHandler = (event) => {
		if (type === 'RADIO') {
			setEnteredValue(event);
			ctx.setValueByIndex(index, event);
		} else {
			setEnteredValue(event.target.value);
			ctx.setValueByIndex(index, event.target.value);
		}
		
	}

	const reset = () => {
		setEnteredValue('');
		setIsTouch(false);
	}

	return {
		value: enteredValue,
		isValid: isValueValid,
		hasError,
		valueBlurHandler,
		valueChangeHandler,
		reset,
	}
}

export default useForm;