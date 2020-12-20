module.exports = {
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'reports',
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/tests/__utils__'],
  testEnvironment: 'node',
}
