const Course = require('../models/courseModel'); // Ensure this path is correct

// Fetch all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ message: 'Courses data', courses });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
    }
};

// Fetch a single course by ID
exports.getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course data', course });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course', details: err.message });
    }
};

// Create a new course
exports.createCourse = async (req, res) => {
    const { title, description, duration, instructor } = req.body;

    // Ensure all fields are present
    if (!title || !description || !duration || !instructor) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newCourse = await Course.create({ title, description, duration, instructor });
        res.status(201).json({ message: 'Course created', course: newCourse });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create course', details: err.message });
    }
};

// Update an existing course
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, duration, instructor } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, description, duration, instructor },
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated', course: updatedCourse });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update course', details: err.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted', course: deletedCourse });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete course', details: err.message });
    }
};
