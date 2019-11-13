import React, {useEffect, useState} from 'react'
import {IProfile} from 'wocky-client'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'
import {RText, Pill} from '../common'
import {colors} from 'src/constants'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import ConnectButton from './ConnectButton'
import ProfileAvatar from '../ProfileAvatar'
import {minHeight, avatarScale} from '../Global'
import BlockReport from './BlockReport'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'

type Props = {
  item: string
  preview?: boolean
}

const ProfileDetail = observer(({item, preview}: Props) => {
  const [profile, setProfile] = useState<IProfile | null>(null)

  const {loadProfile} = useWocky()

  useEffect(() => {
    async function fetchProfile() {
      const p = await loadProfile(item)
      setProfile(p)
    }
    fetchProfile()
  }, [])

  if (!profile || !isAlive(profile)) {
    return null
  }

  return (
    <BottomPopup preview={preview}>
      {preview ? <Preview profile={profile!} /> : <Default profile={profile!} />}
    </BottomPopup>
  )
})

const Default = observer(({profile}: {profile: IProfile}) => (
  <View
    style={{
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      paddingBottom: 46 * minHeight,
      paddingTop: 20,
    }}
    testID="profileDetail"
  >
    <BlockReport profile={profile} />
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
      @{profile.handle}
    </RText>
    <InfoPills profile={profile} />
    <ConnectButton profile={profile!} myProfile={profile!} />
  </View>
))

const Preview = observer(({profile}: {profile: IProfile}) => {
  useEffect(() => {
    profile.asyncFetchRoughLocation()
  }, [])

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
        </TouchableOpacity>
      )}
    </View>
  )
})

const InfoPills = observer(({profile}: {profile: IProfile}) =>
  profile.currentLocation ? (
    <View style={{flexDirection: 'row'}}>
      <Pill>{profile.addressData.locationShort}</Pill>
      {!profile.isOwn && <Pill>{profile.whenLastLocationSent}</Pill>}
    </View>
  ) : null
)

export default ProfileDetail

const styles = StyleSheet.create({
  displayName: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
})
