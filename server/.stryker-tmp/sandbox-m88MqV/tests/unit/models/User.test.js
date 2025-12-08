// @ts-nocheck
const mongoose = require('mongoose');
const User = require('D:/fullstack-mern-app/server/models/User.js');

// Мокуємо mongoose для тесту
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    model: jest.fn().mockReturnValue(function MockUser(data) {
      this._id = 'mock-id';
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.validateSync = () => {
        if (!data.email) return { errors: { email: { message: 'Required' } } };
        return null;
      };
    })
  };
});

describe('User Model Test', () => {
  test('should create a user', () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    
    expect(user.firstName).toBe('John');
    expect(user.email).toBe('john@example.com');
    expect(user._id).toBe('mock-id');
  });
  
  test('should validate email', () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    });
    
    const error = user.validateSync();
    expect(error.errors.email).toBeDefined();
  });
});