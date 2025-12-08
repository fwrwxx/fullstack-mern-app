import express from 'express';
import { 
    getFeedPosts, 
    getUserPosts, 
    likePost,
    createPost,
    addComment 
} from '../controllers/posts-static.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* CREATE */
router.post('/', verifyToken, createPost);

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);
router.post('/:id/comment', verifyToken, addComment);

export default router;