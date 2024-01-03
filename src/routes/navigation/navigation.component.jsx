import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import {ReactComponent as CustomLogo} from '../../assets/crown.svg';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from'./navigation.styles';
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    return (
        <Fragment>
          <NavigationContainer>
            <LogoContainer to='/'>
              <CustomLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                  currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>)
                    : ( 
                  <NavLink to='/auth'>
                      Sign In
                  </NavLink>
                  )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
          </NavigationContainer>
          <Outlet />
        </Fragment>
    )
  }

export default Navigation;  