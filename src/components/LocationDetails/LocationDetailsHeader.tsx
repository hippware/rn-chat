import React from 'react'
import {View, Animated, Alert, Image, StyleSheet, Clipboard} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k, width} from '../Global'
import {colors} from '../../constants'
import {getSnapshot, isAlive} from 'mobx-state-tree'
import BotButtons from './BotButtons'
import UserInfoRow from './UserInfoRow'
import {RText} from '../common'
import {IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import Separator from './Separator'

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
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20 * k,
          backgroundColor: 'white',
        }}
      >
        <RText size={18} color={colors.DARK_PURPLE}>
          {bot.title}
        </RText>
        <View style={{flexDirection: 'row', marginTop: 10 * k}}>
          <Pill>{bot.addressData.locationShort}</Pill>
          <Pill>{locationStore.distanceFromBot(bot.location)}</Pill>
        </View>
        <BotButtons
          bot={bot}
          subscribe={this.subscribe}
          unsubscribe={this.unsubscribe}
          isSubscribed={bot.isSubscribed}
          copyAddress={this.copyAddress}
        />
        <UserInfoRow profile={bot.owner} copyAddress={this.copyAddress} />
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

// const GeofenceCTA = inject('analytics')(
//   observer(({bot, analytics}) => (
//     <View style={{flexDirection: 'row'}}>
//       <Image
//         source={require('../../../images/footOpaquePink.png')}
//         style={{width: 26, height: 34}}
//       />
//       <TouchableOpacity
//         onPress={() => {
//           Actions.visitors({item: bot.id})
//           analytics.track('geofence_visitors_view')
//         }}
//       >
//         <View style={{marginLeft: 10 * k}}>
//           <RText color={colors.PINK} size={15}>
//             See Who's Here
//           </RText>
//           <RText color={colors.DARK_GREY} size={12}>
//             {bot.visitorsSize} people
//           </RText>
//         </View>
//       </TouchableOpacity>
//     </View>
//   ))
// )

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
})
