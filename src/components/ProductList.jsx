import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../redux/CartSlice';
import { plantsData, plantCategories, formatINR } from '../data/plantsData';
import Navbar from './Navbar';
import { ShoppingCart, Check, Filter, Sparkles, Tag, Shield } from 'lucide-react';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  // Fallback SVG data URI if external image fails to load
  const fallbackSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23e8f5e9"><rect width="100%" height="100%" fill="%23e8f5e9"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%232e7d32">🌿</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%232e7d32" font-weight="bold">Paradise Nursery Plant</text></svg>';

  // Check if an item is already in cart
  const isItemInCart = (plantId) => {
    return cartItems.some((item) => item.id === plantId);
  };

  const handleAddToCart = (plant) => {
    if (!isItemInCart(plant.id)) {
      dispatch(addToCart(plant));
      setToastMessage(`"${plant.name}" added to your cart! 🌿`);
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    }
  };

  // Filter categories according to selection
  const displayedCategories =
    selectedCategory === 'All'
      ? plantCategories
      : plantCategories.filter((cat) => cat === selectedCategory);

  return (
    <div className="product-list-page">
      {/* Shared Navbar */}
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <Check size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <section className="plants-hero-banner">
        <div className="plants-hero-content">
          <span className="banner-pill">Handpicked Botanical Collection</span>
          <h1 className="banner-title">Our Plant Paradise</h1>
          <p className="banner-subtitle">
            Explore {plantsData.length} healthy, sustainably grown plants cultivated to bring vibrant life,
            serenity, and fresh air to your sanctuary.
          </p>

          {/* Category Filter Pills */}
          <div className="category-filters">
            <button
              className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
              id="filter-all"
            >
              <Filter size={15} />
              All Plants ({plantsData.length})
            </button>
            {plantCategories.map((category) => {
              const count = plantsData.filter((p) => p.category === category).length;
              return (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories Sections */}
      <main className="plants-catalog-container">
        {displayedCategories.map((category) => {
          const categoryPlants = plantsData.filter((plant) => plant.category === category);

          return (
            <section
              key={category}
              className="category-section"
              id={`section-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="category-header">
                <div className="category-header-title">
                  <span className="category-leaf-icon">🌱</span>
                  <h2>{category}</h2>
                </div>
                <span className="category-count-badge">
                  {categoryPlants.length} Plants Available
                </span>
              </div>

              {/* Product Cards Grid */}
              <div className="products-grid">
                {categoryPlants.map((plant) => {
                  const added = isItemInCart(plant.id);

                  return (
                    <article key={plant.id} className="plant-card" id={`product-${plant.id}`}>
                      {/* Thumbnail Container */}
                      <div className="plant-image-wrapper">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="plant-thumbnail"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackSvg;
                          }}
                        />
                        {plant.tag && (
                          <span className="plant-tag-badge">
                            <Tag size={12} />
                            {plant.tag}
                          </span>
                        )}
                        <span className="plant-category-tag">{plant.category}</span>
                      </div>

                      {/* Plant Info */}
                      <div className="plant-info">
                        <div className="plant-header-row">
                          <h3 className="plant-name">{plant.name}</h3>
                          <span className="plant-price">{formatINR(plant.price)}</span>
                        </div>

                        {plant.light && (
                          <div className="plant-light-info">
                            <Sparkles size={14} className="light-icon" />
                            <span>{plant.light}</span>
                          </div>
                        )}

                        <p className="plant-description">{plant.description}</p>

                        {/* Add to Cart Button */}
                        <div className="plant-action-row">
                          <button
                            type="button"
                            className={`add-to-cart-btn ${added ? 'added' : ''}`}
                            onClick={() => handleAddToCart(plant)}
                            disabled={added}
                            id={`add-btn-${plant.id}`}
                            aria-label={added ? `${plant.name} is added to cart` : `Add ${plant.name} to cart`}
                          >
                            {added ? (
                              <>
                                <Check size={18} className="btn-icon" />
                                <span>Added to Cart</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={18} className="btn-icon" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* Trust Footer */}
      <footer className="catalog-footer">
        <div className="trust-features">
          <div className="trust-feature">
            <Shield size={20} />
            <span>Nursery Fresh Guarantee</span>
          </div>
          <div className="trust-feature">
            <Sparkles size={20} />
            <span>Eco-Friendly Peat-Free Soil</span>
          </div>
          <div className="trust-feature">
            <ShoppingCart size={20} />
            <span>Safe Contactless Delivery</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
