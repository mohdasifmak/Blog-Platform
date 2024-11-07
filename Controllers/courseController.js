const db = require('../db');

// Get all courses
exports.getAllCourses = (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('Error fetching courses');
        }
        res.render('courses', { courses: results });
    });
};

// Show form to add a new course
exports.showAddCourseForm = (req, res) => {
    res.render('addCourse');
};

// Add a new course
exports.addCourse = (req, res) => {
    const { title, description, price, image_url } = req.body;
    db.query(
        'INSERT INTO courses (title, description, price, image_url) VALUES (?, ?, ?, ?)',
        [title, description, price, image_url],
        (err, results) => {
            if (err) {
                console.error('Error adding course:', err);
                return res.status(500).send('Error adding course');
            }
            res.redirect('/courses');
        }
    );
};

// Show form to edit a course
exports.showEditCourseForm = (req, res) => {
    const courseId = req.params.id;
    db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Course not found:', err);
            return res.status(404).send('Course not found');
        }
        res.render('editCourse', { course: results[0] });
    });
};

// Update course
exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const { title, description, price, image_url } = req.body;
    db.query(
        'UPDATE courses SET title = ?, description = ?, price = ?, image_url = ? WHERE id = ?',
        [title, description, price, image_url, courseId],
        (err, results) => {
            if (err) {
                console.error('Error updating course:', err);
                return res.status(500).send('Error updating course');
            }
            res.redirect('/courses');
        }
    );
};

// Delete course
exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    db.query('DELETE FROM courses WHERE id = ?', [courseId], (err, results) => {
        if (err) {
            console.error('Error deleting course:', err);
            return res.status(500).send('Error deleting course');
        }
        res.redirect('/courses');
    });
};


// Show form for payment
exports.showPaymentForm = (req, res) => {
    res.render('payment');
};

