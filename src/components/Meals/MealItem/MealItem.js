import React, { useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm/MealItemForm';
import CartContext from '../../../store/cart.context';

const MealItem = (props) => {
	const cartCtx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`

	const onAddTocartHandler = (amount) => {
		console.log(props.id, amount)
		cartCtx.addItem({ id: props.id, amount: amount, price: props.price, name: props.name });
	}

	return (
		<li className={classes.meal}>
			<div>
				<h3> {props.name}</h3>
				<div className={classes.desciption}>
					{props.description}
				</div>
				<div className={classes.price}>
					{price}
				</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddTocart={onAddTocartHandler} />
			</div>
		</li>
	)
}

export default MealItem