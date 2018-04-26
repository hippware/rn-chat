import React from 'react'
import {View, Animated, Alert, Image, TouchableOpacity, StyleSheet, Clipboard} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k, width, height} from '../Global'
import {colors} from '../../constants'
import {getSnapshot, isAlive} from 'mobx-state-tree'
import BotButtons from './BotButtons'
import UserInfoRow from './UserInfoRow'
import {RText} from '../common'
import BotDetailsMap from '../map/BotDetailsMap'
import {Actions} from 'react-native-router-flux'
import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  notificationStore?: any // TODO proper type
  analytics?: any // TODO proper type
  scale: number
}

type State = {
  fadeAnim: any
}

const DOUBLE_PRESS_DELAY = 300

@inject('notificationStore', 'analytics')
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
    const {bot, scale} = this.props
    if (!bot || !isAlive(bot)) return null
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: scale === 0 ? height - 60 * k : width,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}
        >
          <BotDetailsMap
            bot={bot}
            onMapPress={() => Actions.refresh({scale: 0})}
            onImagePress={() => {
              Actions.refresh({scale: scale === 1 ? 0.5 : scale + 0.5})
            }}
            scale={scale}
          />
          <Animated.View
            pointerEvents="none"
            style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}
          >
            <Image source={require('../../../images/iconBotAdded.png')} />
          </Animated.View>
        </View>
        {scale > 0 && (
          <View>
            <View style={styles.rowContainer}>
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
              {bot.guest && <GeofenceCTA bot={bot} />}
            </View>
            <View
              style={[
                styles.rowContainer,
                {
                  height: 45,
                  alignSelf: 'stretch',
                  marginTop: 8.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              <Image
                style={{width: 14, height: 14}}
                source={require('../../../images/postsIcon.png')}
              />
              <RText
                size={15}
                color={colors.DARK_PURPLE}
                style={{marginLeft: 7, letterSpacing: 0.3}}
              >
                Posts
              </RText>
              <RText size={12} color={colors.DARK_GREY} style={{marginLeft: 7}}>
                {bot.totalItems}
              </RText>
            </View>
            <View style={{height: 1, width}} />
          </View>
        )}
      </View>
    )
  }
}

const GeofenceCTA = observer(({bot}) => (
  <View style={{flexDirection: 'row'}}>
    <Image source={require('../../../images/footOpaquePink.png')} style={{width: 26, height: 34}} />
    <TouchableOpacity onPress={() => Actions.visitors({item: bot.id})}>
      <View style={{marginLeft: 10 * k}}>
        <RText color={colors.PINK} size={15}>
          See Who's Here
        </RText>
        <RText color={colors.DARK_GREY} size={12}>
          {bot.visitorsSize} people
        </RText>
      </View>
    </TouchableOpacity>
  </View>
))

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
