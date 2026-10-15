import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from './redux/CartSlice';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import { Sprout, ShoppingCart, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import './App.css';

// Landing Page Component (Loads at '/')
const LandingPage = () => {
  const navigate = useNavigate();
  const totalQuantity = useSelector(selectTotalQuantity);

  const handleGetStarted = () => {
    navigate('/plants');
  };

  return (
    <div className="landing-page">
      {/* Landing Header / Navbar */}
      <header className="shared-navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon-wrapper">
              <Sprout className="brand-icon" size={26} />
            </div>
            <div className="brand-text">
              <span className="brand-title">Paradise Nursery</span>
              <span className="brand-tagline">Where Greenery Meets Serenity</span>
            </div>
          </Link>

          <nav className="navbar-nav">
            <a href="#about-us" className="nav-link" id="nav-about">
              <span>About Us</span>
            </a>
            <Link to="/plants" className="nav-link" id="nav-plants-landing">
              <Leaf size={18} />
              <span>Shop Plants</span>
            </Link>
            <Link to="/cart" className="nav-link cart-nav-link" id="nav-cart-landing">
              <div className="cart-icon-container">
                <ShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="cart-badge" id="landing-cart-badge">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="cart-text">Cart</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Task 3 & 4: Hero Section with background image in App.css */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-badge">
            <Sprout size={16} /> Welcome to Paradise Nursery
          </span>

          <h1 className="landing-title">
            Breathe Fresh Life Into Your <span>Sanctuary</span>
          </h1>

          <p className="landing-description">
            Welcome to <strong>Paradise Nursery</strong>, your haven for lush houseplants, blooming
            outdoor treasures, and resilient succulents. We believe that living alongside nature
            fosters mindfulness, elevates indoor air quality, and brings natural serenity to
            every corner of your home.
          </p>

          <div className="landing-cta-group">
            {/* Task 4: Prominent Get Started button navigating to /plants */}
            <button
              type="button"
              className="get-started-btn"
              onClick={handleGetStarted}
              id="get-started-btn"
              aria-label="Get Started and shop plants"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>

            {/* Link introducing the company */}
            <a href="#about-us" className="learn-more-btn" id="explore-story-btn">
              <span>Our Story</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Value Highlights */}
      <div className="landing-highlights">
        <div className="highlight-card">
          <div className="highlight-icon">
            <Leaf size={24} />
          </div>
          <div className="highlight-info">
            <h4>Nursery-Grown Quality</h4>
            <p>Every plant is hand-nurtured in peat-free organic potting mix for robust root health.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon">
            <ShieldCheck size={24} />
          </div>
          <div className="highlight-info">
            <h4>Safe Green Transit</h4>
            <p>Custom biodegradable packaging protects stems, leaves, and pots during shipping.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon">
            <Heart size={24} />
          </div>
          <div className="highlight-info">
            <h4>Botanical Care Support</h4>
            <p>Comprehensive watering and light guides included with every single plant adoption.</p>
          </div>
        </div>
      </div>

      {/* Task 2: Embedded AboutUs Component */}
      <AboutUs />

      {/* Landing Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="footer-brand">
            <Sprout size={24} />
            <span>Paradise Nursery</span>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Paradise Nursery. All rights reserved. Cultivating green spaces for a healthier planet.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Main App routing container
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
