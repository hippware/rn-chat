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
