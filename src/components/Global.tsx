import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window')
export {width, height}
export const k = height / 667
export const s = height - 667 < 1 ? 1 - (667 - height) * 3.2 / 667 : 1 + (height - 667) * 1.2 / 667
export const minHeight = height - 667 < 1 ? 1 : 1 + (height - 667) * 1.2 / 667

export const defaultCover = [
  require('../../images/defaultCover0.png'),
  require('../../images/defaultCover1.png'),
  require('../../images/defaultCover2.png'),
  require('../../images/defaultCover3.png'),
]

export const isIphoneX = () => {
  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&
    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  )
}
