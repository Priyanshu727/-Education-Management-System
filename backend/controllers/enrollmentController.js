const Enrollment = require('../models/enrollmentModel'); // Adjust the path accordingly

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
    const { course, student } = req.body;

    if (!course || !student) {
        return res.status(400).json({ error: 'Course and Student are required' });
    }

    try {
        const newEnrollment = new Enrollment({ course, student });
        await newEnrollment.save();
        res.status(201).json({ message: 'Enrollment created successfully', enrollment: newEnrollment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create enrollment', details: err.message });
    }
};

// Get all enrollments
exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('course', 'title') // Populate course title
            .populate('student', 'username email'); // Populate student info
        res.status(200).json({ message: 'Enrollments fetched successfully', enrollments });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch enrollments', details: err.message });
    }
};

// Get a specific enrollment by ID
exports.getEnrollmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const enrollment = await Enrollment.findById(id)
            .populate('course', 'title')
            .populate('student', 'username email');
        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment fetched successfully', enrollment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch enrollment', details: err.message });
    }
};

// Update an enrollment
exports.updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const { course, student, status } = req.body;

    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, { course, student, status }, { new: true });
        if (!updatedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment updated successfully', enrollment: updatedEnrollment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update enrollment', details: err.message });
    }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully', enrollment: deletedEnrollment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete enrollment', details: err.message });
    }
};
