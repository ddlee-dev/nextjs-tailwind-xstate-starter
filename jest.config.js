module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/client/**/*.{ts,tsx}',
    'src/pages/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.storybook/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./src/tests/jest.setup.ts'],
  testPathIgnorePatterns: [
    '/.next/',
    '/.storybook/',
    '/.github/',
    '/node_modules/',
    '/public/',
    '/coverage/',
    '/out/'
  ],
};