import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

const getLocalCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState(getLocalCart());

  const fetchProducts = async (pageToUse = page) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (size) params.append("size", size);
    params.append("page", pageToUse);
    params.append("limit", 8);

    const res = await fetch(`${API_URL}/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProducts(newPage);
  };

  const addToCart = (product, selectedSize = "M") => {
    const existing = cart.find(
      (item) => item.productId === product._id && item.size === selectedSize
    );
    let updated;
    if (existing) {
      updated = cart.map((item) =>
        item.productId === product._id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...cart,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          quantity: 1,
        },
      ];
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert("Added to cart");
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: "15px" }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <button type="submit">Apply</button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{ border: "1px solid #ddd", padding: "10px" }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", marginBottom: "8px" }}
            />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>{p.category}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span style={{ margin: "0 8px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <Link to="/cart">Go to Cart</Link>
      </div>
    </div>
  );
};

export default Products;
