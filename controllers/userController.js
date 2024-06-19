// backend/controllers/userController.js

const crypto = require('crypto');

const generateReferralCode = () => {
    return crypto.randomBytes(4).toString('hex');
};

// Реєстрація користувача
router.post('/register', async (req, res) => {
    const { username, password, email, referralCode } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ 
            username, 
            password, 
            email,
            referralCode: generateReferralCode()
        });

        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                newUser.referredBy = referrer._id;
                referrer.referrals.push(newUser._id);
                await referrer.save();
            }
        }

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id),
            referralCode: newUser.referralCode
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});