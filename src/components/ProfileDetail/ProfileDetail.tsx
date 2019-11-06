import React, {useEffect, useState} from 'react'
import {IProfile} from 'wocky-client'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'
import {RText, Pill} from '../common'
import {colors} from 'src/constants'
import {View, StyleSheet} from 'react-native'
import ConnectButton from './ConnectButton'
import ProfileAvatar from '../ProfileAvatar'
import {minHeight} from '../Global'
import BlockReport from './BlockReport'
import {useWocky, useGeocodingStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {when} from 'mobx'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'

type Props = {
  item: string
  preview?: boolean
}

const ProfileDetail = observer(({item, preview}: Props) => {
  const [profile, setProfile] = useState<IProfile | null>(null)

  const {profiles, loadProfile} = useWocky()

  useEffect(() => {
    setProfile(profiles.get(item))
    loadProfile(item)
  }, [])

  if (!profile || !isAlive(profile)) {
    return null
  }

  return (
    <BottomPopup showPreviewButton onPreviewButtonTap={() => Actions.refresh({preview: !preview})}>
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
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Pill>
        {profile.botsSize} Location{profile.botsSize !== 1 && 's'}
      </Pill>
    </View>
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
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // alignContent: 'center',
        marginBottom: 10,
        marginHorizontal: 30,
      }}
    >
      <ProfileAvatar
        size={55}
        style={{marginRight: 20}}
        borderColor={colors.PINK}
        profile={profile}
        tappable={false}
        fontFamily="regular"
        fontSize="large"
      />

      {/* HACK: this padding is the only way I could find to horizontally align avatar and text */}
      <View style={{paddingBottom: 20}}>
        <RText
          weight="Bold"
          size={20}
          color={colors.DARK_PURPLE}
          numberOfLines={1}
          style={{marginBottom: 10}}
        >
          {profile.handle}
        </RText>
        <View style={{flexDirection: 'row'}}>
          <Pill>{profile.addressData.locationShort}</Pill>
          {!profile.isOwn && <Pill>{profile.whenLastLocationSent}</Pill>}
        </View>
      </View>
    </View>
  )
})

export default ProfileDetail

const styles = StyleSheet.create({
  displayName: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
})
