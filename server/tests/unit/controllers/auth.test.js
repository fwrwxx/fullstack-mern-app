const { register, login } = require('D:/fullstack-mern-app/server/controllers/auth.js');
const User = require('D:/fullstack-mern-app/server/models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('D:/fullstack-mern-app/server/models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('should register a new user', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        save: jest.fn().mockResolvedValue(true)
      };

      mockReq.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      bcrypt.genSalt.mockResolvedValue('salt123');
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      User.mockImplementation(() => mockUser);

      await register(mockReq, mockRes);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });

  describe('login', () => {
    test('should login successfully', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'john@example.com',
        password: 'hashedPassword123'
      };

      mockReq.body = {
        email: 'john@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');

      await login(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });
});