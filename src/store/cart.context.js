import React from "react";

const CartContext = React.createContext({
	totaAmount: 0,
	items: [],
	addItem: (item) => { },
	removeItem: (id) => { },
	// fuction to clear the cart
	clearCart: () => { }
})

export default CartContext;