const express = require('express');
const router = express.Router();
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');
const protect = require('./middleware/authMiddleware');
const crypto = require('crypto');
const BasicUser = require('./constants/basicuser');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

// Обробка аутентифікації через Telegram
router.post('/telegram', async (req, res) => {
    const { telegramId, username, displayName } = req.body;
    console.log('Received authentication request:', req.body); // Логування запиту

    try {
        let user = await User.findOne({ telegramId });
        const referralCode = generateReferralCode();

        if (!user) {
            user = new User({ telegramId, username, displayName, referralCode, tapIncome: BasicUser.tapIncome,  hourlyIncome: BasicUser.hourlyIncome, level: BasicUser.level, balance: BasicUser.balance});
            console.log('Created new user:', user); // Логування нового користувача
        } else {
            user.username = username;
            user.displayName = displayName;
            console.log('Updated existing user:', user); // Логування оновленого користувача
        }

        await user.save();
        const token = generateToken(user._id);
        console.log('Generated token:', token); // Логування згенерованого токену
        res.status(200).json({
            message: 'User authenticated',
            user,
            token
        });
    } catch (error) {
        console.error('Error authenticating user:', error); // Логування помилок
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
        console.error('Error fetching user data:', error); // Логування помилок
        res.status(500).json({ message: 'Error fetching user data', error });
    }
});

const generateReferralCode = () => {
    return crypto.randomBytes(4).toString('hex');
};



module.exports = router;
