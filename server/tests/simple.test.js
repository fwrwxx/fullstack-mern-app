const mongoose = require('mongoose');

describe('Simple Test', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('should have mongoose available', () => {
    expect(mongoose).toBeDefined();
    expect(typeof mongoose.connect).toBe('function');
  });
});