jest.mock('mobx-react/native', () => require('mobx-react/custom'))

jest.mock('NativeAnimatedHelper')

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})

jest.mock('moment', () => ({
  format: () => '2018–01–30T12:34:56+00:00',
  updateLocale: jest.fn(),
  relativeTimeThreshold: jest.fn(),
}))
