import express from 'express';
import blogController from '../controllers/blogController.js';
const router = express.Router();

router
.get('/', blogController.getLatestBlogs)
.get('/:blogId', blogController.getBlogById)
.post('/', blogController.addBlog)

export default router;