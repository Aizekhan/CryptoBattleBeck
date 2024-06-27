const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./auth');
const userRouter = require('./routes/user');
const cors = require('cors');

dotenv.config();

const app = express();

// Use the CORS middleware with specific options
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "cryptobattle.netlify.app"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use(cors());

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Auth Router
app.use("/api/auth", authRouter);

// Get User Info
app.use("/api/user", userRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});