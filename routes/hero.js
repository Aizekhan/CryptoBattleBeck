const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// Створення героя
router.post('/create', async (req, res) => {
    const { userId, name, level, coins } = req.body;
    try {
        const newHero = new Hero({ userId, name, level, coins });
        await newHero.save();
        res.status(201).json(newHero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Отримання списку героїв користувача
router.get('/:userId', async (req, res) => {
    try {
        const heroes = await Hero.find({ userId: req.params.userId });
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;