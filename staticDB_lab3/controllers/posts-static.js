import db from '../static-db.js';

/* CREATE POST */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        
        if (!userId || !description) {
            return res.status(400).json({ error: "User ID and description are required" });
        }

        const user = await db.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newPost = await db.createPost({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location || "",
            description,
            picturePath: picturePath || "",
            userPicturePath: user.picturePath || ""
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (err) {
        console.error('Create post error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* GET FEED POSTS */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await db.findAllPosts();
        
        const sortedPosts = posts.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json(sortedPosts);
    } catch (err) {
        console.error('Get feed posts error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* GET USER POSTS */
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await db.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await db.findPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Get user posts error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* LIKE/UNLIKE POST */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        
        if (!id || !userId) {
            return res.status(400).json({ error: "Post ID and User ID are required" });
        }

        const post = await db.findPostById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const user = await db.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isLiked = post.likes && post.likes[userId];
        
        if (isLiked) {
            delete post.likes[userId];
        } else {
            post.likes = post.likes || {};
            post.likes[userId] = true;
        }

        const updatedPost = await db.updatePost(id, { likes: post.likes });
        
        res.status(200).json({
            message: isLiked ? "Post unliked" : "Post liked",
            post: updatedPost,
            isLiked: !isLiked
        });
    } catch (err) {
        console.error('Like post error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* ADD COMMENT TO POST */
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, text } = req.body;
        
        if (!id || !userId || !text) {
            return res.status(400).json({ error: "Post ID, User ID, and comment text are required" });
        }

        const post = await db.findPostById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const user = await db.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newComment = {
            id: Date.now().toString(),
            userId,
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userPicturePath: user.picturePath || "",
            text,
            createdAt: new Date()
        };

        const comments = post.comments || [];
        comments.push(newComment);

        const updatedPost = await db.updatePost(id, { comments });
        
        res.status(200).json({
            message: "Comment added successfully",
            post: updatedPost,
            comment: newComment
        });
    } catch (err) {
        console.error('Add comment error:', err);
        res.status(500).json({ error: err.message });
    }
};