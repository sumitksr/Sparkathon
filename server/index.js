const express = require('express');
const app = express();
const userRoutes = require('./routes/route.js');
require("dotenv").config();
const PORT = process.env.PORT || 3000;

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