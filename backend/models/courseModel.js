const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Title is a required field
    },
    description: {
        type: String,
        required: true,  // Description is a required field
    },
    duration: {
        type: String,
        required: true,  // Duration is a required field (e.g., "10 weeks", "3 months", etc.)
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,  // Instructor is a required field
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Default value for createdAt is the current date
    },
});

// Exporting the Course model
module.exports = mongoose.model('Course', courseSchema);
