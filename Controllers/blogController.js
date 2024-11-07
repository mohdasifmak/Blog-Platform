const db = require('../db');

// Get all blogs
exports.getAllBlogs = (req, res) => {
    db.query('SELECT * FROM blogs', (err, results) => {
        if (err) {
            console.error('Error fetching blogs:', err);
            return res.status(500).send('Error fetching blogs');
        }
        res.render('blogs', { blogs: results });
    });
};

// Show form to add a new blog
exports.showAddBlogForm = (req, res) => {
    res.render('addBlog');
};

// Add a new blog
exports.addBlog = (req, res) => {
    const { title, content, publish_date } = req.body;
    db.query(
        'INSERT INTO blogs (title, content, publish_date) VALUES (?, ?, ?)',
        [title, content, publish_date],
        (err, results) => {
            if (err) {
                console.error('Error adding blog:', err);
                return res.status(500).send('Error adding blog');
            }
            res.redirect('/blogs');
        }
    );
};

// Show form to edit a blog
exports.showEditBlogForm = (req, res) => {
    const blogId = req.params.id;
    db.query('SELECT * FROM blogs WHERE id = ?', [blogId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Blog not found:', err);
            return res.status(404).send('Blog not found');
        }
        res.render('editBlog', { blog: results[0] });
    });
};

// Update blog
exports.updateBlog = (req, res) => {
    const blogId = req.params.id;
    const { title, content, publish_date } = req.body;
    db.query(
        'UPDATE blogs SET title = ?, content = ?, publish_date = ? WHERE id = ?',
        [title, content, publish_date, blogId],
        (err, results) => {
            if (err) {
                console.error('Error updating blog:', err);
                return res.status(500).send('Error updating blog');
            }
            res.redirect('/blogs');
        }
    );
};

// Delete blog
exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    db.query('DELETE FROM blogs WHERE id = ?', [blogId], (err, results) => {
        if (err) {
            console.error('Error deleting blog:', err);
            return res.status(500).send('Error deleting blog');
        }
        // After deletion, redirect to the list of blogs
        res.redirect('/blogs');
    });
};


exports.blogDetail = (req, res) => {
    const blogId = req.params.id;
    
    db.query('SELECT * FROM blogs WHERE id = ?', [blogId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Blog not found:', err);
            return res.status(404).send('Blog not found');
        }
        
        // Render the blog detail view
        res.render('blogDetail', { blog: results[0] });
    }); 
};