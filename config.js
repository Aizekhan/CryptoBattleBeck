module.exports = {
    apiUrl: process.env.API_URL || 'http://localhost:5000',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    
};