const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User model exists
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active',
    },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
