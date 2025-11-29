import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const CartPage = () => {
  const [cart, setCart] = useState(getLocalCart());
  const { token } = useAuth();

  useEffect(() => {
    const syncCart = async () => {
      if (!token || cart.length === 0) return;
      try {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.error("Error syncing cart", err);
      }
    };
    syncCart();
  }, [cart, token]);

  const updateQuantity = (index, delta) => {
    const updated = cart
      .map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Cart is empty. <Link to="/products">Go to products</Link>
        </p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px 0",
              }}
            >
              <strong>{item.name}</strong> (Size: {item.size}) - ₹
              {item.price} x {item.quantity}
              <div>
                <button onClick={() => updateQuantity(index, -1)}>
                  -
                </button>
                <button onClick={() => updateQuantity(index, 1)}>
                  +
                </button>
                <button onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <Link to="/checkout">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
