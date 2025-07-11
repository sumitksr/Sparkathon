const express = require('express');
const router = express.Router();
const {login, signup, sendOtp, verifyOtp} = require('../controllers/register');
const {addEcoPoints, getEcoPoints, getLeaderboard} = require('../controllers/ecoPoints');

router.post('/login', login);
router.post('/signup', signup);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/eco-points/add', addEcoPoints);
router.get('/eco-points/:userId', getEcoPoints);
router.get('/leaderboard', getLeaderboard);

module.exports = router;