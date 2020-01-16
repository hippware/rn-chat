import React, {useRef} from 'react'
import {TouchableOpacity, Alert, Image} from 'react-native'
import {observer} from 'mobx-react'
import ActionSheet from 'react-native-actionsheet'
import {Actions} from 'react-native-router-flux'

type Props = {
  profile: any
}

const ProfileActionSheet = observer(({profile}: Props) => {
  const actionSheet = useRef<ActionSheet>(null)

  const onTap = (index: number) => {
    if (index === 0) {
      Actions.reportUser({userId: profile.id})
    } else if (index === 1) {
      const {handle} = profile
      Alert.alert(
        `Are you sure you want to block @${handle}?`,
        `If you’re friends, blocking @${handle} will unfriend him/her, and you will no longer be able to view each other's profiles and bots.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Block',
            style: 'destructive',
            onPress: async () => {
              // TODO: spinner
              await profile.block()
              Actions.pop()
            },
          },
        ]
      )
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
          options={['Report', 'Block', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={onTap}
        />
      </TouchableOpacity>
    )
  } else return null
})

export default ProfileActionSheet
