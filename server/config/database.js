const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL ;
const dbconnect  = ()=> {
    mongoose.connect(dbUrl, {
}).then (() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}); }

module.exports = dbconnect;