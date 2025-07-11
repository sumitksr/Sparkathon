const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
require('dotenv').config();
const nodemailer = require('nodemailer');

// In-memory OTP store: { email: { otp, expiresAt, userData } }
const otpStore = {};

// Configure nodemailer (example with Gmail, replace with your SMTP)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

exports.signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if user already exists
        const existingUser = await user.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }   
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.N));
        user.create({
            name,
            email,
            password: hashedPassword,
        }).then((user) => {
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }).catch((error) => {
            console.error('Error during signup:', error);
            res.status(500).json({message: 'Internal server error'});
        });
        
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        if (!email.includes('@')) {
            return res.status(400).json({message: 'Invalid email format'});
        }

        // Find user by email
        const userFound = await user.findOne({email});
        if (!userFound) {
            return res.status(404).json({message: 'User not found'});
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid password'});
        }

        // Generate JWT token
        const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, {expiresIn: '24h'});

        // Respond with success
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
            },
        });
    }
    catch(error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.sendOtp = async (req, res) => {
    const { email, name, password, phone } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore[email] = { otp, expiresAt, userData: { name, email, password, phone } };
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
        });
        res.json({ message: 'OTP sent to email' });
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });
    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: 'No OTP sent to this email' });
    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: 'OTP expired' });
    }
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    // OTP valid, create user
    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            delete otpStore[email];
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(record.userData.password, parseInt(process.env.N));
        const newUser = await user.create({
            name: record.userData.name,
            email,
            password: hashedPassword,
            phone: record.userData.phone,
        });
        delete otpStore[email];
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error('Error during OTP verification:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};