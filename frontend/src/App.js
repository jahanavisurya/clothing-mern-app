import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
      <Link to="/products" style={{ marginRight: "10px" }}>Products</Link>
      <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
      {user ? (
        <>
          <span style={{ marginRight: "10px" }}>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/products" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
