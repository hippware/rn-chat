import React, {useState, useEffect} from 'react'
import {Alert, TouchableOpacity, StyleSheet, View} from 'react-native'
import {inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import FriendMultiSelect from './FriendMultiSelect'
import {colors} from '../../constants'
import {k, minHeight} from '../Global'
import {IWocky, IBot} from 'wocky-client'

import {RText, BottomButton} from '../common'
import {ISearchStore} from '../../store/SearchStore'
import NotificationStore from '../../store/NotificationStore'
import {observer} from 'mobx-react-lite'
import {useAnalytics} from 'src/utils/injectors'

type Props = {
  botId: string
  wocky: IWocky
  notificationStore: NotificationStore
  analytics?: any
  searchStore?: ISearchStore
}

const GeofenceShare = inject('wocky', 'notificationStore', 'analytics', 'searchStore')(
  observer(({botId, wocky, notificationStore, analytics, searchStore}: Props) => {
    const [bot, setBot] = useState<IBot | null>(null)

    useEffect(() => {
      const {getBot, profile} = wocky!
      const tempBot = getBot({id: botId})
      setBot(tempBot)
      searchStore!.localResult.setList(profile!.sortedFriends.map(f => ({profile: f})))
      if (!wocky!.profile!.clientData!.sharePresencePrimed) {
        // NOTE: had to add a delay to prevent immediately closing
        setTimeout(() => Actions.sharePresencePrimer(), 2000)
      }
    }, [])

    const share = async () => {
      const shareSelect = searchStore!.localResult.selected.map(sp => sp.id)
      try {
        // TODO: implement share (no accept needed) later when we restore public bots
        // bot!.share(shareSelect, '', 'geofence share')

        await bot!.invite(shareSelect)

        const firstFriend = wocky!.profiles.get(shareSelect[0])
        const num = shareSelect.length
        notificationStore.flash(
          `Invited ${
            num === 1 ? `@${firstFriend.handle}` : `${num} friends`
          } to follow the location`
        )
        Actions.popTo('home')
        Actions.botDetails({botId, isNew: true})
        analytics.track('bot_share_geo')
      } catch (e) {
        Alert.alert('There was a problem sharing the location.')
        // console.warn(e)
      }
    }

    const selection = searchStore!.localResult
    const selected = selection.selected.length > 0
    return (
      <Screen>
        <View style={{marginBottom: 50 * minHeight, flex: 1}}>
          <FriendMultiSelect
            selection={selection}
            botTitle={bot && bot.title ? bot.title : ''}
            inviteMessage="To share presence!"
          />
        </View>

        <BottomButton isDisabled={!selected} onPress={share}>
          <RText size={15} color="white" style={styles.shareText}>
            Invite to Follow Location
          </RText>
        </BottomButton>
      </Screen>
    )
  })
)
;(GeofenceShare as any).navigationOptions = ({navigation}) => {
  const props = navigation.state.params
  return {
    headerRight: <RightButton {...props} />,
  }
}

const RightButton = ({botId}: Props) => {
  const {track} = useAnalytics()
  return (
    <TouchableOpacity
      style={{marginRight: 15 * k}}
      onPress={() => {
        // TODO: fix hacky nav animation
        Actions.pop({animated: false})
        Actions.botDetails({botId, isNew: true})
        track('bot_share_geo_skip')
      }}
    >
      <RText size={15} color={colors.DARK_GREY}>
        Skip
      </RText>
    </TouchableOpacity>
  )
}

export default GeofenceShare

const styles = StyleSheet.create({
  shareText: {
    letterSpacing: 0.8,
  },
})
