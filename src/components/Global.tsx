import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window')
export {width, height}
export const k = height / 667
// scales spacing based on screensize (different ratios for smaller screens vs larger screens)
export const s = height - 667 < 0 ? 1 - (667 - height) * 3.2 / 667 : 1 + (height - 667) * 1.2 / 667
// scales spacing based on screensize (only when screensize is larger than iphone 8)
export const minHeight = height - 667 < 0 ? 1 : 1 + (height - 667) * 1.2 / 667
// scales avatar based on screensize (different ratios for smaller screens vs larger screens)
export const avatarScale = height - 667 < 0 ? 1 : 1 + (height - 667) * 0.8 / 667

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
