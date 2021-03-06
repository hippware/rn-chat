import {Dimensions, Platform} from 'react-native'

const {width: dWidth, height: dHeight} = Dimensions.get('window')
let statusBarHeight = 0
if (Platform.OS === 'android') {
  const ED = require('react-native-extra-dimensions-android')
  statusBarHeight = ED.getStatusBarHeight()
}

export const width = dWidth
export const height = dHeight - statusBarHeight

export const k = height / 667
// scales spacing based on screensize (different ratios for smaller screens vs larger screens)
export const s =
  height - 667 < 0 ? 1 - ((667 - height) * 3.2) / 667 : 1 + ((height - 667) * 1.2) / 667
// scales spacing based on screensize (only when screensize is larger than iphone 8)
export const minHeight = height - 667 < 0 ? 1 : 1 + ((height - 667) * 1.2) / 667
// scales avatar based on screensize (different ratios for smaller screens vs larger screens)
export const avatarScale = height - 667 < 0 ? 1 : 1 + ((height - 667) * 0.8) / 667
// scales font based on screensize (different ratios for smaller screens vs larger screens)
// export const fontScale = height - 667 < 0 ? 1 : 1 + ((height - 667) * 0.3) / 667

export const isIphoneX = Platform.OS === 'ios' && (height === 812 || width === 812)
export const isIphone = Platform.OS === 'ios'
