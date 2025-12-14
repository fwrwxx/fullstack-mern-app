const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('D:/fullstack-mern-app/server/index.js');

let mongoServer;
let authToken;
let userId;

describe('End-to-End User Journey', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Зберігаємо посилання на сервер з app.js
    process.env.MONGO_URL = mongoUri;
    process.env.JWT_SECRET = 'e2e-test-secret';
    process.env.PORT = 5002; // Інший порт для тестів
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    // Закриваємо сервер якщо він запущений
  });

  beforeEach(async () => {
    // Очищаємо базу перед кожним тестом
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  describe('Complete User Flow', () => {
    it('should complete full registration, login, and profile flow', async () => {
      // 1. Реєстрація
      const registerResponse = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'E2E',
          lastName: 'User',
          email: 'e2e@test.com',
          password: 'password123',
          location: 'E2E City',
          occupation: 'E2E Tester'
        })
        .expect(201);

      expect(registerResponse.body.email).toBe('e2e@test.com');
      userId = registerResponse.body._id;

      // 2. Логін
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'e2e@test.com',
          password: 'password123'
        })
        .expect(200);

      expect(loginResponse.body.token).toBeDefined();
      authToken = loginResponse.body.token;

      // 3. Отримання профілю
      const profileResponse = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(profileResponse.body.firstName).toBe('E2E');
      expect(profileResponse.body.email).toBe('e2e@test.com');

      // 4. Створення поста
      const postResponse = await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: userId,
          description: 'My first E2E test post!',
          picturePath: 'e2e-test.jpg'
        })
        .expect(201);

      expect(Array.isArray(postResponse.body)).toBe(true);

      // 5. Отримання стрічки постів
      const feedResponse = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(feedResponse.body.length).toBeGreaterThan(0);
    }, 30000); // Збільшений timeout для E2E
  });
});