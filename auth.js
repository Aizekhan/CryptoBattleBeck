// backend/auth.js

const passport = require('passport');
const TelegramStrategy = require('passport-telegram-official').Strategy;
const User = require('./models/User');
const config = require('./config');

passport.use(new TelegramStrategy({
    botToken: process.env.TELEGRAM_BOT_TOKEN
}, async (profile, done) => {
    try {
        let user = await User.findOne({ telegramId: profile.id });
        if (!user) {
            user = new User({
                telegramId: profile.id,
                username: profile.username,
                displayName: profile.displayName
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

app.get('/auth/telegram/callback', 
    passport.authenticate('telegram', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);