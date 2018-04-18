// @flow

import React from 'react'
import {Alert, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import SelectableProfileList from '../../store/SelectableProfileList'
import FriendMultiSelect from './FriendMultiSelect'
import {colors} from '../../constants'
import {k} from '../Global'
import {IWocky, IBot} from 'wocky-client'

import {RText, BottomButton} from '../common'

type Props = {
  botId: string
  wocky: IWocky
  notificationStore: any // TODO proper
  store: any // TODO proper type
}

@inject('wocky', 'notificationStore', 'store')
@observer
class GeofenceShare extends React.Component<Props> {
  static rightButton = (props: Props) => <RightButton {...props} />

  selection = SelectableProfileList.create({})

  @observable bot?: IBot

  componentDidMount() {
    // console.log('cdm', this.selection)
    this.selection.clear()
    const {friends, getBot} = this.props.wocky
    this.bot = getBot({id: this.props.botId})
    this.selection.setList(friends.map(f => ({profile: f})))
    if (!this.props.store.sharePresencePrimed) Actions.sharePresencePrimer()
  }

  share = () => {
    const shareSelect = this.selection.selected.map(sp => sp.id)
    try {
      this.bot!.share(shareSelect, '', 'geofence share')
      const num = shareSelect.length
      this.props.notificationStore.flash(
        `Presence shared with ${num} ${num > 1 ? 'friends' : 'friend'} 🎉`
      )
      Actions.pop({animated: false})
      Actions.botDetails({item: this.props.botId, isNew: true})
    } catch (e) {
      Alert.alert('There was a problem sharing the bot.')
      // console.warn(e)
    }
  }

  render() {
    if (!this.selection) return null
    const selected = this.selection.selected.length > 0
    return (
      <Screen>
        <FriendMultiSelect
          selection={this.selection}
          botTitle={this.bot && this.bot.title ? this.bot.title : ''}
          inviteMessage="To share presence!"
        />
        <BottomButton isDisabled={!selected} onPress={this.share}>
          <RText size={15} color="white" style={styles.shareText}>
            Share Presence
          </RText>
        </BottomButton>
      </Screen>
    )
  }
}

const RightButton = observer(({botId}) => {
  return (
    <TouchableOpacity
      style={{marginRight: 15 * k}}
      // tslint:disable-next-line
      onPress={() => {
        // TODO: fix hacky nav animation
        Actions.pop({animated: false})
        Actions.botDetails({item: botId, isNew: true})
      }}
    >
      <RText size={15} color={colors.DARK_GREY}>
        Skip
      </RText>
    </TouchableOpacity>
  )
})

export default GeofenceShare

const styles = StyleSheet.create({
  shareButton: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 0,
    backgroundColor: colors.PINK,
  },
  shareText: {
    letterSpacing: 0.8,
  },
})
