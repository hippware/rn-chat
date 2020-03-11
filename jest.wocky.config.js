module.exports = {
  setupFiles: ['<rootDir>/__tests__/wocky/support/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|native-base|react-clone-referenced-element|mobx|react-navigation|apsl-react-native-button)',
  ],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/__tests__/wocky/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}
