global.window = global
jest.doMock('mobx-react/native', () => require('mobx-react/custom'))
jest.doMock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})
