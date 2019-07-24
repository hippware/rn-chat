import React from 'react'
import {observer} from 'mobx-react'
import {IProfile} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {avatarScale, minHeight} from '../Global'

type Props = {
  profile: IProfile
}

@observer
export default class MessageButton extends React.Component<Props> {
  render() {
    if (this.props.profile && this.props.profile.isFriend && !this.props.profile.isOwn) {
      return (
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              right: -17 * minHeight,
              top: -10 * minHeight,
            },
          ]}
          onPress={() => Actions.chat({item: this.props.profile!.id})}
        >
          <Image
            style={{width: 40 * avatarScale, height: 40 * avatarScale}}
            source={require('../../../images/MessageBtn.png')}
          />
        </TouchableOpacity>
      )
    } else return null
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    position: 'absolute',
  },
})
