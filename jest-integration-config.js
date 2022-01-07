const config = require('./jest.config')
config.displayName = 'integration-tests'
config.testMatch = ['**/*.test.ts']
module.exports = config
