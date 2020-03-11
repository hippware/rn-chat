import React, {useRef} from 'react'
import {TouchableOpacity, Alert, Image} from 'react-native'
import {observer} from 'mobx-react'
import ActionSheet from 'react-native-actionsheet'
import {Actions} from 'react-native-router-flux'
import {useAnalytics} from '../../utils/injectors'
import {toJS} from 'mobx'
import {IProfile} from 'src/wocky'

type Props = {
  profile: IProfile
}

const ProfileActionSheet = observer(({profile}: Props) => {
  const actionSheet = useRef<ActionSheet>(null)
  const {handle} = profile
  const {track} = useAnalytics()

  const onTap = async (index: number) => {
    switch (index) {
      case 0:
        Alert.alert('', `Are you sure you want to unfriend @${handle}?`, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Unfriend',
            style: 'destructive',
            onPress: async () => {
              await profile.unfriend()
              track('user_unfollow', toJS(profile))
              Actions.popTo('home')
            },
          },
        ])
        return
      case 1:
        Actions.reportUser({userId: profile.id})
        return
      case 2:
        Alert.alert(
          `Are you sure you want to block @${handle}?`,
          `If you’re friends, blocking @${handle} will unfriend him/her, and you will no longer be able to view each other's profiles and bots.`,
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Block',
              style: 'destructive',
              onPress: async () => {
                await profile.block()
                Actions.pop()
              },
            },
          ]
        )
        return
    }
  }
  if (profile && profile.isOwn === false) {
    return (
      <TouchableOpacity
        onPress={() => actionSheet.current!.show()}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 24,
          height: 24,
          marginRight: '4%',
          justifyContent: 'center',
        }}
      >
        <Image source={require('../../../images/ellipsis.png')} />
        <ActionSheet
          ref={actionSheet}
          options={['Unfriend', 'Report', 'Block', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={2}
          onPress={onTap}
        />
      </TouchableOpacity>
    )
  } else return null
})

export default ProfileActionSheet
