import React, { useContext } from 'react'
import Modal from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart.context'
import CartItem from './CartItem'
const Cart = props => {
	const cartCtx = useContext(CartContext);
	console.log(cartCtx)
	let hasItems = cartCtx.items.length > 0
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItems =

		<ul className={classes['cart-items']}>
			{
				cartCtx.items
					.map(item => <CartItem
						onRemove={cartItemRemoveHandler.bind(null, item.id)}
						onAdd={cartItemAddHandler.bind(null, item)}
						item={item}
					/>)
			}
		</ul>

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes['total']}>
				<span> Total amount</span>
				<span> {cartCtx.totaAmount.toFixed(2)} </span>
			</div>
			<div className={classes['actions']}>
				<button className={classes['button--alt']} onClick={props.onClose}> Close</button>
				{hasItems && <button className={classes.button}>Order</button>}

			</div>

		</Modal>
	)
}

export default Cart