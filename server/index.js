const express = require('express');
const app = express();
const userRoutes = require('./routes/route.js');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
// cors
app.use(cors({
    origin: [
        'https://sumitksr-shopapp.vercel.app',
        'http://localhost:3000',
        'http://localhost:5001',
        'https://greencart-learners.vercel.app'
    ], // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow credentials
}));
// middleware 
app.use(express.json());


// mount 
app.use('/api', userRoutes);
// dbconnection
const dbConnect = require('./config/database');
dbConnect();

// Start Server 
app.listen(PORT,()=>{
    console.log("App is Running at the",PORT);
})

// Default Route 
app.get('/', (req,res) => {
    res.send(`<h1>HomePage</h1>`)
})

// Test route for CORS
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running and CORS is working!' });
});

// Debug route to check database connection
app.get('/api/debug', async (req, res) => {
    try {
        const EcoPoints = require('./models/ecoPoints');
        const User = require('./models/user');
        
        const ecoPointsCount = await EcoPoints.countDocuments();
        const userCount = await User.countDocuments();
        
        res.json({ 
            message: 'Database connection working',
            ecoPointsCount,
            userCount
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ error: error.message });
    }
});
