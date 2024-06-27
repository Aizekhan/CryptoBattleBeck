const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const protect = require('../middleware/authMiddleware');
const crypto = require('crypto');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

const generateReferralCode = () => {
    return crypto.randomBytes(4).toString('hex');
};

// Обробка аутентифікації через Telegram
router.post('/telegram', async (req, res) => {
    const { telegramId, username, displayName } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if (!user) {
            user = new User({
                telegramId,
                username,
                displayName,
                referralCode: generateReferralCode()
            });
        } else {
            user.username = username;
            user.displayName = displayName;
        }

        await user.save();
        res.status(200).json({
            message: 'User authenticated',
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error });
    }
});

// Отримання профілю користувача
router.get(`/:userId`, protect, async (req, res) => {
    console.log("Getting user by id", userId);
    const user = await User.findById(userId);
    if (user) {
        res.json({
            user
        });
    } else {
        res.status(404).json({ message: `User not found with Id: ${userId}` });
    }
});

// Отримання даних користувача
router.get('/:telegramId', async (req, res) => {
    try {
        const user = await User.findOne({ telegramId: req.params.telegramId }).populate('heroes currentHero mines');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
});

// Створення реферального коду
router.post('/referral', async (req, res) => {
    const { telegramId } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.referralCode) {
            user.referralCode = generateReferralCode();
            await user.save();
        }

        res.status(200).json({
            referralCode: user.referralCode
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating referral code', error });
    }
});

// Реєстрація нового користувача
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

// Вхід користувача
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

module.exports = router;
