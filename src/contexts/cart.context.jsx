import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeProductFromCart = (cartItems, productToRemove) => {
        const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
        //if quantity is at 1 and user hits dec button, remove the cart item
        if(existingCartItem.quantity === 1) {
            return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
        }
        // if quantity is above 1 and user hits dec button, dec quantity
        return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
}

const btnToRemoveCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    removeItemFromCartButton: () => {},
    total: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    },[cartItems])

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeProductFromCart(cartItems, productToRemove))
    }

    const removeItemFromCartButton = (productToRemove) => {
        setCartItems(btnToRemoveCartItem(cartItems, productToRemove))
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        removeItemFromCartButton, 
        cartItems, 
        cartCount,
        cartTotal
    }
    return(
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}