import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth-static.js';
import usersRoutes from './routes/users-static.js';
import postsRoutes from './routes/posts-static.js';

import { register } from './controllers/auth-static.js';
import { createPost } from './controllers/posts-static.js';
import { verifyToken } from './middleware/auth.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* ROUTES WITH FILES */
app.post('/auth/register', register);
app.post('/posts', verifyToken, createPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

/* HEALTH CHECK */
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Social Media API is running with static database',
        timestamp: new Date().toISOString()
    });
});

/* ROOT ENDPOINT */
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Social Media API with Static Database',
        version: '1.0.0',
        endpoints: {
            auth: {
                register: 'POST /auth/register',
                login: 'POST /auth/login'
            },
            users: {
                getUser: 'GET /users/:id',
                getFriends: 'GET /users/:id/friends',
                addRemoveFriend: 'PATCH /users/:id/:friendId',
                search: 'GET /users/search?query=...'
            },
            posts: {
                createPost: 'POST /posts',
                getFeed: 'GET /posts',
                getUserPosts: 'GET /posts/:userId/posts',
                likePost: 'PATCH /posts/:id/like',
                addComment: 'POST /posts/:id/comment'
            }
        }
    });
});

/* ERROR HANDLING */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status || 500
        }
    });
});

/* SERVER START */
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Using static database implementation`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API Documentation: http://localhost:${PORT}/`);
});