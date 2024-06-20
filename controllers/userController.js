const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateReferralCode = () => {
    return crypto.randomBytes(4).toString('hex');
};

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

// Обробка аутентифікації через Telegram
exports.telegramAuth = async (req, res) => {
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
};

// Створення реферального коду
exports.createReferral = async (req, res) => {
    const { telegramId, username } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if (!user) {
            user = new User({
                telegramId,
                username,
                referralCode: generateReferralCode()
            });
            await user.save();
        }

        res.status(200).json({
            referralCode: user.referralCode
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating referral code', error });
    }
};