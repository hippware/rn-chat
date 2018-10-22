import {Alert, AlertButton, AlertOptions} from 'react-native'

export default (
  title: any,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
  type?: string
): void => {
  Alert.alert(title, message, buttons, options, type)
}
