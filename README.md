# 🌱 GreenCart – Eco-Friendly Walmart Hackathon Project 🛒

**GreenCart** is a modern, eco-conscious e-commerce web application built for the **Walmart Sparkathon Hackathon**. It encourages sustainable shopping by rewarding users with eco points for every green action they take—be it choosing eco-friendly products, opting for green shipping, or planting trees.

Track your environmental impact, climb the global leaderboard, and make every purchase count toward a greener planet. 🌍✨

---

## 🚀 Project Overview

GreenCart is a full-stack web app featuring a sleek and responsive user interface, secure authentication, and an eco-reward system. It combines a **React** frontend with a **Node.js/Express** backend and **MongoDB** database.

### 👤 Users can:

* Browse and shop for products 💼
* Choose eco-friendly options ♻️
* Donate to plant trees 🌳
* Track their sustainability impact 📊
* Compete on the global leaderboard 🏆

---

## 🚪 Live Demo

* 🔗 [Frontend (Vercel)](https://greencart-learners.vercel.app/)
* 🚀 [Backend API (Render)](https://sparkathon-vbby.onrender.com)

> ⚠️ **Note:** Due to Render's cold start, the backend might take up to **50 seconds** to respond initially. Please wait patiently after your first action.

---

## ✨ Key Features

* **💚 Eco Points System**: Earn points for green purchases, eco-friendly shipping, and tree donations.
* **📈 Leaderboard**: Compete globally and track your rank based on eco points.
* **📊 Account Dashboard**: View total points, trees planted, CO₂ offset, and spending history.
* **🛒 Cart & Checkout**: Seamlessly add products, choose delivery options, and donate at checkout.
* **🔐 Authentication**: Secure login/signup with JWT, hashed passwords, and session persistence.
* **🎨 Eco Mode Toggle**: Switch between standard and eco-themed UI modes (blue/green).
* **📱 Responsive Design**: Optimized for mobile, tablet, and desktop.
* **🌐 Modern UI**: Walmart-inspired with clean design and smooth animations.

---

## 🛠️ Tech Stack

### **Frontend**

* [React 18](https://reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [React Router DOM](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [React Hot Toast](https://react-hot-toast.com/)
* [Vercel Deployment](https://vercel.com/)

### **Backend**

* [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
* [JWT Authentication](https://jwt.io/)
* [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
* [dotenv](https://www.npmjs.com/package/dotenv) for environment config
* [Render Deployment](https://render.com/)

---

## 📁 Project Structure

```
GreenCart/
├── public/                  # Static assets (images, icons, HTML)
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page-level components (Cart, Checkout, Login, etc.)
│   ├── redux/               # Redux store setup and slices
│   ├── data.js              # Product mock data
│   ├── index.js             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── server/
│   ├── config/              # MongoDB connection config
│   ├── controllers/         # Business logic for routes
│   ├── models/              # Mongoose models (User, EcoPoints, etc.)
│   ├── routes/              # API route definitions
│   └── index.js             # Server entry point
├── .env                     # Environment variables (not committed)
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # Project documentation
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GreenCart
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
N=10
```

### 5. Start the Backend Server

```bash
cd server
npm start
```

Backend runs at: `http://localhost:5000`

### 6. Start the Frontend App

```bash
# From the project root
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🌟 User Experience Highlights

* 🔍 **Product Discovery**: Browse and filter items.
* 🌳 **Eco Choices**: Toggle eco-friendly product options and shipping.
* 🧑‍💼 **User Profiles**: Track your sustainability journey.
* 🏆 **Leaderboard**: Get motivated by others' impact.
* 🗓️ **Notifications**: Get real-time updates with toast alerts.

---

## 🏆 Make a Difference with Every Click

Join the movement:

* Earn **Eco Points** for sustainable choices
* **Plant Trees** with every donation
* Track your **carbon footprint** and help reverse it
* Inspire others by climbing the **eco leaderboard**

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Make your changes and commit (`git commit -m "Add feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 🙌 Acknowledgments

* Developed for the **Walmart Sparkathon Hackathon** 💡
* Built with ❤️ by a team passionate about sustainability and tech 🌍

---

**Let’s code for a cleaner planet.** 🌱
**Every feature, every commit, every purchase—toward a greener tomorrow.**
