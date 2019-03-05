module.exports = {
  setupFiles: ['<rootDir>/third-party/wocky-client/test/support/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|native-base|react-clone-referenced-element|mobx|react-navigation|apsl-react-native-button)',
  ],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/third-party/wocky-client/test/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}
