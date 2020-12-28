module.exports = {
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'reports',
  roots: ['<rootDir>/__tests__'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/__tests__/createTesterOptions.ts'],
  testEnvironment: 'node',
}
