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
  testRegex: '(/__tests__/.*(test|spec)\\.(jsx?|tsx?))$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    'wocky-client': 'third-party/wocky-client/src',
  },
}
