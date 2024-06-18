const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const protect = require('../middleware/authMiddleware');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;