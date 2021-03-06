import React, {useEffect, useState} from 'react'
import {IProfile} from 'src/wocky'
import {isAlive} from 'mobx-state-tree'
import {BottomPopupNew, Separator} from '../common'
import {RText, Pill, BubbleBadge} from '../common'
import {colors} from 'src/constants'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import ConnectButton from './ConnectButton'
import ProfileAvatar from '../ProfileAvatar'
import {avatarScale} from '../Global'
import ProfileActionSheet from './ProfileActionSheet'
import {useWocky, useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import LocationSwitchPanel from './LocationSwitchPanel'
import {useAppState} from 'react-native-hooks'
import TimeAgo from '../common/TimeAgo'
import {FriendShareTypeEnum} from '../../model/Profile'

type Props = {
  item: string
  preview: boolean
}

const ProfileDetail = observer(({item, preview}: Props) => {
  const [profile, setProfile] = useState<IProfile | null>(null)

  const {loadProfile} = useWocky()
  const {fullScreenMode} = useHomeStore()
  const currentAppState = useAppState()

  useEffect(() => {
    loadProfile(item).then(p => setProfile(p))
  }, [item])

  useEffect(() => {
    if (profile && currentAppState === 'active') {
      profile.asyncFetchRoughLocation()
    }
  }, [profile, currentAppState])

  if (fullScreenMode || !profile || !isAlive(profile)) {
    return null
  }

  return (
    <BottomPopupNew
      previewHeight={150}
      fullViewHeight={430}
      renderPreview={() => <Preview profile={profile!} />}
      renderContent={() => <Default profile={profile!} />}
      preview={preview}
    />
  )
})

const Default = observer(({profile}: {profile: IProfile}) => (
  <View
    style={{
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 40,
    }}
    testID="profileDetail"
  >
    <ProfileActionSheet profile={profile} />
    <ProfileAvatar
      size={74}
      style={{borderWidth: 0}}
      borderColor={colors.PINK}
      profile={profile}
      tappable={false}
      fontFamily="regular"
      fontSize="large"
      messageBtn={true}
    />

    <RText color={colors.PINK} weight="Bold" size={20} style={styles.displayName} numberOfLines={1}>
      {profile.handle}
    </RText>
    <InfoPills profile={profile} />
    {profile.isFriend ? (
      <>
        <Separator
          style={{width: '90%', backgroundColor: 'rgb(224,224,224)', marginVertical: 20}}
        />
        <LocationSwitchPanel
          onTypeToggle={profile.shareLocationUpdate}
          shareType={profile.shareType!}
        />
      </>
    ) : (
      <ConnectButton profile={profile!} />
    )}
  </View>
))

const Preview = observer(({profile}: {profile: IProfile}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
      }}
    >
      <ProfileAvatar
        size={50}
        style={{marginRight: 20}}
        borderColor={colors.PINK}
        profile={profile}
        tappable={false}
        fontFamily="regular"
        fontSize="large"
      />

      <View>
        <RText
          weight="Bold"
          size={20}
          color={colors.DARK_PURPLE}
          numberOfLines={1}
          style={{marginBottom: 10}}
        >
          {profile.handle}
        </RText>
        <InfoPills profile={profile} />
      </View>
      {!profile.isOwn && (
        <TouchableOpacity
          style={{marginLeft: 'auto'}}
          onPress={() => {
            Actions.chat({item: profile.id})
          }}
        >
          <Image
            style={{width: 50 * avatarScale, height: 50 * avatarScale}}
            source={require('../../../images/MessageBtn.png')}
          />
          {profile.unreadCount > 0 && (
            <BubbleBadge
              diameter={13}
              outerStyle={{top: 4, right: 4}}
              text=""
              background={unreadCounter}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
})

const InfoPills = observer(({profile}: {profile: IProfile}) =>
  profile.location ? (
    <View style={{flexDirection: 'row'}}>
      <Pill>{profile.addressData.locationShort}</Pill>
      {!profile.isOwn && (
        <Pill>
          <TimeAgo time={profile.location.createdAt} />
        </Pill>
      )}
    </View>
  ) : profile.isOwn ? null : (
    <Pill solidColor="rgb(155,155,155)">
      {profile.shareType === FriendShareTypeEnum.NEARBY ? 'Not Nearby' : 'Not Sharing Location'}
    </Pill>
  )
)
const unreadCounter = require('../../../images/unreadBG.png')

export default ProfileDetail

const styles = StyleSheet.create({
  displayName: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
})
