import React from 'react'
import {TouchableOpacity, Share, Platform} from 'react-native'
import {useAnalytics, useWocky} from '../../utils/injectors'
import {Actions} from 'react-native-router-flux'
import {Props as LocationSettingsProps} from '../LiveLocation/LocationSettingsModal'
import {FriendShareTypeEnum} from 'src/wocky'

type Props = {
  style?: any
  children: any
  message?: string
}

/**
 * NOTE: currently this component is unused. It's been determined that (at least for the time being) we want to share app invitations
 * to friends/family via ContactInviteList rather than this type of "freestyle" message generation
 */
const ShareActivitySheet = ({children, style, message}: Props) => {
  const wocky = useWocky()
  const analytics = useAnalytics()

  const afterShareChoice = async (shareType: FriendShareTypeEnum) => {
    const m =
      message || 'Hello, I would like to share my location with you on a new app called tinyrobot!'
    analytics!.track('invite_friends')
    const url = await wocky!.userInviteMakeUrl(shareType)

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
