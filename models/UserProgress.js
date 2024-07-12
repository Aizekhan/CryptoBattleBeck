const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: String,
    username: String,
    level: Number,
    experience: Number,
    balance: Number,
    totalIncomePer8Hours: Number,
    totalTapIncome: Number,
    currentHeroId: String,
    heroes: Array
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
