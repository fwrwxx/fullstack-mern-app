// @ts-nocheck
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const usersRoutes = require('D:/fullstack-mern-app/server/routes/users.js');
const User = require('D:/fullstack-mern-app/server/models/User.js');
const jwt = require('jsonwebtoken');

let mongoServer;
let app;
let authToken;
let testUserId;

describe('Users Routes Integration Tests', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    
    app = express();
    app.use(express.json());
    app.use('/users', usersRoutes);
    
    // Створюємо тестового користувача
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@integration.com',
      password: 'hashedpassword',
      location: 'Test City',
      occupation: 'Developer'
    });
    
    testUserId = testUser._id;
    authToken = jwt.sign({ id: testUserId }, process.env.JWT_SECRET || 'test-secret');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /users/:id', () => {
    it('should get user by ID with valid token', async () => {
      const response = await request(app)
        .get(`/users/${testUserId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.email).toBe('test@integration.com');
    });

    it('should return 403 without token', async () => {
      await request(app)
        .get(`/users/${testUserId}`)
        .expect(403);
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/users/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id/friends', () => {
    it('should return user friends list', async () => {
      // Створюємо друзів
      const friend1 = await User.create({
        firstName: 'Friend',
        lastName: 'One',
        email: 'friend1@test.com',
        password: 'password123'
      });

      const friend2 = await User.create({
        firstName: 'Friend',
        lastName: 'Two',
        email: 'friend2@test.com',
        password: 'password123'
      });

      // Додаємо друзів до тестового користувача
      await User.findByIdAndUpdate(testUserId, {
        friends: [friend1._id, friend2._id]
      });

      const response = await request(app)
        .get(`/users/${testUserId}/friends`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('firstName', 'Friend');
    });
  });
});