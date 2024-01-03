import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {CartDropdownContainer, EmptyMessage, CartItems} from'./cart-dropdown.styles.jsx';
import Button from "../button/button.components";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }
    
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) :
                    (<EmptyMessage>
                        Your Cart is Empty
                    </EmptyMessage>)
                }
                
            </CartItems>
                <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown