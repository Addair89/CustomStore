import React from "react";
import './cart-dropdown.styles.scss';
import Button from "../button/button.components";

const CartDropdown = () => {
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown