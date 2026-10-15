import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../redux/CartSlice';
import { Sprout, ShoppingCart, Home, Leaf } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="shared-navbar">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" title="Paradise Nursery Home">
          <div className="brand-icon-wrapper">
            <Sprout className="brand-icon" size={26} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Paradise Nursery</span>
            <span className="brand-tagline">Where Greenery Meets Serenity</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            id="nav-home"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link
            to="/plants"
            className={`nav-link ${location.pathname === '/plants' ? 'active' : ''}`}
            id="nav-plants"
          >
            <Leaf size={18} />
            <span>Plants</span>
          </Link>

          <Link
            to="/cart"
            className={`nav-link cart-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
            id="nav-cart"
            aria-label={`Shopping cart with ${totalQuantity} items`}
          >
            <div className="cart-icon-container">
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="cart-badge" id="cart-count-badge">
                  {totalQuantity}
                </span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
