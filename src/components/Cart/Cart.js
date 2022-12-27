import React, { Fragment, useContext, useState } from 'react'
import Modal from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart.context'
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/useHttp';

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false);
	const { error, sendRequest: addOrderApi } = useHttp();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	let hasItems = cartCtx.items.length > 0
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const orderNowHandler = () => {
		setIsCheckout(true);
	}
	const confirmOrderHandler = orderData => {
		setIsSubmitting(true);
		console.log(orderData);
		addOrderApi({
			url: 'https://learn-react-c35a1-default-rtdb.firebaseio.com/orders.json',
			method: 'POST',
			body: {
				user: orderData,
				orderedItems: cartCtx.items
			}
		}).then(() => {
			setIsSubmitting(false);
			setDidSubmit(true);

		});
		cartCtx.clearCart();
	}
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

	const modalActions = <div className={classes.actions}>
		<button className={classes['button--alt']} onClick={props.onClose}> Close</button>
		{hasItems && <button className={classes.button} onClick={orderNowHandler}>Order</button>}
	</div>

	const cartModalContent =
		<Fragment>
			{cartItems}
			<div className={classes['total']}>
				<span> Total amount</span>
				<span> {cartCtx.totaAmount.toFixed(2)} </span>
			</div>

			{isCheckout && <Checkout onCancel={props.onClose} onConfirm={confirmOrderHandler} />}
			{!isCheckout && modalActions}
		</Fragment>

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const errorModalContent =
		<Fragment>
			<p>{error}</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</Fragment>


	const didSubmitModalContent = (
		<Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</Fragment>
	);



	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && !error && cartModalContent}
			{isSubmitting && !error && isSubmittingModalContent}
			{!isSubmitting && didSubmit && !error && didSubmitModalContent}
			{error && errorModalContent}
		</Modal>
	);
}

export default Cart