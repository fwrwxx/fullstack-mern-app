import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users, posts } from './data/index.js';
import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  
  // Очистити існуючі дані
  await User.deleteMany({});
  await Post.deleteMany({});
  
  // Додати нові дані
  await User.insertMany(users);
  await Post.insertMany(posts);
  
  console.log('Data seeded successfully');
  process.exit(0);
}).catch((error) => {
  console.log(`${error} did not connect`);
  process.exit(1);
});