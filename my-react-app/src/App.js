import React, { useState, useReducer, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FirebaseProvider } from "./contexts/FirebaseContext";

import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";

import AdminPanel from "./pages/AdminPanel";

import { auth } from "./firebaseConfig";

const categories = [
  {
    id: "coffee",
    name: "Coffee",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tea",
    name: "Tea",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "pastries",
    name: "Pastries",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cold",
    name: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "smoothies",
    name: "Smoothies",
    image:
      "https://images.unsplash.com/photo-1505253210343-7a8f8e0a2a1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "desserts",
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1562440499-2a41f63d9c7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hookah",
    name: "Nargile",
    image: "/mor-lounge/images/nargile.jpg",
  },
];
const products = [
  {
    id: "c1",
    category: "coffee",
    name: "Espresso",
    description: "Rich and bold espresso shot",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "c2",
    category: "coffee",
    name: "Latte",
    description: "Creamy milk with espresso",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t1",
    category: "tea",
    name: "Green Tea",
    description: "Refreshing and healthy",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "p1",
    category: "pastries",
    name: "Croissant",
    description: "Buttery flaky pastry",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cd1",
    category: "cold",
    name: "Iced Coffee",
    description: "Cold brewed coffee with ice",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sm1",
    category: "smoothies",
    name: "Berry Blast",
    description: "Mixed berries smoothie",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1505253210343-7a8f8e0a2a1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d1",
    category: "desserts",
    name: "Chocolate Cake",
    description: "Rich chocolate layered cake",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1562440499-2a41f63d9c7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "s1",
    category: "sandwiches",
    name: "Club Sandwich",
    description: "Classic chicken club sandwich",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb35?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "n1",
    category: "hookah",
    name: "Çift Elma",
    description: "Klasik çift elma aromalı nargile",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1526632481896-81a1e0acec58?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "n2",
    category: "hookah",
    name: "Elmalı",
    description: "Taze elma aromalı nargile",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1611675102457-6b1c6e5a4b9b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "n3",
    category: "hookah",
    name: "Karpuzlu",
    description: "Ferahlatıcı karpuz aromalı nargile",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1608219953538-6b5613e0eac8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "n4",
    category: "hookah",
    name: "Çilekli",
    description: "Tatlı çilek aromalı nargile",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1579699860257-9dbd5e9d7f6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "n5",
    category: "hookah",
    name: "Kavunlu",
    description: "Lezzetli kavun aromalı nargile",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1582653753975-3e92f7a20d02?auto=format&fit=crop&w=400&q=80",
  },
];

// Theme colors
const lightTheme = {
  background: "#fafafa",
  text: "#121212",
  primary: "#e75480",
  secondary: "#f48fb1",
  cardBg: "#fff",
};

const darkTheme = {
  background: "#121212",
  text: "#eee",
  primary: "#e75480",
  secondary: "#f48fb1",
  cardBg: "#1e1e1e",
};

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved ? JSON.parse(saved) : true;
  });
  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(isDark));
  }, [isDark]);
  return [isDark, setIsDark];
}

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: (state.items[action.id] || 0) + 1,
        },
      };
    case "remove":
      const newItems = { ...state.items };
      if (newItems[action.id]) {
        if (newItems[action.id] === 1) delete newItems[action.id];
        else newItems[action.id]--;
      }
      return { ...state, items: newItems };
    case "clear":
      return { ...state, items: {} };
    default:
      return state;
  }
}

