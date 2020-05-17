module.exports = {
  modulePaths: ['<rootDir>/'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
    '!**/stories/**',
    '!**/test/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage'
};
