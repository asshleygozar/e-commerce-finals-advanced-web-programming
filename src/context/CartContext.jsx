import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContextValue';

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = product => {
		setCartItems(currentItems => {
			const existingItem = currentItems.find(item => item.id === product.id);

			if (existingItem) {
				return currentItems.map(item =>
					item.id === product.id
						? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
						: item,
				);
			}

			return [...currentItems, { ...product, quantity: 1 }];
		});
	};

	const updateQuantity = (productId, quantity) => {
		setCartItems(currentItems =>
			currentItems.map(item =>
				item.id === productId
					? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
					: item,
			),
		);
	};

	const removeFromCart = productId => {
		setCartItems(currentItems =>
			currentItems.filter(item => item.id !== productId),
		);
	};

	const clearCart = () => setCartItems([]);

	const totalItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	const value = useMemo(
		() => ({
			cartItems,
			addToCart,
			updateQuantity,
			removeFromCart,
			clearCart,
			totalItems,
		}),
		[cartItems, totalItems],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
