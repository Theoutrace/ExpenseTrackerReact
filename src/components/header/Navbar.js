import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Store/auth/auth-context";
import iconHeader from './navimage/iconsmoney.png'
import "./Navbar.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div className="navbar-component-container">
      <div className="app-logo-heading"><img src={iconHeader} alt="logo" width='25px'/>Kharchila</div>
      <div>
        <NavLink to='/home' className={(status)=> status.isActive? 'nav-menu-active': 'nav-menu-not-active'}>Home</NavLink>
        <NavLink to='/products' className={(status)=> status.isActive? 'nav-menu-active': 'nav-menu-not-active'}>Products</NavLink>
        <NavLink to='/about' className={(status)=> status.isActive? 'nav-menu-active': 'nav-menu-not-active'}>About Us</NavLink>
        {!authCtx.isLoggedIn && <NavLink to='/login' ><button className='sign-in-btn-navbar'>Sign In</button></NavLink>}
      </div>
    </div>
  );
};

export default Navbar;
