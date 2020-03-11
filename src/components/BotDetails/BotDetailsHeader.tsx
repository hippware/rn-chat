import React, {ReactElement} from 'react'
import {View, Image, StyleSheet, Clipboard, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react'
import {k, width, minHeight} from '../Global'
import {colors} from '../../constants'
import {isAlive} from 'mobx-state-tree'
import {when} from 'mobx'
import ActionButton from './ActionButton'
import {RText, Spinner, ProfileHandle, ProfileStack, LazyImage, BotIcon} from '../common'
import {IBot, IProfile} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import Separator from './Separator'
import {Actions} from 'react-native-router-flux'
import ProfileAvatar from '../ProfileAvatar'
import {GREY} from 'src/constants/colors'
import {botProfileStyle} from '../styles'
import Pill from '../common/Pill'
import {useLocationStore} from 'src/utils/injectors'

type Props = {
  bot: IBot
  locationStore?: ILocationStore
  notificationStore?: any // TODO proper type
  analytics?: any // TODO proper type
  preview?: boolean
}

const shareIcon = require('../../../images/shareIcon.png')
const followIcon = require('../../../images/shoesPink.png')

export const DefaultHeader = inject(
  'notificationStore',
  'analytics',
  'locationStore'
)(
  observer(({bot, locationStore, notificationStore}: Props) => {
    function copyAddress() {
      Clipboard.setString(bot.address)
      notificationStore.flash('Address copied to clipboard 👍')
    }

    function acceptInvitation() {
      // avoid null locationStore.location here
      when(
        () => !!locationStore!.location,
        () => bot.acceptInvitation(locationStore!.location!)
      )
    }
    if (!bot || !isAlive(bot))
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Spinner />
        </View>
      )
    if (bot.error) return <BotUnavailable />
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <RText
            size={21}
            color={colors.DARK_PURPLE}
            style={{width: '75%', textAlign: 'center', fontFamily: 'Roboto-Medium'}}
            numberOfLines={2}
          >
            {bot.title}
          </RText>
          <ActionButton
            bot={bot}
            style={{position: 'absolute', right: 10}}
            copyAddress={copyAddress}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 10 * k, justifyContent: 'center'}}>
          <Pill>{bot.addressData.locationShort}</Pill>
          <Pill>{locationStore!.distanceFromBot(bot.location)}</Pill>
        </View>

        {!bot.isSubscribed ? (
          <FollowLocationView onFollow={acceptInvitation} />
        ) : (
          <View>
            <VisitorsArea bot={bot} />

            <View style={styles.userInfoRow}>
              <ProfileAvatar profile={bot.owner!} size={40} />
              {!!bot.owner && (
                <ProfileHandle
                  style={botProfileStyle.userInfoRow}
                  onPress={() => Actions.profileDetails({item: bot.owner!.id, preview: false})}
                  size={16}
                  profile={bot.owner}
                />
              )}

              {/* TODO: add bot.createdAt when ready on the backend */}
            </View>
            {!!bot.description && (
              <View style={{paddingLeft: 20 * k}}>
                <RText size={17} weight="Light" color={colors.DARK_PURPLE}>
                  {bot.description}
                </RText>
              </View>
            )}
            {!!bot.image && (
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
  })
)

export const PreviewHeader = observer(({bot}: {bot: IBot}) => {
  const locationStore = useLocationStore()

  // console.log('& preview header', bot ? bot.id : 'no bot')

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
      }}
    >
      {!!bot.image ? (
        <LazyImage
          file={bot.image}
          imageProps={{
            style: styles.previewImage,
          }}
          placeholder={<View style={[styles.previewImage, {backgroundColor: GREY}]} />}
        />
      ) : (
        <BotIcon size={47} icon={bot.icon} textStyle={{fontSize: 45, textAlign: 'center'}} />
      )}
      <View style={{marginLeft: 20, flex: 1}}>
        <RText
          weight="Bold"
          size={20}
          color={colors.DARK_PURPLE}
          numberOfLines={1}
          style={{marginBottom: 10}}
        >
          {bot.title}
        </RText>
        <View style={{flexDirection: 'row', paddingBottom: 5}}>
          <Pill>{bot.addressData ? bot.addressData.locationShort : '          '}</Pill>
          <Pill>{locationStore!.distanceFromBot(bot.location) || '    '}</Pill>
        </View>
      </View>
    </View>
  )
})

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
      {!!bot.owner && bot.owner.isOwn && (
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
    <RText size={16} style={{textAlign: 'center'}} color={colors.DARK_GREY}>
      {"Oops! We can't find what\r\nyou're looking for"}
    </RText>
    <Image source={require('../../../images/surpriseBot.png')} style={{marginTop: 30 * k}} />
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 39,
        marginTop: 30 * k,
        borderWidth: 1,
        borderRadius: 19.5,
        borderColor: colors.DARK_GREY,
      }}
    >
      <RText size={16} style={{textAlign: 'center'}} color={colors.DARK_GREY}>
        {'Go Back'}
      </RText>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'white',
    padding: 20 * k,
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
    marginBottom: 10,
    paddingLeft: 20 * k,
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
  botImage: {width, height: width, marginTop: 15 * minHeight},
  previewImage: {width: 52, height: 52},
})
