const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to get all courses
router.get('/', courseController.getAllCourses);

// Route to show the form for adding a new course
router.get('/new', courseController.showAddCourseForm);

// Route to create a new course
router.post('/new', courseController.addCourse);

// Route to show the form for editing an existing course
router.get('/edit/:id', courseController.showEditCourseForm);

// Route to update a course
router.post('/edit/:id', courseController.updateCourse);

// Route to delete a course
router.get('/delete/:id', courseController.deleteCourse);

router.get('/pay/:id', courseController.showPaymentForm);


module.exports = router;
