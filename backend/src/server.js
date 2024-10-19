const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const courseRoutes = require('../routes/courseRoutes')
const enrollmentRoutes = require('../routes/enrollmentRoutes');


// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies from the request

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Define the port from environment variables or use default
const PORT = process.env.PORT || 8084;

// Start the server and handle errors
app.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err);
    } else {
        console.log(`Listening on port: http://localhost:${PORT}`);
    }
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
