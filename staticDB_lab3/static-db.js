export class StaticDB {
    constructor() {
        this.users = new Map();
        this.posts = new Map();
        this.nextUserId = 100;
        this.nextPostId = 100;
        
        this.initSampleData();
    }
    
    initSampleData() {
        const sampleUsers = [
            {
                _id: "1",
                firstName: "Тарас",
                lastName: "Шевченко",
                email: "taras@example.com",
                password: "$2b$10$examplehashedpassword123",
                picturePath: "p11.jpeg",
                friends: ["2", "3"],
                location: "Канів, Україна",
                occupation: "Поет",
                viewedProfile: 15421,
                impressions: 402311,
                createdAt: new Date('2023-01-01'),
                updatedAt: new Date('2023-01-01')
            },
            {
                _id: "2",
                firstName: "Леся",
                lastName: "Українка",
                email: "lesya@example.com",
                password: "$2b$10$examplehashedpassword456",
                picturePath: "p3.jpeg",
                friends: ["1"],
                location: "Звягель, Україна",
                occupation: "Письменниця",
                viewedProfile: 22111,
                impressions: 88855,
                createdAt: new Date('2023-01-02'),
                updatedAt: new Date('2023-01-02')
            },
            {
                _id: "3",
                firstName: "Іван",
                lastName: "Франко",
                email: "ivan@example.com",
                password: "$2b$10$examplehashedpassword789",
                picturePath: "p4.jpeg",
                friends: ["1"],
                location: "Нагуєвичі, Україна",
                occupation: "Філософ",
                viewedProfile: 34122,
                impressions: 21342,
                createdAt: new Date('2023-01-03'),
                updatedAt: new Date('2023-01-03')
            }
        ];

        const samplePosts = [
            {
                _id: "101",
                userId: "1",
                firstName: "Тарас",
                lastName: "Шевченко",
                location: "Канів, Україна",
                description: "Прокинувся сьогодні і зрозумів: якщо поезія не спрацює, завжди можу стати мотиваційним спікером для сумних селян.",
                picturePath: "post1.jpeg",
                userPicturePath: "p11.jpeg",
                likes: { "2": true, "3": true },
                comments: [
                    "Леся: Тарасе, будь ласка, перестань засмучувати всю стрічку.",
                    "Іван Ф.: Бро, селяни вже були сумні. Ти просто оптимізував процес."
                ],
                createdAt: new Date('2023-01-15'),
                updatedAt: new Date('2023-01-15')
            },
            {
                _id: "102",
                userId: "2",
                firstName: "Леся",
                lastName: "Українка",
                location: "Звягель, Україна",
                description: "Знову пишу драматичні вірші, бо хтось з'їв мою шоколадку. Трагедія дійсно слідує за мною скрізь.",
                picturePath: "post2.jpeg",
                userPicturePath: "p3.jpeg",
                likes: { "1": true },
                comments: [
                    "Тарас: Шоколадка - тимчасова. Драма - вічна. Ти зробив правильний вибір."
                ],
                createdAt: new Date('2023-01-16'),
                updatedAt: new Date('2023-01-16')
            }
        ];

        sampleUsers.forEach(user => {
            this.users.set(user._id, user);
        });

        samplePosts.forEach(post => {
            this.posts.set(post._id, post);
        });
    }
    
    // ========== USER METHODS ==========
    async createUser(userData) {
        const id = this.nextUserId.toString();
        this.nextUserId++;
        
        const user = {
            _id: id,
            ...userData,
            friends: [],
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.users.set(id, user);
        return user;
    }
    
    async findUserById(id) {
        return this.users.get(id) || null;
    }
    
    async findUserByEmail(email) {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }
    
    async updateUser(id, updates) {
        const user = this.users.get(id);
        if (!user) return null;
        
        const updatedUser = { 
            ...user, 
            ...updates, 
            updatedAt: new Date() 
        };
        
        this.users.set(id, updatedUser);
        return updatedUser;
    }
    
    async findAllUsers() {
        return Array.from(this.users.values());
    }
    
    // ========== POST METHODS ==========
    async createPost(postData) {
        const id = this.nextPostId.toString();
        this.nextPostId++;
        
        const post = {
            _id: id,
            ...postData,
            likes: {},
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.posts.set(id, post);
        return post;
    }
    
    async findPostById(id) {
        return this.posts.get(id) || null;
    }
    
    async findAllPosts() {
        return Array.from(this.posts.values());
    }
    
    async findPostsByUserId(userId) {
        return Array.from(this.posts.values())
            .filter(post => post.userId === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
    }
    
    async updatePost(id, updates) {
        const post = this.posts.get(id);
        if (!post) return null;
        
        const updatedPost = { 
            ...post, 
            ...updates, 
            updatedAt: new Date() 
        };
        
        this.posts.set(id, updatedPost);
        return updatedPost;
    }
    
    // ========== FRIEND METHODS ==========
    async addFriend(userId, friendId) {
        const user = await this.findUserById(userId);
        const friend = await this.findUserById(friendId);
        
        if (!user || !friend) {
            throw new Error('User or friend not found');
        }
        
        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
            await this.updateUser(userId, { friends: user.friends });
        }
        
        if (!friend.friends.includes(userId)) {
            friend.friends.push(userId);
            await this.updateUser(friendId, { friends: friend.friends });
        }
        
        return true;
    }
    
    async removeFriend(userId, friendId) {
        const user = await this.findUserById(userId);
        const friend = await this.findUserById(friendId);
        
        if (!user || !friend) {
            throw new Error('User or friend not found');
        }
        
        user.friends = user.friends.filter(id => id !== friendId);
        await this.updateUser(userId, { friends: user.friends });
        
        friend.friends = friend.friends.filter(id => id !== userId);
        await this.updateUser(friendId, { friends: friend.friends });
        
        return true;
    }
    
    async getFriends(userId) {
        const user = await this.findUserById(userId);
        if (!user) return [];
        
        const friends = [];
        for (const friendId of user.friends) {
            const friend = await this.findUserById(friendId);
            if (friend) {
                friends.push({
                    _id: friend._id,
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    occupation: friend.occupation,
                    location: friend.location,
                    picturePath: friend.picturePath
                });
            }
        }
        
        return friends;
    }
    
    // ========== HELPER METHODS ==========
    async isFriend(userId, friendId) {
        const user = await this.findUserById(userId);
        return user && user.friends.includes(friendId);
    }
    
    async searchUsers(query) {
        const allUsers = await this.findAllUsers();
        return allUsers.filter(user => 
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) ||
            user.occupation.toLowerCase().includes(query.toLowerCase()) ||
            user.location.toLowerCase().includes(query.toLowerCase())
        );
    }
}

const dbInstance = new StaticDB();
export default dbInstance;