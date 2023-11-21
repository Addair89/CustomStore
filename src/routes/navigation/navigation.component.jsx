import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import {ReactComponent as CustomLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen,setIsCartOpen } = useContext(CartContext);

    return (
        <Fragment>
          <div className='navigation'>
            <Link className='logo-container' to='/'>
            <CustomLogo className='logo' />
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {
                  currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>Sign Out</span>)
                    : ( 
                  <Link className='nav-link' to='/auth'>
                      Sign In
                  </Link>
                  )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
          </div>
          <Outlet />
        </Fragment>
    )
  }

export default Navigation;  