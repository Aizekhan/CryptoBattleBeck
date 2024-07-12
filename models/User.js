const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: String,
    username: String,
    displayName: String
});

module.exports = mongoose.model('User', userSchema);
