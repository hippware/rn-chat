import React, {ReactElement} from 'react'
import {
  View,
  Animated,
  Alert,
  Image,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
  Text,
} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k, width, minHeight} from '../Global'
import {colors} from '../../constants'
import {isAlive} from 'mobx-state-tree'
import {when} from 'mobx'
import ActionButton from './ActionButton'
// import UserInfoRow from './UserInfoRow'
import {RText, Spinner, ProfileHandle, ProfileStack, LazyImage} from '../common'
import {IBot, IProfile} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import Separator from './Separator'
import {Actions} from 'react-native-router-flux'
import ProfileAvatar from '../ProfileAvatar'
import {GREY} from 'src/constants/colors'
import {botProfileStyle} from '../styles'
import Pill from '../common/Pill'

type Props = {
  bot: IBot
  locationStore?: ILocationStore
  notificationStore?: any // TODO proper type
  analytics?: any // TODO proper type
}

type State = {
  fadeAnim: any
}

const shareIcon = require('../../../images/shareIcon.png')
const followIcon = require('../../../images/shoesPink.png')

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

  unsubscribe = () => {
    Alert.alert('', 'Are you sure you want to remove this from your saved locations?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => this.props.bot.unsubscribe(),
      },
    ])
  }

  copyAddress = () => {
    Clipboard.setString(this.props.bot.address)
    this.props.notificationStore.flash('Address copied to clipboard 👍')
  }

  acceptInvitation = () => {
    // avoid null locationStore.location here
    when(
      () => !!this.props.locationStore!.location,
      () => this.props.bot.acceptInvitation(this.props.locationStore!.location!)
    )
  }

  render() {
    const {bot, locationStore} = this.props
    if (!bot || !isAlive(bot))
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Spinner />
        </View>
      )
    if (bot.error) return <BotUnavailable />
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <RText
            size={21}
            color={colors.DARK_PURPLE}
            style={{width: '75%', textAlign: 'center', fontFamily: 'Roboto-Medium'}}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bot.title}
          </RText>
          <ActionButton
            bot={bot}
            style={{position: 'absolute', right: 0}}
            unsubscribe={this.unsubscribe}
            isSubscribed={bot.isSubscribed}
            copyAddress={this.copyAddress}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 10 * k, justifyContent: 'center'}}>
          <Pill>{bot.addressData.locationShort}</Pill>
          <Pill>{locationStore!.distanceFromBot(bot.location)}</Pill>
        </View>

        {!bot.isSubscribed ? (
          <FollowLocationView onFollow={this.acceptInvitation} />
        ) : (
          <View>
            <VisitorsArea bot={bot} />

            <View style={styles.userInfoRow}>
              <ProfileAvatar profile={bot.owner!} size={40} />
              {bot.owner && (
                <ProfileHandle
                  style={botProfileStyle.userInfoRow}
                  onPress={() => Actions.profileDetails({item: bot.owner!.id})}
                  size={16}
                  profile={bot.owner}
                />
              )}

              {/* TODO: add bot.createdAt when ready on the backend */}
            </View>
            {!!bot.description && (
              <View style={styles.descriptionContainer}>
                <RText size={17} weight="Light" color={colors.DARK_PURPLE}>
                  {bot.description}
                </RText>
              </View>
            )}
            {bot.image && (
              <LazyImage
                file={bot.image}
                imageProps={{
                  style: styles.botImage as any,
                  resizeMode: 'contain',
                }}
                placeholder={<View style={[styles.botImage, {backgroundColor: GREY}]} />}
              />
            )}
            <Separator style={{marginHorizontal: 5}} />
          </View>
        )}
      </View>
    )
  }
}

const VisitorsArea = observer(({bot}: {bot: IBot}) => {
  let list: IProfile[] | undefined, text: string, count: number, onPress
  if (bot.visitorsSize > 0) {
    list = bot.visitors.list
    count = bot.visitorsSize
    const prefix = bot.visitorsSize > 1 ? 'are' : 'is'
    text = prefix + ' currently here!'
    onPress = () => Actions.visitors({botId: bot.id})
  } else if (bot.subscribers.count > 1) {
    list = bot.subscribers.list.filter((g: IProfile) => g.id !== bot.owner!.id)
    count = bot.subscribers.count
    text = 'accepted the invite!'
  }
  let inner: Array<ReactElement<any>> | null = null

  if (list) {
    inner = [
      <Separator style={{marginHorizontal: 5, width: '100%', marginBottom: 30}} key="1" />,
      <TouchableOpacity
        key="2"
        onPress={onPress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: 10 * k,
          marginBottom: bot.owner && bot.owner.isOwn ? 0 : 20,
        }}
      >
        <ProfileStack
          firstProfile={list[0]}
          stackSize={count!}
          circleSize={45}
          textSize={16.5}
          fontFamily="bold"
          style={{marginBottom: 5 * k}}
        />
        <RText weight="Regular" size={15}>
          {text!}
        </RText>
      </TouchableOpacity>,
    ]
  }
  return (
    <VisitorsWrapper>
      {inner}
      {bot.owner && bot.owner.isOwn && (
        <TouchableOpacity
          style={[styles.invite, {marginTop: list ? 5 * k : 20 * k, marginBottom: 30}]}
          onPress={() => Actions.geofenceShare({botId: bot.id})}
        >
          <Image source={shareIcon} />
          <RText size={16} pink style={{marginLeft: 12}}>
            Invite
          </RText>
        </TouchableOpacity>
      )}
      {!((bot.owner && bot.owner.isOwn) || list) && <View style={{height: 17}} />}
    </VisitorsWrapper>
  )
})

const VisitorsWrapper = ({children}) => (
  <View style={{alignItems: 'center'}}>
    {children}
    <Separator style={{width: '100%', marginHorizontal: 5, marginTop: 0}} />
  </View>
)

const FollowLocationView = ({onFollow}) => (
  <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
    <Separator style={{width: '100%'}} />
    <Image source={followIcon} style={{marginVertical: 15 * k}} />
    <RText size={15} color={colors.WARM_GREY_2} weight="Light" style={{textAlign: 'center'}}>
      {`Know when friends arrive\r\nand depart this location.`}
    </RText>
    <TouchableOpacity style={styles.followButton} onPress={onFollow}>
      <RText size={16.8} color={colors.PINK}>
        Follow Location
      </RText>
    </TouchableOpacity>
  </View>
)

const BotUnavailable = () => (
  <View style={{alignItems: 'center'}}>
    <RText size={16} style={{textAlign: 'center'}}>
      <Text style={{color: colors.DARK_GREY}}>
        {"Oops! We can't find what\r\nyou're looking for"}
      </Text>
    </RText>
    <Image source={require('../../../images/surpriseBot.png')} style={{marginTop: 30 * k}} />
  </View>
)

export default BotDetailsHeader

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'white',
    padding: 20 * k,
  },
  descriptionContainer: {},
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
    marginBottom: 10,
  },
  invite: {
    height: 40 * minHeight,
    width: 120 * minHeight,
    borderRadius: 20 * minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.PINK,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10 * k,
  },
  followButton: {
    borderWidth: 1,
    borderColor: colors.PINK,
    borderRadius: 20,
    height: 40,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15 * k,
  },
  botImage: {width, height: width, marginHorizontal: -20 * k, marginTop: 15 * minHeight},
})
