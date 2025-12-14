// @ts-nocheck
const { verifyToken } = require('D:/fullstack-mern-app/server/middleware/auth.js');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      header: jest.fn()
    };
    
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    
    mockNext = jest.fn();
    
    jest.clearAllMocks();
  });

  test('should call next with valid token', async () => {
    const mockUser = { id: 'user123' };
    
    mockReq.header.mockReturnValue('Bearer valid-token-123');
    jwt.verify.mockReturnValue(mockUser);

    await verifyToken(mockReq, mockRes, mockNext);

    expect(mockReq.header).toHaveBeenCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalledWith('valid-token-123', process.env.JWT_SECRET);
    expect(mockReq.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });
});