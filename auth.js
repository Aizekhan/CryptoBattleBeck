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

// Обробка аутентифікації через Telegram
router.post('/telegram', async (req, res) => {
    const { telegramId, username, displayName } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if (!user) {
            user = new User({ telegramId, username, displayName });
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

module.exports = router;