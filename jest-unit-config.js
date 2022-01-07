const config = require('./jest.config')
config.displayName = 'unit-tests'
config.testMatch = ['**/*.spec.ts']
module.exports = config
