const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// ✅ Get cart for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart || { user: req.user.id, items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Save/update cart for logged-in user (FIXED)
router.post("/", auth, async (req, res) => {
  try {
    const frontendItems = req.body.items;

    // ✅ CONVERT productId → product (THIS IS THE FIX)
    const items = frontendItems.map((item) => ({
      product: item.productId,   // ✅ REQUIRED BY MONGODB
      size: item.size,
      quantity: item.quantity,
    }));

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items });
    } else {
      cart.items = items;
      await cart.save();
    }

    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
