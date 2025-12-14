// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'middleware/**/*.js', 
    'models/**/*.js',
    'routes/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  verbose: true,
  forceExit: true,
  detectOpenHandles: true
};