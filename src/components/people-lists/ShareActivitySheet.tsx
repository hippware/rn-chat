import React from 'react'
import {TouchableOpacity, Share, Platform} from 'react-native'
import {useFirebaseStore, useWocky, useAnalytics} from '../../utils/injectors'

type Props = {
  style?: any
  children: any
  message?: string
}

const ShareActivitySheet = ({children, style, message}: Props) => {
  const firebaseStore = useFirebaseStore()
  const wocky = useWocky()
  const analytics = useAnalytics()

  const share = async () => {
    const m =
      message ||
      `Hey! Check out my favorite places in the world on tinyrobot! Add me as @${
        wocky.profile!.handle
      }.`
    analytics!.track('invite_friends')
    const url = await firebaseStore!.getFriendInviteLink()

    // https://facebook.github.io/react-native/docs/share
    const {action, activityType} = await (Share as any).share(
      {
        message: `${m} Download the app at${Platform.OS === 'android' ? ` ${url}` : ''}`,
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
