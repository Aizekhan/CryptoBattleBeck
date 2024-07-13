// routes/userProgress.js
const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const authMiddleware = require('../middleware/authMiddleware');

// Отримання прогресу користувача
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ userId: req.user.id });
        if (!userProgress) {
            return res.status(404).json({ message: 'User progress not found' });
        }
        res.json(userProgress);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Збереження прогресу користувача
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { userId, username, level, experience, balance, totalIncomePer8Hours, totalTapIncome, currentHeroId, heroes } = req.body;
        let userProgress = await UserProgress.findOne({ userId });

        if (userProgress) {
            userProgress.username = username;
            userProgress.level = level;
            userProgress.experience = experience;
            userProgress.balance = balance;
            userProgress.totalIncomePer8Hours = totalIncomePer8Hours;
            userProgress.totalTapIncome = totalTapIncome;
            userProgress.currentHeroId = currentHeroId;
            userProgress.heroes = heroes;
        } else {
            userProgress = new UserProgress({
                userId,
                username,
                level,
                experience,
                balance,
                totalIncomePer8Hours,
                totalTapIncome,
                currentHeroId,
                heroes
            });
        }

        await userProgress.save();
        res.json(userProgress);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
