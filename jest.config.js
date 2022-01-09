const path = require('path');
const root = path.resolve(__dirname);
module.exports = {
  rootDir: root,
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    'App/(.*)': '<rootDir>/src/$1',
    'Test/(.*)': '<rootDir>/test/$1',
  },
};
