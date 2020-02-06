import React from 'react'
import {TouchableOpacity, Share, Platform} from 'react-native'
import {useFirebaseStore, useAnalytics} from '../../utils/injectors'
import {Actions} from 'react-native-router-flux'
import {Props as LocationSettingsProps} from '../LiveLocation/LocationSettingsModal'
import {FriendShareTypeEnum} from '../../../third-party/wocky-client/src'

type Props = {
  style?: any
  children: any
  message?: string
}

const ShareActivitySheet = ({children, style, message}: Props) => {
  const firebaseStore = useFirebaseStore()
  const analytics = useAnalytics()

  const afterShareChoice = async (_shareType: FriendShareTypeEnum) => {
    const m =
      message || 'Hello, I would like to share my location with you on a new app called tinyrobot!'
    analytics!.track('invite_friends')

    // todo: replace this with wocky.getFriendInviteLink(_shareType) when it's ready on the backend
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
    Actions.pop()
    analytics!.track('invite_friends_action_sheet', {action, activityType})
  }

  const share = () => {
    Actions.locationSettingsModal({
      settingsType: 'SEND_REQUEST',
      onOkPress: afterShareChoice,
    } as LocationSettingsProps)
  }

  return (
    <TouchableOpacity style={style} onPress={share}>
      {children}
    </TouchableOpacity>
  )
}

export default ShareActivitySheet
