const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Product = require("../models/Product");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton t-shirt perfect for everyday wear.",
    price: 499,
    image: "https://dummyimage.com/300x300/000/fff&text=White+T-Shirt",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Blue Denim Jeans",
    description: "Slim fit blue denim jeans for casual outings.",
    price: 1299,
    image: "https://dummyimage.com/300x300/000/fff&text=Denim+Jeans",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Red Hoodie",
    description: "Warm and cozy hoodie for chilly days.",
    price: 1499,
    image: "https://dummyimage.com/300x300/000/fff&text=Red+Hoodie",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Black Formal Shirt",
    description: "Perfect for office and formal events.",
    price: 899,
    image: "https://dummyimage.com/300x300/000/fff&text=Formal+Shirt",
    category: "Men",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight floral dress ideal for summers.",
    price: 1599,
    image: "https://dummyimage.com/300x300/000/fff&text=Floral+Dress",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Black Leggings",
    description: "Comfortable stretchable leggings for daily wear.",
    price: 699,
    image: "https://dummyimage.com/300x300/000/fff&text=Leggings",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women Blue Top",
    description: "Casual top that goes with any jeans.",
    price: 799,
    image: "https://dummyimage.com/300x300/000/fff&text=Women+Top",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Women Jacket",
    description: "Stylish jacket for winter season.",
    price: 1999,
    image: "https://dummyimage.com/300x300/000/fff&text=Women+Jacket",
    category: "Women",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Kids Cartoon T-Shirt",
    description: "Cute cartoon printed t-shirt for kids.",
    price: 399,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+T-Shirt",
    category: "Kids",
    sizes: ["S", "M"],
  },
  {
    name: "Kids Shorts",
    description: "Comfortable shorts for playtime.",
    price: 349,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+Shorts",
    category: "Kids",
    sizes: ["S", "M"],
  },
  {
    name: "Kids Hoodie",
    description: "Warm hoodie with fun print for kids.",
    price: 899,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+Hoodie",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men Track Pants",
    description: "Comfortable track pants for gym and running.",
    price: 999,
    image: "https://dummyimage.com/300x300/000/fff&text=Track+Pants",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Women Palazzo Pants",
    description: "Flowy palazzo pants with elegant design.",
    price: 1099,
    image: "https://dummyimage.com/300x300/000/fff&text=Palazzo",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Jeans",
    description: "Durable jeans for kids daily wear.",
    price: 799,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+Jeans",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men Kurta",
    description: "Traditional kurta for festive occasions.",
    price: 1199,
    image: "https://dummyimage.com/300x300/000/fff&text=Men+Kurta",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women Kurti",
    description: "Stylish kurti for office and casual wear.",
    price: 999,
    image: "https://dummyimage.com/300x300/000/fff&text=Women+Kurti",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Party Dress",
    description: "Adorable party dress for little ones.",
    price: 1299,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+Dress",
    category: "Kids",
    sizes: ["S", "M"],
  },
  {
    name: "Men Polo T-Shirt",
    description: "Casual polo t-shirt for outings.",
    price: 799,
    image: "https://dummyimage.com/300x300/000/fff&text=Polo+T-Shirt",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Women Skirt",
    description: "Elegant skirt for casual and office use.",
    price: 899,
    image: "https://dummyimage.com/300x300/000/fff&text=Skirt",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Track Suit",
    description: "Comfortable track suit for kids sports.",
    price: 1399,
    image: "https://dummyimage.com/300x300/000/fff&text=Kids+Track+Suit",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err.message);
    process.exit(1);
  }
};

seed();
