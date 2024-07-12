const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

router.post('/telegram', async (req, res) => {
    const { telegramId, username, displayName } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if (!user) {
            user = new User({ telegramId, username, displayName });
            await user.save();
        }

        const token = generateToken(user._id);
        res.status(200).json({
            message: 'User authenticated',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error });
    }
});

module.exports = router;
