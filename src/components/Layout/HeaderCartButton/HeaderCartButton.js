import React, { useContext, useEffect, useState } from 'react'
import CartIcon from './CartIcon'
import CartContext from '../../../store/cart.context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	let numberOfItems = items.reduce((acc, item) => {
		return acc + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

	useEffect(() => {
		console.log(items.length)
		if (items.length === 0) {
			return;
		}

		setBtnIsHighlighted(true);

		const timer = setTimeout(() => (
			setBtnIsHighlighted(false)
		), 300)

		return () => { clearTimeout(timer) }
	}, [items]);



	return (
		<button
			className={btnClasses}
			onClick={props.onClick}
			onBlur={props.onBlur}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span >Your Cart</span>
			<span className={classes.badge}>{numberOfItems}</span>
		</button>
	)
}

export default HeaderCartButton