const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    displayName: String,
    referralCode: {
        type: String,
        unique: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    referrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    level: { 
        type: Number, 
        default: 1 
    },
    tapIncome: { 
        type: Number, 
        default: 10 
    },
    hourlyIncome: { 
        type: Number, 
        default: 100 
    },
    balance: { 
        type: Number, 
        default: 0 
    },
    heroes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero'
    }],
    currentHero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero'
    },
    mines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mine'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;