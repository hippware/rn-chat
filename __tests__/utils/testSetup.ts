jest.mock('mobx-react', () => require('mobx-react/custom'))

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

// prevent "window is undefined" error in @absinthe/socket
;(global as any).window = global

jest.mock('NativeModules', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
  KeyboardObserver: {},
}))

jest.mock('Keyboard', () => ({
  addListener: jest.fn(),
}))

// https://github.com/kmagiera/react-native-reanimated/pull/276/files
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

jest.mock('@react-native-community/async-storage', () => {})
