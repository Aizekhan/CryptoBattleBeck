const passport = require('passport');
const TelegramStrategy = require('passport-telegram-official').Strategy;
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

passport.use(new TelegramStrategy({
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    passReqToCallback: true
}, async (req, profile, done) => {
    let user = await User.findOne({ telegramId: profile.id });
    if (!user) {
        user = new User({
            telegramId: profile.id,
            username: profile.username,
            displayName: profile.displayName
        });
        await user.save();
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    req.res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
}));

app.use(passport.initialize());

app.get('/auth/telegram/callback', passport.authenticate('telegram', { session: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});