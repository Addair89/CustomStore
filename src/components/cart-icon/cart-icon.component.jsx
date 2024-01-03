import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';
import {React, useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = () =>{
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggle = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer onClick={toggle}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;