import React, { useReducer } from 'react';
import CartContext from './cart.context';

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		console.log({
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		})

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		console.log({
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		})
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		};
	}
	if (action.type === 'CLEAR') {
		return {
			items: [],
			totalAmount: 0
		}
	}
}

const CartProvider = props => {
	const [cartState, dispatchCart] = useReducer(cartReducer, { items: [], totalAmount: 0 });

	const addItemToCartHandler = meal => {
		dispatchCart({ type: "ADD", item: meal })
	};

	const removeItemToCartHandler = id => {
		dispatchCart({ type: "REMOVE", id: id })

	};

	const clearCartHandler = () => {
		dispatchCart({ type: "CLEAR" })
	}


	const cartContext = {
		totaAmount: +cartState.totalAmount,
		items: cartState.items,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
		clearCart: clearCartHandler
	}

	return (
		<CartContext.Provider
			value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartProvider