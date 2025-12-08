import db from '../static-db.js';

/* GET USER BY ID */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await db.findUserById(id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userResponse = { ...user };
        delete userResponse.password;

        res.status(200).json(userResponse);
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* GET USER FRIENDS */
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const userExists = await db.findUserById(id);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const friends = await db.getFriends(id);
        
        res.status(200).json(friends);
    } catch (err) {
        console.error('Get friends error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* ADD/REMOVE FRIEND */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        
        if (!id || !friendId) {
            return res.status(400).json({ error: "Both user ID and friend ID are required" });
        }

        if (id === friendId) {
            return res.status(400).json({ error: "Cannot add/remove yourself as a friend" });
        }

        const user = await db.findUserById(id);
        const friend = await db.findUserById(friendId);
        
        if (!user || !friend) {
            return res.status(404).json({ error: "User or friend not found" });
        }

        const areFriends = await db.isFriend(id, friendId);
        
        if (areFriends) {
            await db.removeFriend(id, friendId);
            const updatedFriends = await db.getFriends(id);
            
            res.status(200).json({
                message: "Friend removed successfully",
                friends: updatedFriends,
                isFriend: false
            });
        } else {
            await db.addFriend(id, friendId);
            const updatedFriends = await db.getFriends(id);
            
            res.status(200).json({
                message: "Friend added successfully",
                friends: updatedFriends,
                isFriend: true
            });
        }
    } catch (err) {
        console.error('Add/remove friend error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* SEARCH USERS */
export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim().length < 2) {
            return res.status(400).json({ error: "Search query must be at least 2 characters long" });
        }

        const users = await db.searchUsers(query.trim());
        
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.status(200).json(usersWithoutPasswords);
    } catch (err) {
        console.error('Search users error:', err);
        res.status(500).json({ error: err.message });
    }
};