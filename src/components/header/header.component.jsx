import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg.svg';

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/conatct'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : ( 
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon/>
        </div>
            {hidden ? null : <CartDropdown />}
    </div>
);

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);





// import React from 'react';

// import { connect } from 'react-redux';

// import { ReactComponent as Logo } from '../../assets/crown.svg.svg';

// import { Link } from 'react-router-dom'

// import { auth } from '../../firebase/firebase.utils';

// import CartIcon from '../cart-icon/cart-icon.component';

// import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// import './header.styles.scss';

// const Header = ({currentUser, hidden}) => (
//     <div className='header'>
//         <Link className='logo-container' to='/'>
//             <Logo className='logo'/>
//         </Link>
//         <div className='options'>
//         <Link className='option' to='/shop'>
//             SHOP            
//         </Link>
//         <Link className='option' to='/contact'>
//             CONTACT            
//         </Link>
//         {currentUser ? (
//             <div className='option' onClick={() => auth.signOut()}>
//                 SIGN OUT
//             </div>
//         ) : (
//             <Link className='option' to='/signin'>
//                 SIGN IN
//             </Link>
//         )}
//         <CartIcon />
//         </div>
//         {hidden ? null : <CartDropdown />}
//     </div>
// );

// const mapStateToProps = ({user: {currentUser}}) => ({
//     currentUser
// });

// export default connect(mapStateToProps)(Header);