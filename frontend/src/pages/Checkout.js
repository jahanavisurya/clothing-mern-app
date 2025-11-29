import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";

const getLocalCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const cart = getLocalCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user || !token) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Checkout failed");
      } else {
        setMessage(`Order placed! Order ID: ${data.order._id}`);
        localStorage.removeItem("cart");
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total amount: ₹{total}</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Placing order..." : "Place Order"}
      </button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default Checkout;
