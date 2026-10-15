# Paradise Nursery 🌿 — Houseplants & Botanical Shopping Application

A responsive, modern e-commerce web application built with **React**, **Vite**, **Redux Toolkit**, and **React Router**. **Paradise Nursery** connects plant enthusiasts with a curated collection of healthy houseplants, vibrant outdoor greenery, and resilient desert succulents.

---

## 📌 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [Shopping Cart Functionality](#shopping-cart-functionality)
5. [Project Folder Structure](#project-folder-structure)
6. [Installation & Execution](#installation--execution)
7. [Assignment Tasks & Submission Links](#assignment-tasks--submission-links)

---

## 📖 Project Overview
Paradise Nursery offers plant lovers an intuitive, nature-inspired digital storefront to browse and purchase plants. The application features a nature-inspired aesthetic using earthy greens, warm cream tones, high-resolution photography, and fluid responsive layouts.

State management is powered by **Redux Toolkit**, providing seamless real-time synchronization of cart item counts, quantities, unit subtotals, and overall order totals across all views.

---

## ✨ Key Features
- **Nature-Inspired Landing Page:**
  - Full-screen high-resolution conservatory nursery background with an ambient readability overlay.
  - Prominent **Get Started** button leading directly to the plant catalog (`/plants`).
  - Company overview highlighting values, sustainable practices, and customer care.
- **Rich Botanical Catalog (21 Plants across 3 Categories):**
  - **Indoor Plants** (Monstera Deliciosa, Snake Plant, Fiddle Leaf Fig, Peace Lily, ZZ Plant, Golden Pothos, Areca Palm)
  - **Outdoor Plants** (Bougainvillea Royal, Hibiscus Rosa-Sinensis, Arabian Jasmine, Bird of Paradise, Garden Croton, Plumeria Frangipani, Boston Fern)
  - **Succulents & Cacti** (Aloe Vera, Echeveria Elegans, Jade Plant, Golden Barrel Cactus, Zebra Haworthia, String of Pearls, Christmas Cactus)
- **Interactive Product Cards:**
  - Unique plant ID, botanical name, price in Indian Rupees (₹), tags, lighting guides, and descriptions.
  - One-click **Add to Cart** with immediate button state change to **"Added to Cart"** and disabled state to prevent duplicate clicks.
  - Fallback mechanisms for all images to guarantee zero broken images.
- **Synchronized Global Navbar:**
  - Accessible on all shopping pages (Home, Plants, Cart).
  - Dynamic shopping cart badge displaying the total quantity of items in the cart in real time.
- **Comprehensive Shopping Cart (`/cart`):**
  - Displays product thumbnail, name, unit price, quantity controls, and item subtotals.
  - Safe quantity increase and decrease (prevents values below 1).
  - Single-click delete removal.
  - Order summary sidebar with item counts and total amount in INR.
  - **Continue Shopping** button returning to `/plants`.
  - **Checkout** button triggering an interactive "Checkout Coming Soon" modal.
  - User-friendly empty cart state with direct link to browse plants.

---

## 🛠️ Technologies Used
- **Frontend Framework:** React 19 (JavaScript & JSX)
- **Build Tool:** Vite 8
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`) & React Redux (`react-redux`)
- **Client-Side Routing:** React Router DOM v7 (`react-router-dom`)
- **Icons:** Lucide React (`lucide-react`)
- **Styling:** Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Responsive Media Queries)
- **Formatting:** `Intl.NumberFormat` for Indian Rupee (`₹`) currency display

---

## 🛒 Shopping Cart Functionality
Shopping cart state is centralized in Redux Toolkit (`src/redux/CartSlice.jsx`) and consumed via React Redux hooks:
- **`addToCart`**: Inserts a selected plant into the cart array with initial quantity 1. Prevents duplicate product entries.
- **`increaseQuantity`**: Increments an existing plant's quantity by 1 upon clicking the `+` button.
- **`decreaseQuantity`**: Safely decrements an existing plant's quantity by 1 when `-` is clicked, strictly enforcing a minimum quantity of 1 (never allows 0 or negative quantities).
- **`removeFromCart`**: Removes an item completely from the cart array when the delete trash button is clicked.
- **Dynamic Metrics**:
  - **Total Quantity Badge**: Computed as $\sum \text{quantity}$ across all cart items.
  - **Item Subtotal**: Computed as $\text{unit price} \times \text{quantity}$.
  - **Order Total**: Computed as $\sum (\text{unit price} \times \text{quantity})$ formatted in INR (`₹`).

---

## 📁 Project Folder Structure

```text
paradise-nursery/
├── public/
│   └── favicon.svg              # Botanical brand leaf favicon
├── src/
│   ├── components/
│   │   ├── AboutUs.jsx          # Task 2: Company mission, collection & values
│   │   ├── CartItem.jsx         # Task 7: Shopping cart page & checkout modal
│   │   ├── Navbar.jsx           # Shared navigation bar with live cart count
│   │   └── ProductList.jsx      # Task 6: 21 plants in 3 categories with Add to Cart
│   ├── data/
│   │   └── plantsData.js        # Curated botanical dataset and currency helpers
│   ├── redux/
│   │   ├── CartSlice.jsx        # Task 5: Redux Toolkit cart slice and actions
│   │   └── store.js             # Redux store configuration
│   ├── App.css                  # Task 3: Landing background & master styling
│   ├── App.jsx                  # Task 4: Landing page & React Router routes
│   ├── index.css                # Base resets and typography
│   └── main.jsx                 # React root with Redux Provider & Router
├── .gitignore                   # Ignored dependencies & build artifacts
├── index.html                   # HTML5 template with Google Fonts & SEO tags
├── package.json                 # Project dependencies & Vite scripts
├── README.md                    # Task 1: Complete project documentation
└── vite.config.js               # Vite bundler configuration
```

---

## 🚀 Installation & Execution

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/ajstarks117/paradise-nursery.git
cd paradise-nursery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📋 Assignment Tasks & Direct Submission Files

| Task | Component / File | Description | Points |
| :--- | :--- | :--- | :---: |
| **Task 1** | `README.md` | Full project documentation and architecture | 2 pts |
| **Task 2** | `src/components/AboutUs.jsx` | Company mission, plant care & sustainability section | 1 pt |
| **Task 3** | `src/App.css` | Landing page background image & botanical theme | 1 pt |
| **Task 4** | `src/App.jsx` | Landing page, Get Started CTA & Router config | 3 pts |
| **Task 5** | `src/redux/CartSlice.jsx` | Redux slice for cart actions (`addToCart`, `increaseQuantity`, `decreaseQuantity`, `removeFromCart`) | 4 pts |
| **Task 6** | `src/components/ProductList.jsx` | 21 plants across 3 categories with Add to Cart and disabled states | 16 pts |
| **Task 7** | `src/components/CartItem.jsx` | Cart page, quantity controls, totals, checkout alert, and empty state | 23 pts |

---

*Paradise Nursery — Cultivating green sanctuaries, one plant at a time.*
