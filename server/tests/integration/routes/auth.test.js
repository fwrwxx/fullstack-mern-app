const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('D:/fullstack-mern-app/server/routes/auth.js');
const User = require('D:/fullstack-mern-app/server/models/User.js');

let mongoServer;
let app;

describe('Auth Routes Integration Tests', () => {
  beforeAll(async () => {
    // Запускаємо in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    
    // Створюємо Express додаток
    app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        firstName: 'Integration',
        lastName: 'Test',
        email: 'integration@test.com',
        password: 'password123',
        location: 'Test City',
        occupation: 'Tester'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.email).toBe(userData.email);
      expect(response.body.firstName).toBe(userData.firstName);
      expect(response.body.password).not.toBe(userData.password); // Password should be hashed
    });

    it('should not register user with duplicate email', async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'duplicate@test.com',
        password: 'password123'
      };

      // Перша реєстрація
      await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      // Друга спроба з тим самим email
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      // Спочатку реєструємо користувача
      const userData = {
        firstName: 'Login',
        lastName: 'Test',
        email: 'login@test.com',
        password: 'password123'
      };

      await request(app)
        .post('/auth/register')
        .send(userData);

      // Тепер логін
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@test.com',
          password: 'password123'
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('login@test.com');
    });

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'wrongpassword'
        })
        .expect(400);

      expect(response.body).toHaveProperty('msg');
    });
  });
});