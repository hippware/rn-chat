import {Alert, AlertButton, AlertOptions} from 'react-native'

export default (
  title: any,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions
): void => {
  Alert.alert(title, message, buttons, options)
}
