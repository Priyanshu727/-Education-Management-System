const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const maxAge = 3 * 24 * 60 * 60; // 3 days

// Create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// User registration
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Ensure all fields are present
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });

        // Generate JWT token and set cookies
        const token = createToken(newUser._id);
        res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.cookie('userId', newUser._id, { httpOnly: true });

        // Respond with the created user's ID
        res.status(201).json({ user: newUser._id });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token and send response
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.cookie('userId', user._id, { httpOnly: true });
        
        res.status(200).json({ user: user._id });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

// User logout
exports.logout = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }); // Clear the token
    res.cookie('userId', '', { maxAge: 1 }); // Clear the user ID
    res.status(200).json({ message: 'Logged out successfully' });
};
