# 🌱 Sparkathon: Eco-Friendly Walmart Shopping App 🛒

Welcome to **Sparkathon** – a modern, eco-conscious e-commerce platform inspired by Walmart! This project is designed to encourage sustainable shopping by rewarding users with eco points for every green action they take. Track your environmental impact, compete on the leaderboard, and make a difference with every purchase! 🌍✨

---

## 🚀 Project Overview

Sparkathon is a full-stack web application that combines a beautiful React frontend with a robust Node.js/Express backend and MongoDB database. Users can:
- 🛒 Shop for products
- ♻️ Choose eco-friendly options
- 🌳 Donate to plant trees
- 🏆 Compete on a global leaderboard
- 👤 Track their personal eco impact

The app is fully responsive, supports eco-mode (green/blue themes), and provides a seamless, modern shopping experience.

---

## ✨ Main Features

- **Eco Points System**: Earn points for eco-friendly purchases, tree donations, and green shipping.
- **Leaderboard**: See how you rank against other users based on your eco points.
- **Account Dashboard**: Track your total eco points, trees planted, CO₂ offset, and spending.
- **Cart & Checkout**: Add products to your cart, choose shipping, and donate to plant trees.
- **Authentication**: Secure login/signup with JWT and persistent sessions.
- **Responsive UI**: Works beautifully on mobile, tablet, and desktop.
- **Modern Design**: Walmart-inspired, with smooth animations and eco-mode toggle.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- React Icons
- React Hot Toast

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables

---

## 📁 File Structure

```
Sparkathon/
├── public/                  # Static assets (logo, icons, images, index.html)
├── src/
│   ├── components/          # Reusable React components (Navbar, Product, CartItem, etc.)
│   ├── pages/               # Main pages (Home, Cart, Checkout, Account, Leaderboard, Login, Signup)
│   ├── redux/               # Redux store and slices
│   ├── data.js              # Product data (if any)
│   ├── index.js             # React entry point
│   └── index.css            # Global styles (Tailwind)
├── server/
│   ├── config/              # Database connection config
│   ├── controllers/         # Express route controllers (register, ecoPoints)
│   ├── models/              # Mongoose models (user, ecoPoints)
│   ├── routes/              # Express route definitions
│   └── index.js             # Express server entry point
├── package.json             # Project dependencies (frontend)
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # Project documentation
```

---

## 🏁 How to Run the Project

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd Sparkathon
```

### 2. **Install Frontend Dependencies**
```bash
npm install
```

### 3. **Install Backend Dependencies**
```bash
cd server
npm install
```

### 4. **Set Up Environment Variables**
Create a `.env` file in the `server/` directory:
```
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
N=10
```

### 5. **Start the Backend Server**
```bash
cd server
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000)

### 6. **Start the Frontend App**
```bash
# In the project root
yarn start # or npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use)

---

## 🌟 User Experience

- **Shop**: Browse and search for products, add to cart, and checkout.
- **Eco Mode**: Toggle between blue (default) and green (eco) themes.
- **Leaderboard**: See the top eco champions and your own rank.
- **Account**: View your eco points, trees planted, CO₂ offset, and order history.
- **Notifications**: Get instant feedback with toast notifications.

---

## 🏆 Compete & Make a Difference!

Every purchase and donation helps you climb the leaderboard and make a real-world impact. 🌳

- **Earn Eco Points** for every green action
- **Plant Trees** and offset your carbon footprint
- **Track Your Progress** and inspire others

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request


---

**Built with ❤️ for a greener tomorrow!**
