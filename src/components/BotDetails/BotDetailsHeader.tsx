import React from 'react'
import {View, Animated, Alert, Image, StyleSheet, Clipboard, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k, width} from '../Global'
import {colors} from '../../constants'
import {getSnapshot, isAlive} from 'mobx-state-tree'
import ActionButton from './ActionButton'
// import UserInfoRow from './UserInfoRow'
import {RText, ProfileHandle, ProfileStack} from '../common'
import {IBot, IProfile} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import Separator from './Separator'
import {Actions} from 'react-native-router-flux'
import ProfileAvatar from '../ProfileAvatar'

type Props = {
  bot: IBot
  locationStore?: ILocationStore
  notificationStore?: any // TODO proper type
  analytics?: any // TODO proper type
}

type State = {
  fadeAnim: any
}

const DOUBLE_PRESS_DELAY = 300
const shareIcon = require('../../../images/shareIcon.png')

@inject('notificationStore', 'analytics', 'locationStore')
@observer
class BotDetailsHeader extends React.Component<Props, State> {
  lastImagePress?: number
  userInfo: any

  constructor(props: Props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  handleImagePress = () => {
    const now = new Date().getTime()

    if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress
      this.handleImageDoublePress()
    } else {
      this.lastImagePress = now
    }
  }

  handleImageDoublePress = () => {
    if (!this.props.bot.isSubscribed) {
      this.subscribe()
    }
  }

  unsubscribe = () => {
    Alert.alert('', 'Are you sure you want to remove this from your saved bots?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => this.props.bot.unsubscribe(),
      },
    ])
  }

  subscribe = () => {
    this.props.bot.subscribe()
    this.setState({fadeAnim: new Animated.Value(1)})
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {toValue: 0}).start()
    }, 500)
    this.props.analytics.track('bot_save', getSnapshot(this.props.bot))
  }

  copyAddress = () => {
    Clipboard.setString(this.props.bot.address)
    this.props.notificationStore.flash('Address copied to clipboard 👍')
  }

  render() {
    const {bot, locationStore} = this.props
    if (!bot || !isAlive(bot)) return null
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <RText
            size={18}
            color={colors.DARK_PURPLE}
            style={{width: '75%', textAlign: 'center'}}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bot.title}
          </RText>
          <ActionButton
            bot={bot}
            style={{position: 'absolute', right: 0}}
            subscribe={this.subscribe}
            unsubscribe={this.unsubscribe}
            isSubscribed={bot.isSubscribed}
            copyAddress={this.copyAddress}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 10 * k, justifyContent: 'center'}}>
          <Pill>{bot.addressData.locationShort}</Pill>
          <Pill>{locationStore.distanceFromBot(bot.location)}</Pill>
        </View>

        <Separator style={{marginHorizontal: 5}} />

        <VisitorsArea bot={bot} />

        <View style={styles.userInfoRow}>
          <ProfileAvatar profile={bot.owner} size={40 * k} />
          {bot.owner && (
            <ProfileHandle
              style={{marginLeft: 10 * k, flex: 1}}
              onPress={() => Actions.profileDetails({item: bot.owner.id})}
              size={15}
              profile={bot.owner}
            />
          )}

          {/* TODO: add bot.createdAt when ready on the backend */}
        </View>
        {!!bot.description && (
          <View style={styles.descriptionContainer}>
            <RText numberOfLines={0} size={16} weight="Light" color={colors.DARK_PURPLE}>
              {bot.description}
            </RText>
          </View>
        )}
        <Image
          source={bot.image ? bot.image.thumbnail : null}
          style={{width, height: width, marginHorizontal: -20 * k}}
          resizeMode="contain"
        />
        {/* <View style={{flex: 1, height: 1000, backgroundColor: 'red'}} /> */}
        <Separator style={{marginHorizontal: 5}} />
      </View>
    )
  }
}

const VisitorsArea = ({bot}: {bot: IBot}) => {
  let list: IProfile[], size: number, text: string
  if (!bot) return null
  if (bot.visitors.list.length > 0) {
    list = bot.visitors.list
    size = bot.visitorsSize
    text = 'are currently here!'
  } else if (bot.guests.list.length > 0) {
    list = bot.guests.list
    size = bot.guestsSize
    text = 'accepted the invite!'
  }
  return bot.owner && (bot.owner.isOwn || list) ? (
    <View style={{alignItems: 'center'}}>
      {list && (
        <TouchableOpacity
          onPress={() => Actions.visitors({item: bot.id})}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingVertical: 20,
          }}
        >
          <ProfileStack
            firstProfile={list[0]}
            stackSize={size}
            circleSize={50}
            textSize={16.5}
            style={{marginBottom: 10 * k}}
          />
          <RText size={14}>{text}</RText>
        </TouchableOpacity>
      )}
      {bot.owner.isOwn && (
        <TouchableOpacity
          style={styles.invite}
          onPress={() => Actions.geofenceShare({botId: bot.id})}
        >
          <Image source={shareIcon} />
          <RText size={16} pink style={{marginLeft: 12}}>
            Invite
          </RText>
        </TouchableOpacity>
      )}
      <Separator style={{width: '100%', marginHorizontal: 5}} />
    </View>
  ) : null
}

const Pill = ({children}) => (
  <View
    style={{
      backgroundColor: colors.PINK, // TODO: change to gradient
      paddingHorizontal: 10 * k,
      paddingVertical: 3 * k,
      borderRadius: 5,
      marginRight: 5 * k,
    }}
  >
    <RText size={12} weight="Medium" color={colors.WHITE}>
      {children}
    </RText>
  </View>
)

export default BotDetailsHeader

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'white',
    padding: 20 * k,
  },
  descriptionContainer: {
    paddingBottom: 15 * k,
  },
  botAddedContainer: {
    height: width,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  invite: {
    height: 40 * k,
    width: 120 * k,
    borderRadius: 20 * k,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.PINK,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10 * k,
  },
})
