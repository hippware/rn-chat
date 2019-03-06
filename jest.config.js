module.exports = {
  preset: 'react-native',
  setupFiles: ['./__tests__/utils/testSetup.ts', './node_modules/appcenter/test/AppCenterMock.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|native-base|react-clone-referenced-element|mobx|react-navigation|apsl-react-native-button)',
  ],
  modulePaths: ['<rootDir>', '<rootDir>/third-party/wocky-client/src'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    'wocky-client': 'third-party/wocky-client/src',
  },
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
}
