module.exports = {
  roots: ['<rootDir>/__tests__'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts', 'd.ts'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/createTesterOptions.ts'],
  testEnvironment: 'node',
}
