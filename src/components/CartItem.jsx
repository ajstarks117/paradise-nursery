import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
} from '../redux/CartSlice';
import { formatINR } from '../data/plantsData';
import Navbar from './Navbar';
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  X,
} from 'lucide-react';

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Fallback SVG data URI if external image fails to load
  const fallbackSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23e8f5e9"><rect width="100%" height="100%" fill="%23e8f5e9"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%232e7d32">🌿</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%232e7d32" font-weight="bold">Paradise Nursery Plant</text></svg>';

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleContinueShopping = () => {
    navigate('/plants');
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  return (
    <div className="cart-page">
      {/* Shared Navbar */}
      <Navbar />

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal-backdrop" onClick={() => setShowCheckoutModal(false)}>
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowCheckoutModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="modal-icon-wrapper">
              <Sparkles size={36} className="modal-icon" />
            </div>
            <h2 id="modal-title" className="modal-title">
              Checkout Coming Soon!
            </h2>
            <p className="modal-text">
              Thank you for choosing <strong>Paradise Nursery</strong>. Our secure online checkout
              system is currently undergoing scheduled enhancements and will be active very soon!
            </p>
            <div className="modal-summary-box">
              <div className="modal-summary-row">
                <span>Total Items:</span>
                <strong>{totalQuantity} plants</strong>
              </div>
              <div className="modal-summary-row">
                <span>Order Total:</span>
                <strong>{formatINR(totalAmount)}</strong>
              </div>
            </div>
            <button
              className="modal-action-btn"
              onClick={() => setShowCheckoutModal(false)}
            >
              Got it, keep browsing
            </button>
          </div>
        </div>
      )}

      <main className="cart-container">
        {/* Cart Title Banner */}
        <div className="cart-header-banner">
          <div>
            <h1 className="cart-page-title">Shopping Cart</h1>
            <p className="cart-page-subtitle">
              Review your botanical selections and proceed to greener living.
            </p>
          </div>
          <div className="cart-stats-badge">
            <span>{totalQuantity} {totalQuantity === 1 ? 'Plant' : 'Plants'} in Cart</span>
          </div>
        </div>

        {/* Empty Cart View */}
        {cartItems.length === 0 ? (
          <div className="empty-cart-state" id="empty-cart-view">
            <div className="empty-cart-icon-wrapper">
              <ShoppingBag size={54} className="empty-cart-icon" />
            </div>
            <h2>Your Cart is Currently Empty</h2>
            <p>
              Looks like you haven't added any botanical companions to your space yet.
              Explore our diverse collection of lush indoor plants, outdoor flowering shrubs,
              and sun-loving succulents!
            </p>
            <button
              type="button"
              className="explore-plants-btn"
              onClick={handleContinueShopping}
              id="empty-cart-browse-btn"
            >
              <ArrowLeft size={18} />
              <span>Browse Plants Catalog</span>
            </button>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="cart-layout">
            {/* Items List */}
            <section className="cart-items-section">
              <div className="cart-items-header">
                <span>Plant Description</span>
                <span>Unit Price</span>
                <span>Quantity</span>
                <span>Item Subtotal</span>
                <span>Action</span>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const itemSubtotal = item.price * item.quantity;

                  return (
                    <article
                      key={item.id}
                      className="cart-item-card"
                      id={`cart-item-${item.id}`}
                    >
                      {/* Product Thumbnail & Name */}
                      <div className="cart-item-product">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackSvg;
                          }}
                        />
                        <div className="cart-item-details">
                          <h3 className="cart-item-name">{item.name}</h3>
                          <span className="cart-item-category">{item.category}</span>
                          <span className="cart-item-mobile-price">
                            Unit Price: {formatINR(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Unit Price (Desktop) */}
                      <div className="cart-item-unit-price">
                        <span className="col-label">Price:</span>
                        <span className="price-val">{formatINR(item.price)}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="cart-item-quantity-controls">
                        <button
                          type="button"
                          className="qty-btn minus-btn"
                          onClick={() => handleDecrease(item.id)}
                          disabled={item.quantity <= 1}
                          title={
                            item.quantity <= 1
                              ? 'Quantity cannot be less than 1. Use delete to remove.'
                              : 'Decrease quantity'
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                          id={`decrease-btn-${item.id}`}
                        >
                          <Minus size={16} />
                        </button>
                        <span
                          className="qty-display"
                          id={`qty-display-${item.id}`}
                          aria-label={`Current quantity ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="qty-btn plus-btn"
                          onClick={() => handleIncrease(item.id)}
                          title="Increase quantity"
                          aria-label={`Increase quantity of ${item.name}`}
                          id={`increase-btn-${item.id}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="cart-item-subtotal">
                        <span className="col-label">Subtotal:</span>
                        <span className="subtotal-val" id={`subtotal-${item.id}`}>
                          {formatINR(itemSubtotal)}
                        </span>
                      </div>

                      {/* Delete Action */}
                      <div className="cart-item-actions">
                        <button
                          type="button"
                          className="delete-item-btn"
                          onClick={() => handleRemove(item.id)}
                          title={`Remove ${item.name} from cart`}
                          aria-label={`Remove ${item.name} from cart`}
                          id={`delete-btn-${item.id}`}
                        >
                          <Trash2 size={18} />
                          <span className="delete-text">Delete</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="cart-actions-bar">
                <button
                  type="button"
                  className="continue-shopping-btn"
                  onClick={handleContinueShopping}
                  id="continue-shopping-btn"
                >
                  <ArrowLeft size={18} />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </section>

            {/* Cart Summary Card */}
            <aside className="cart-summary-sidebar">
              <div className="cart-summary-card">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span>Total Plants Quantity:</span>
                  <span className="summary-val" id="summary-total-quantity">
                    {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span className="summary-val">{formatINR(totalAmount)}</span>
                </div>

                <div className="summary-row">
                  <span>Eco-Packaging & Care Guide:</span>
                  <span className="summary-val-free">FREE</span>
                </div>

                <div className="summary-row">
                  <span>Green Sanctuary Shipping:</span>
                  <span className="summary-val-free">FREE</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total-row">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-val" id="cart-total-amount">
                    {formatINR(totalAmount)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                  id="checkout-btn"
                >
                  <CreditCard size={18} />
                  <span>Checkout</span>
                </button>

                <button
                  type="button"
                  className="continue-btn-secondary"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>

                <div className="security-note">
                  <ShieldCheck size={16} />
                  <span>100% Secure Transaction & Plant Guarantee</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartItem;
