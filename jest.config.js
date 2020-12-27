module.exports = {
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'reports',
  projects: ['<rootDir>/packages/rules'],
  testEnvironment: 'node',
}
