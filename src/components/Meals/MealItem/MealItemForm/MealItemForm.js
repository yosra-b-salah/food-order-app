import React, { useRef, useState } from 'react'

import Input from '../../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	const [isValid, setIsValid] = useState(true);
	const amountInputRef = useRef();

	const formSubmitHandler = (event) => {
		event.preventDefault();

		let amount = amountInputRef.current.value;

		let amountNumber = +amount;
		if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
			setIsValid(false);
			return;
		}
		props.onAddTocart(amountNumber)

	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<Input
				ref={amountInputRef}
				label='Amount'
				isValid={isValid}
				input={
					{
						type: 'number',
						id: `amount_${props.id}`,
						min: '1',
						max: '5',
						step: '1',
						defaultValue: '1'
					}
				} />
			<button type='submit'>+ Add </button>
			{!isValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	)
}

export default MealItemForm