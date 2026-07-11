import React, { createContext, useState, useEffect, useContext } from 'react';

// Initialize the Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Load initial state from LocalStorage safely
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('healthcare_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. Sync with LocalStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('healthcare_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 3. Action: Add Item to Cart
    const addToCart = (medicine, quantity = 1) => {
        setCartItems((prevItems) => {
            const isExisting = prevItems.find(item => item._id === medicine._id);
            
            if (isExisting) {
                // Check stock boundary constraints if provided by database
                const updatedQuantity = isExisting.quantity + quantity;
                if (medicine.stock && updatedQuantity > medicine.stock) {
                    alert(`Sorry, only ${medicine.stock} items available in stock.`);
                    return prevItems;
                }
                
                return prevItems.map(item =>
                    item._id === medicine._id
                        ? { ...item, quantity: updatedQuantity }
                        : item
                );
            }
            
            return [...prevItems, { ...medicine, quantity }];
        });
    };

    // 4. Action: Remove Specific Item
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
    };

    // 5. Action: Update Quantity directly (e.g., from input or +/- counters)
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item._id === id ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    // 6. Action: Reset/Clear Cart after checkout completion
    const clearCart = () => {
        setCartItems([]);
    };

    // 7. Core Analytics: Live mathematical calculation parameters
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook wrapper for high-level clean access syntax across modules
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside a CartProvider workflow context');
    }
    return context;
};