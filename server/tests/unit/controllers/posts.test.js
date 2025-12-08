const { createPost, getFeedPosts, likePost, gerUserPosts } = require('D:/fullstack-mern-app/server/controllers/posts.js');

// Моки без змінних
jest.mock('D:/fullstack-mern-app/server/models/Post.js', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
}));

jest.mock('D:/fullstack-mern-app/server/models/User.js', () => ({
  findById: jest.fn(),
  findOne: jest.fn()
}));

const Post = require('D:/fullstack-mern-app/server/models/Post.js');
const User = require('D:/fullstack-mern-app/server/models/User.js');

describe('Posts Controller - Unit Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      file: null
    };
    
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    jest.clearAllMocks();
  });

  describe('getFeedPosts', () => {
    test('should return all posts', async () => {
      const mockPosts = [
        { _id: 'post1', description: 'First post' },
        { _id: 'post2', description: 'Second post' }
      ];

      Post.find.mockResolvedValue(mockPosts);

      await getFeedPosts(mockReq, mockRes);

      expect(Post.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockPosts);
    });

    test('should handle database error', async () => {
      Post.find.mockRejectedValue(new Error('Database error'));

      await getFeedPosts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});