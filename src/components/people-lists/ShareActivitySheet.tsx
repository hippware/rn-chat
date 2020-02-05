import React from 'react'
import {TouchableOpacity, Share, Platform} from 'react-native'
import {useFirebaseStore, useAnalytics} from '../../utils/injectors'

type Props = {
  style?: any
  children: any
  message?: string
}

const ShareActivitySheet = ({children, style, message}: Props) => {
  const firebaseStore = useFirebaseStore()
  const analytics = useAnalytics()

  const share = async () => {
    const m =
      message || 'Hello, I would like to share my location with you on a new app called tinyrobot!'
    analytics!.track('invite_friends')
    const url = await firebaseStore!.getFriendInviteLink()

    // https://facebook.github.io/react-native/docs/share
    const {action, activityType} = await (Share as any).share(
      {
        message: `${m} Please download the app here:${Platform.OS === 'android' ? ` ${url}` : ''}`,
        // title: 'title',
        url,
      },
      {
        subject: 'Check out tinyrobot',
        // excludedActivityTypes: [],
        // tintColor: ''
      }
    )
    analytics!.track('invite_friends_action_sheet', {action, activityType})
  }

  return (
    <TouchableOpacity style={style} onPress={share}>
      {children}
    </TouchableOpacity>
  )
}

export default ShareActivitySheet
