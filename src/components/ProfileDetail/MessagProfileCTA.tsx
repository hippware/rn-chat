import React from 'react'
import {observer} from 'mobx-react-lite'
import {IProfile} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {avatarScale, minHeight} from '../Global'

type Props = {
  profile: IProfile
}

const MessageProfileCTA = observer(({profile}: Props) => {
  if (profile && profile.isFriend && !profile.isOwn) {
    return (
      <TouchableOpacity
        style={[
          styles.btnStyle,
          {
            right: -17 * minHeight,
            top: -10 * minHeight,
          },
        ]}
        onPress={() => Actions.chat({item: profile!.id})}
      >
        <Image
          style={{width: 40 * avatarScale, height: 40 * avatarScale}}
          source={require('../../../images/MessageBtn.png')}
        />
      </TouchableOpacity>
    )
  } else return null
})

const styles = StyleSheet.create({
  btnStyle: {
    position: 'absolute',
  },
})

export default MessageProfileCTA
