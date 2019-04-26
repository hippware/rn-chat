import React from 'react'
import {Alert, TouchableOpacity, StyleSheet, View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import FriendMultiSelect from './FriendMultiSelect'
import {colors} from '../../constants'
import {k, minHeight} from '../Global'
import {IWocky, IBot} from 'wocky-client'

import {RText, BottomButton} from '../common'
import {ISearchStore} from '../../store/SearchStore'

type Props = {
  botId: string
  wocky: IWocky
  notificationStore: any // TODO proper
  store: any // TODO proper type
  analytics?: any
  searchStore?: ISearchStore
}

@inject('wocky', 'notificationStore', 'store', 'analytics', 'searchStore')
@observer
class GeofenceShare extends React.Component<Props> {
  static rightButton = (props: Props) => <RightButton {...props} />
  @observable bot?: IBot

  componentDidMount() {
    const {getBot, profile} = this.props.wocky!
    this.bot = getBot({id: this.props.botId})
    this.props.searchStore!.localResult.setList(profile!.sortedFriends.map(f => ({profile: f})))
    if (!this.props.store.sharePresencePrimed) {
      // NOTE: had to add a delay to prevent immediately closing
      setTimeout(() => Actions.sharePresencePrimer(), 2000)
    }
  }

  share = async () => {
    const shareSelect = this.props.searchStore!.localResult.selected.map(sp => sp.id)
    try {
      // TODO: implement share (no accept needed) later when we restore public bots
      // this.bot!.share(shareSelect, '', 'geofence share')

      await this.bot!.invite(shareSelect)

      const firstFriend = this.props.wocky!.profiles.get(shareSelect[0])
      const numOthers = shareSelect.length - 1
      this.props.notificationStore.flash(
        `Invited @${firstFriend.handle}${
          numOthers > 0 ? ` and ${numOthers} ${numOthers > 1 ? 'others' : 'other'}` : ''
        } to follow the location`
      )
      Actions.popTo('home')
      Actions.botDetails({botId: this.props.botId, isNew: true})
      this.props.analytics.track('bot_share_geo')
    } catch (e) {
      Alert.alert('There was a problem sharing the bot.')
      // console.warn(e)
    }
  }

  render() {
    const selection = this.props.searchStore!.localResult
    const selected = selection.selected.length > 0
    return (
      <Screen>
        <View style={{marginBottom: 50 * minHeight, flex: 1}}>
          <FriendMultiSelect
            selection={selection}
            botTitle={this.bot && this.bot.title ? this.bot.title : ''}
            inviteMessage="To share presence!"
          />
        </View>

        <BottomButton isDisabled={!selected} onPress={this.share}>
          <RText size={15} color="white" style={styles.shareText}>
            Invite to Follow Location
          </RText>
        </BottomButton>
      </Screen>
    )
  }
}

const RightButton = inject('analytics')(
  observer(({botId, analytics}) => {
    return (
      <TouchableOpacity
        style={{marginRight: 15 * k}}
        // tslint:disable-next-line
        onPress={() => {
          // TODO: fix hacky nav animation
          Actions.pop({animated: false})
          Actions.botDetails({botId, isNew: true})
          analytics.track('bot_share_geo_skip')
        }}
      >
        <RText size={15} color={colors.DARK_GREY}>
          Skip
        </RText>
      </TouchableOpacity>
    )
  })
)

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
