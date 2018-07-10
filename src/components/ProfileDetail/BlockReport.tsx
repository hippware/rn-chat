import React from 'react'
import {TouchableOpacity, Alert, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import ActionSheet from 'react-native-actionsheet'
import {Actions} from 'react-native-router-flux'

type Props = {
  profile: any
}

@observer
class BlockReport extends React.Component<Props> {
  actionSheet: any

  onTap = (index: number) => {
    if (index === 0) {
      Actions.reportUser({userId: this.props.profile.id})
    } else if (index === 1) {
      const {handle} = this.props.profile
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
              await this.props.profile.block()
              Actions.pop()
            },
          },
        ]
      )
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.actionSheet.show()}
        style={{
          marginLeft: 15,
          width: 24,
          height: 24,
          justifyContent: 'center',
        }}
      >
        <Image source={require('../../../images/ellipsis.png')} />
        <ActionSheet
          ref={o => (this.actionSheet = o)}
          options={['Report', 'Block', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={this.onTap}
        />
      </TouchableOpacity>
    )
  }
}

export default BlockReport
