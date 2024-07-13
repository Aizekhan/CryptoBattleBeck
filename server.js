const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const userProgressRoutes = require('./routes/userProgress');
const authRoutes = require('./routes/authRoutes'); // Додаємо цей рядок

app.use('/api/userProgress', userProgressRoutes);
app.use('/api/auth', authRoutes); // Додаємо цей рядок

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
