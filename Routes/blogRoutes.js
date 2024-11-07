const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogController');

// Route to get all blog posts
router.get('/', blogController.getAllBlogs);

// Route to show the form for adding a new blog post
router.get('/new', blogController.showAddBlogForm);

// Route to create a new blog post
router.post('/new', blogController.addBlog);

// Route to show the form for editing an existing blog post
router.get('/edit/:id', blogController.showEditBlogForm);

// Route to update a blog post
router.post('/edit/:id', blogController.updateBlog);

// Route to delete a blog post
router.get('/delete/:id', blogController.deleteBlog);

router.get('/detail/:id', blogController.blogDetail);

module.exports = router;
