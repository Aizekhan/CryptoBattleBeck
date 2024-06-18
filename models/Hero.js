const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    coins: {
        type: Number,
        default: 0
    }
});

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;