import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacityProps,
  Alert,
  Clipboard,
} from 'react-native'
import BottomPopup from './BottomPopup'
import {isAlive, getSnapshot} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {IHomeStore} from '../store/HomeStore'
import {RText} from './common'
import {colors} from '../constants'
import {k, width} from './Global'
import {ILocationStore} from '../store/LocationStore'
import BotButtons from './BotDetails/BotButtons'
import UserInfoRow from './BotDetails/UserInfoRow'

type Props = {
  homeStore?: IHomeStore
  locationStore?: ILocationStore
  analytics?: any
  notificationStore?: any
}

@inject('homeStore', 'locationStore', 'notificationStore', 'analytics')
@observer
export default class LocationDetails extends React.Component<Props> {
  render() {
    const {homeStore, locationStore} = this.props
    const {detailBot: bot} = homeStore
    return (
      <BottomPopup show={homeStore.bottomSliderState === 'loc-details'}>
        {bot &&
          isAlive(bot) && (
            <View style={{padding: 20 * k}}>
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
              <UserInfoRow bot={bot} copyAddress={this.copyAddress} />
              {!!bot.description && (
                <View style={styles.descriptionContainer}>
                  <RText numberOfLines={0} size={16} weight="Light" color={colors.DARK_PURPLE}>
                    {bot.description}
                  </RText>
                </View>
              )}
              <Image
                source={bot.image.thumbnail}
                style={{width, height: width, marginHorizontal: -20 * k}}
                resizeMode="contain"
              />
            </View>
          )}
      </BottomPopup>
    )
  }

  subscribe = () => {
    const bot = this.props.homeStore.detailBot
    bot.subscribe()
    // this.setState({fadeAnim: new Animated.Value(1)})
    // setTimeout(() => {
    //   Animated.timing(this.state.fadeAnim, {toValue: 0}).start()
    // }, 500)
    this.props.analytics.track('bot_save', getSnapshot(bot))
  }

  unsubscribe = () => {
    Alert.alert('', 'Are you sure you want to remove this from your saved bots?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => this.props.homeStore.detailBot.unsubscribe(),
      },
    ])
  }

  copyAddress = () => {
    Clipboard.setString(this.props.homeStore.detailBot.address)
    this.props.notificationStore.flash('Address copied to clipboard 👍')
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
