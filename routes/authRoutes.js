const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserProgress.findOne({ username });

        if (user && user.password === password) {
            const token = generateToken(user._id);
            res.status(200).json({
                message: 'User authenticated',
                user,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error });
    }
});

router.post('/telegram', async (req, res) => {
    const { id: telegramId, username, first_name: displayName } = req.body;

    try {
        let user = await UserProgress.findOne({ telegramId });

        if (!user) {
            user = new UserProgress({ telegramId, username, displayName });
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
