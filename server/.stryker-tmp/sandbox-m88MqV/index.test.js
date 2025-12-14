// @ts-nocheck
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bodyParser from 'body-parser';
import cors from 'cors';

export async function createServer() {
  const app = express();
  
  // Middleware
  app.use(bodyParser.json());
  app.use(cors());
  
  // Запуск in-memory MongoDB
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
  
  // Простий health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });
  
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
  
  const server = app.listen(0); // Випадковий порт
  
  return {
    app,
    server,
    mongoServer
  };
}