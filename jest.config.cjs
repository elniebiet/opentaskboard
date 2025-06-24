module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testEnvironment: 'node'
};