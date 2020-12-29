module.exports = {
  roots: ['<rootDir>/__tests__'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/__tests__/createTesterOptions.ts'],
  testEnvironment: 'node',
}