function MainMenu() {
  const [isDark, setIsDark] = useDarkMode();
  const theme = isDark ? darkTheme : lightTheme;

  const [currentCategory, setCurrentCategory] = useState(null);
  const [productDetailId, setProductDetailId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [cartState, dispatch] = useReducer(cartReducer, { items: {} });

  const filteredProducts = products.filter((p) => p.category === currentCategory);

  const itemCount = Object.values(cartState.items).reduce((a, b) => a + b, 0);

  const total = Object.entries(cartState.items).reduce((acc, [id, qty]) => {
    const p = products.find((pr) => pr.id === id);
    return acc + (p?.price || 0) * qty;
  }, 0);

  const style = {
    app: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      transition: "background-color 0.3s ease, color 0.3s ease",
      userSelect: "none",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    header: {
      padding: "20px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.cardBg,
      color: theme.primary,
      fontSize: 28,
      fontWeight: 600,
      boxShadow: `0 2px 6px rgba(0,0,0,0.1)`,
      position: "sticky",
      top: 0,
      zIndex: 1200,
    },
    button: {
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      color: theme.primary,
      fontSize: 22,
      marginLeft: 10,
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
      borderRadius: 8,
      transition: "background-color 0.3s ease",
    },
    container: {
      maxWidth: 1200,
      margin: "auto",
      padding: "30px 20px",
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: 24,
      paddingBottom: 20,
    },
    categoryCard: {
      position: "relative",
      cursor: "pointer",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: `0 5px 18px rgba(231,84,128,0.3)`,
      userSelect: "none",
      height: 180,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      color: "white",
      fontWeight: 700,
      fontSize: 22,
      textShadow: "0 0 14px rgba(0,0,0,0.8)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    categoryOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(231,84,128,0.85) 0%, rgba(231,84,128,0.25) 65%, transparent 100%)",
      zIndex: 1,
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.3s ease",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
    },
    categoryNameWrapper: {
      position: "relative",
      zIndex: 2,
      paddingBottom: 16,
      textAlign: "center",
      width: "100%",
      userSelect: "none",
    },
    backButton: {
      cursor: "pointer",
      backgroundColor: theme.primary,
      color: "white",
      border: "none",
      padding: "12px 28px",
      borderRadius: 16,
      fontWeight: 600,
      fontSize: 17,
      marginBottom: 25,
      userSelect: "none",
      transition: "background-color 0.3s ease",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: 20,
    },
    productCard: {
      backgroundColor: theme.cardBg,
      borderRadius: 16,
      padding: 18,
      boxShadow: `0 5px 15px rgba(231,84,128,0.22)`,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },
    productImage: {
      width: "100%",
      height: 160,
      objectFit: "cover",
      borderRadius: 14,
      marginBottom: 14,
      filter: "brightness(1)",
      transition: "filter 0.3s ease",
    },
    productName: {
      fontWeight: 600,
      fontSize: 19,
      marginBottom: 8,
      color: theme.secondary,
    },
    productDesc: {
      fontSize: 15,
      color: "#bbb",
      flexGrow: 1,
      marginBottom: 14,
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
    },
    productPrice: {
      fontWeight: 700,
      color: theme.primary,
      fontSize: 17,
      marginBottom: 14,
    },
    summaryButton: {
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: theme.primary,
      color: "white",
      padding: "18px 30px",
      fontWeight: 600,
      fontSize: 20,
      border: "none",
      borderRadius: 50,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      userSelect: "none",
      boxShadow: "0 8px 18px rgba(231,84,128,0.6)",
      zIndex: 1100,
      transition: "background-color 0.3s ease",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(18, 18, 18, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: 15,
    },
    modal: {
      backgroundColor: theme.cardBg,
      borderRadius: 20,
      maxWidth: 420,
      width: "100%",
      padding: 30,
      color: theme.text,
      userSelect: "none",
      position: "relative",
      maxHeight: "85vh",
      overflowY: "auto",
      boxShadow: "0 0 30px rgba(231,84,128,0.6)",
    },
    closeBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: "transparent",
      border: "none",
      fontSize: 28,
      color: theme.primary,
      cursor: "pointer",
      userSelect: "none",
      lineHeight: 1,
    },
    modalImage: {
      width: "100%",
      height: 240,
      objectFit: "cover",
      borderRadius: 16,
      marginBottom: 22,
      boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    },
    modalName: {
      margin: "0 0 14px 0",
      color: theme.primary,
      fontSize: 26,
      fontWeight: 700,
    },
    modalDesc: {
      margin: "0 0 22px 0",
      color: "#bbb",
      fontSize: 16,
      lineHeight: 1.4,
    },
    modalPrice: {
      fontWeight: 700,
      color: theme.primary,
      marginBottom: 28,
      fontSize: 22,
    },
    modalButton: {
      backgroundColor: theme.primary,
      color: "white",
      padding: "14px 32px",
      fontWeight: 700,
      border: "none",
      borderRadius: 16,
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 0.3s ease",
      fontSize: 18,
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #333",
    },
    cartName: {
      fontWeight: 600,
      color: theme.secondary,
      flex: 1,
      fontSize: 16,
    },
    cartQty: {
      fontWeight: 600,
      margin: "0 14px",
      color: "#bbb",
      minWidth: 28,
      textAlign: "center",
      fontSize: 15,
    },
    cartPrice: {
      fontWeight: 700,
      color: theme.primary,
      minWidth: 54,
      textAlign: "right",
      fontSize: 16,
    },
    removeBtn: {
      backgroundColor: "transparent",
      border: "none",
      color: theme.primary,
      cursor: "pointer",
      fontSize: 22,
      transition: "color 0.3s ease",
      userSelect: "none",
      marginLeft: 14,
      lineHeight: 1,
    },
    totalPrice: {
      textAlign: "right",
      fontSize: 22,
      fontWeight: 700,
      marginTop: 25,
      color: theme.primary,
    },
    clearCartBtn: {
      marginTop: 18,
      width: "100%",
      padding: "14px 0",
      borderRadius: 16,
      backgroundColor: theme.primary,
      color: "white",
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      userSelect: "none",
      fontSize: 18,
    },
  };

  function Header() {
    return (
      <header style={style.header}>
        <div>Mor Lounge</div>
        <button
          onClick={() => setIsDark((d) => !d)}
          aria-label="Toggle dark mode"
          style={style.button}
          title="Toggle dark mode"
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(231,84,128,0.15)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {isDark ? "\u2600\ufe0f" : "\ud83c\udf19"}
        </button>
      </header>
    );
  }

  function CategoryCard({ category }) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCurrentCategory(category.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCurrentCategory(category.id);
          }
        }}
        style={style.categoryCard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = `0 10px 30px rgba(231,84,128,0.55)`;
          e.currentTarget.querySelector("img").style.transform = "scale(1.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = `0 5px 18px rgba(231,84,128,0.3)`;
          e.currentTarget.querySelector("img").style.transform = "none";
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          style={style.categoryImage}
          loading="lazy"
          aria-hidden="true"
          draggable={false}
        />
        <div style={style.categoryOverlay} />
        <div style={style.categoryNameWrapper}>{category.name}</div>
      </div>
    );
  }

  function CategoryGrid() {
    return (
      <section aria-label="Kategori Listesi" style={style.categoryGrid} role="list">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </section>
    );
  }

  function ProductCard({ product, onClick }) {
    return (
      <article
        tabIndex={0}
        role="button"
        aria-label={`${product.name}, ${product.description}, ${product.price} TL`}
        onClick={() => onClick(product.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(product.id);
          }
        }}
        style={style.productCard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = `0 10px 22px rgba(231,84,128,0.45)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = `0 5px 15px rgba(231,84,128,0.22)`;
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={style.productImage}
          draggable={false}
        />
        <div style={style.productName}>{product.name}</div>
        <div style={style.productDesc}>{product.description}</div>
        <div style={style.productPrice}>{product.price} TL</div>
      </article>
    );
  }

  function ProductList({ products, onProductClick }) {
    return (
      <section aria-label="Ürün Listesi" style={style.productGrid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </section>
    );
  }

  function ProductDetailModal({ id, onClose }) {
    const product = products.find((p) => p.id === id);
    if (!product) return null;

    return (
      <div
        style={style.overlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <div style={style.modal} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
          <button aria-label="Close modal" onClick={onClose} style={style.closeBtn}>
            &times;
          </button>
          <img
            src={product.image}
            alt={product.name}
            style={style.modalImage}
            loading="lazy"
            draggable={false}
          />
          <h2 id="modal-title" style={style.modalName}>
            {product.name}
          </h2>
          <p style={style.modalDesc}>{product.description}</p>
          <div style={style.modalPrice}>{product.price} TL</div>
          <button
            style={style.modalButton}
            onClick={() => {
              dispatch({ type: "add", id: product.id });
              onClose();
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    );
  }

  function CartSummaryButton({ onOpenCart }) {
    return (
      <button
        onClick={onOpenCart}
        aria-label="Sepeti aç"
        style={style.summaryButton}
        title="Sepetiniz"
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
      >
        🛒{" "}
        {itemCount > 0 ? `${itemCount} ürün - ${total} TL` : "Sepetiniz boş"}
      </button>
    );
  }

  function CartDetailModal({ onClose }) {
    const entries = Object.entries(cartState.items);

    return (
      <div
        style={style.overlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={onClose}
      >
        <div style={style.modal} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
          <button aria-label="Close cart" onClick={onClose} style={style.closeBtn}>
            &times;
          </button>
          <h2 id="cart-title" style={style.modalName}>
            Sepetiniz
          </h2>
          {entries.length === 0 && <p>Sepetiniz boş.</p>}
          {entries.map(([id, qty]) => {
            const p = products.find((pr) => pr.id === id);
            if (!p) return null;
            return (
              <div key={id} style={style.cartItem}>
                <span style={style.cartName}>{p.name}</span>
                <span style={style.cartQty}>x{qty}</span>
                <span style={style.cartPrice}>{p.price * qty} TL</span>
                <button
                  aria-label={`Remove one ${p.name}`}
                  onClick={() => dispatch({ type: "remove", id })}
                  style={style.removeBtn}
                  type="button"
                  onMouseOver={(e) => (e.currentTarget.style.color = theme.secondary)}
                  onMouseOut={(e) => (e.currentTarget.style.color = theme.primary)}
                >
                  &times;
                </button>
              </div>
            );
          })}
          {entries.length > 0 && (
            <>
              <div style={style.totalPrice}>Toplam: {total} TL</div>
              <button
                onClick={() => dispatch({ type: "clear" })}
                style={style.clearCartBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
              >
                Sepeti Temizle
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={style.app}>
      <Header />
      <main style={style.container}>
        {!currentCategory && <CategoryGrid />}
        {currentCategory && (
          <>
            <button
              onClick={() => setCurrentCategory(null)}
              style={style.backButton}
              aria-label="Geri dön"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
            >
              ← Kategorilere Dön
            </button>
            <ProductList products={filteredProducts} onProductClick={setProductDetailId} />
          </>
        )}

        <CartSummaryButton onOpenCart={() => setCartOpen(true)} />
        {cartOpen && <CartDetailModal onClose={() => setCartOpen(false)} />}
        {productDetailId && (
          <ProductDetailModal id={productDetailId} onClose={() => setProductDetailId(null)} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter basename="/mor-lounge">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute auth={auth}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}