# Clothing Brand E-Commerce Web App (MERN Stack)

This project is a complete MERN stack e-commerce application for a fictional clothing brand, matching the assignment requirements.

## Features

- User registration and login (JWT + bcrypt)
- Clothing catalog with minimum 20 seeded products
- Each product: name, description, price, image URL, category (Men/Women/Kids), sizes (S/M/L/XL)
- Search products by name/description
- Filter by category, size, and price range (backend ready)
- Pagination using query params (?page=&limit=)
- Shopping cart:
  - Add items (with sizes)
  - Update quantities, remove items
  - Works even when not logged in (localStorage)
  - Cart saved per user in MongoDB when logged-in
- Mock checkout (no real payment)
- Orders stored in MongoDB with user reference, items, total price, order date
- Order confirmation email using Nodemailer after checkout

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js

---

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit .env with your values
npm run dev
```

### Seed Products

```bash
node src/data/seedProducts.js
```

This will insert 20 demo clothing products into MongoDB.

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000` and talks to the backend at `http://localhost:5000`.

---

## Basic Demo Flow

1. Register a user from the Register page.
2. Login with that user.
3. Browse products on the Products page (search + filters + pagination).
4. Add items to the cart (works even when not logged in).
5. View and modify the cart on the Cart page.
6. Login (if not already).
7. Go to Checkout and place the order.
8. The order is stored in MongoDB and an email is sent (if MAIL_USER/MAIL_PASS are configured correctly).

---

## Note

- Do **not** commit your real `.env`. Only `.env.example` is included in the ZIP.
- Fill MONGO_URI, JWT_SECRET, MAIL_USER, MAIL_PASS in `.env` before running.
