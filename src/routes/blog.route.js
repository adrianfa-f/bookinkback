import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware.js';
import {
    getPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/blog.controller.js';

const router = Router();

router.get('/', getPosts);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

export default router;