import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

	const [formInputsValidity, setFormInputsValidity] = useState({
		nameIsValid: true,
		streetIsValid: true,
		postalIsValid: true,
		cityIsValid: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();


	const confirmHandler = (event) => {
		event.preventDefault();
		const entredName = nameInputRef.current.value;
		const entredStreet = streetInputRef.current.value;
		const entredPostal = postalInputRef.current.value;
		const entredCity = cityInputRef.current.value;

		const nameIsValid = !isEmpty(entredName);
		const streetIsValid = !isEmpty(entredStreet);
		const postalIsValid = isFiveChars(entredPostal);
		const cityIsValid = !isEmpty(entredCity);

		setFormInputsValidity({
			nameIsValid: nameIsValid,
			streetIsValid: streetIsValid,
			postalIsValid: postalIsValid,
			cityIsValid: cityIsValid,
		});

		const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

		if (!formIsValid) {
			return;
		}

		console.log("submitting form")

		//send data to Cart Component
		props.onConfirm({
			name: entredName,
			street: entredStreet,
			postal: entredPostal,
			city: entredCity,
		});

	};


	const nameControlClasses = `${classes.control} ${formInputsValidity.nameIsValid ? '' : classes.invalid
		}`;
	const streetControlClasses = `${classes.control} ${formInputsValidity.streetIsValid ? '' : classes.invalid
		}`;
	const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalIsValid ? '' : classes.invalid
		}`;
	const cityControlClasses = `${classes.control} ${formInputsValidity.cityIsValid ? '' : classes.invalid
		}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formInputsValidity.nameIsValid && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formInputsValidity.streetIsValid && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalInputRef} />
				{!formInputsValidity.postalIsValid && (
					<p>Please enter a valid postal code (5 characters long)!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formInputsValidity.cityIsValid && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};
export default Checkout;