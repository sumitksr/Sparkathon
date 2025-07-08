const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
require('dotenv').config();

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