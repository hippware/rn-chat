import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Alert, Share, Clipboard} from 'react-native'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'
import SaveOrEditButton from './SaveOrEditButton'
import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'
import {colors} from '../../constants'
import {autorun} from 'mobx'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {settings} from '../../globals'

type Props = {
  bot: IBot
  wocky?: IWocky
  locationStore?: ILocationStore
  copyAddress: () => void
  subscribe: () => void
  unsubscribe: () => void
  isSubscribed: boolean
  analytics?: any
}

@inject('wocky', 'locationStore', 'analytics')
@observer
class BotButtons extends React.Component<Props> {
  actionSheet: any
  handler: any

  componentDidMount() {
    this.handler = autorun(() => {
      if (this.props.wocky!.connected && this.props.bot.geofence && this.props.bot.guest) {
        if (!this.props.locationStore!.alwaysOn) {
          Actions.geofenceWarning({bot: this.props.bot})
          this.props.bot.unsubscribeGeofence()
        }
      }
    })
  }

  componentWillUnmount() {
    this.handler()
  }

  render() {
    const {bot} = this.props
    if (!bot || !bot.owner) return null
    const actions = bot.owner.isOwn ? ownerActions : nonOwnerActions
    const isShareable = bot.isPublic || bot.owner.isOwn
    const destructiveIndex = actions.findIndex((a: any) => !!a.destructive)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingBottom: 5 * k,
          marginVertical: 20 * k,
        }}
      >
        {bot.geofence && <GeofenceButton style={styles.button} bot={bot} />}
        <SaveOrEditButton style={styles.button} {...this.props} isOwn={bot.owner.isOwn} />
        {isShareable && (bot.owner.isOwn || !bot.geofence) && <ShareButton bot={bot} />}
        <MultiButton onPress={() => this.actionSheet.show()} />
        <ActionSheet
          ref={o => (this.actionSheet = o)}
          options={actions.map(a => a.name)}
          cancelButtonIndex={actions.length - 1}
          onPress={index => this.onTap(index, actions)}
          destructiveButtonIndex={destructiveIndex}
        />
      </View>
    )
  }

  onTap = (index: number, actions: any[]) => actions[index].action(this.props)
}

const ShareButton = ({bot}: {bot: IBot}) => (
  <TouchableOpacity
    onPress={() => Actions.botShareSelectFriends({botId: bot.id})}
    style={[styles.button, {marginLeft: 10 * k, backgroundColor: colors.WHITE}]}
  >
    <Image source={require('../../../images/shareIcon.png')} resizeMode="contain" />
  </TouchableOpacity>
)

const GeofenceButton = inject('store', 'analytics')(
  observer(
    ({bot, style, store, analytics}: {bot: IBot; style: any; store?: any; analytics?: any}) => {
      let onPress, buttonStyle, image
      if (bot.guest) {
        onPress = () =>
          Alert.alert(
            '',
            'Are you sure you want to stop sharing your presence? You will no longer see who’s here.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Stop Sharing',
                style: 'destructive',
                onPress: () => {
                  bot.unsubscribeGeofence()
                  analytics.track('bot_geoshare_off')
                },
              },
            ]
          )
        buttonStyle = [style, {marginRight: 10 * k}]
        image = require('../../../images/whiteFoot.png')
      } else {
        onPress = () => {
          bot.subscribeGeofence()
          if (!store.guestOnce) {
            Actions.firstTimeGuest({botId: 'a5cb8b80-21a4-11e8-92d5-0a580a020603'})
          }
          analytics.track('bot_geoshare_on')
        }
        buttonStyle = [style, {marginRight: 10 * k, backgroundColor: colors.WHITE}]
        image = require('../../../images/footIcon.png')
      }
      return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Image source={image} resizeMode="contain" />
        </TouchableOpacity>
      )
    }
  )
)

const MultiButton = props => (
  <TouchableOpacity
    style={[
      styles.button,
      {width: 44 * k, backgroundColor: colors.WHITE, flex: 0, marginLeft: 10 * k},
    ]}
    {...props}
  >
    <Image source={require('../../../images/editDots.png')} resizeMode="contain" />
  </TouchableOpacity>
)

export default BotButtons

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 40 * k,
    flexDirection: 'row',
    backgroundColor: colors.PINK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5 * k,
    borderColor: colors.PINK,
    borderWidth: 1,
  },
  buttonIcon: {
    marginRight: 5 * k,
  },
})

const copyAddr = {
  name: 'Copy Address',
  action: ({copyAddress}) => copyAddress(),
}

const linkPrefix = settings.isStaging
  ? 'http://html.dev.tinyrobot.com/bot/'
  : 'https://tinyro.bot/bot/'

const shareVia = {
  name: 'Share via',
  action: async ({bot, analytics}: {bot: IBot; analytics: any}) => {
    analytics.track('bot_share_link_choose_activity')
    const {action, activityType} = await (Share as any).share(
      {
        message: `Hey, take a look at "${bot.title}" on tinyrobot!`,
        // title: 'title',
        url: `${linkPrefix}${bot.id}`,
      },
      {
        subject: `Hey, take a look at "${bot.title}" on tinyrobot!`,
        // excludedActivityTypes: [],
        // tintColor: ''
      }
    )
    analytics.track('bot_share_link_choose_activity_choice', {action, activityType})
  },
}

const copyLink = {
  name: 'Copy Link',
  action: ({bot, analytics}) => {
    Clipboard.setString(`${linkPrefix}${bot.id}`)
    analytics.track('bot_share_link_copy')
  },
}

const cancel = {name: 'Cancel', action: () => {}} // tslint:disable-line

const ownerActions = [
  shareVia,
  copyLink,
  copyAddr,
  {name: 'Edit', action: ({bot}) => Actions.botEdit({botId: bot ? bot.id : null})},
  {
    name: 'Delete',
    action: ({wocky, bot}) => {
      Alert.alert('', 'Are you sure you want to delete this bot?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            wocky.removeBot(bot ? bot.id : null)
            Actions.pop()
            Actions.pop({animated: false})
          },
        },
      ])
    },
    destructive: true,
  },
  cancel,
]

const nonOwnerActions = [
  shareVia,
  copyLink,
  copyAddr,
  {
    name: 'Report',
    action: ({bot}) => Actions.reportBot({botId: bot.id}),
    destructive: true,
  },
  cancel,
]
