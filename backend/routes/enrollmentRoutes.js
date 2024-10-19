const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController'); // Adjust the path accordingly

// Create a new enrollment
router.post('/', enrollmentController.createEnrollment);

// Get all enrollments
router.get('/', enrollmentController.getEnrollments);

// Get a specific enrollment by ID
router.get('/:id', enrollmentController.getEnrollmentById);

// Update an enrollment
router.put('/:id', enrollmentController.updateEnrollment);

// Delete an enrollment
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
