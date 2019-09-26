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
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  item: string
}

const ProfileDetail = observer(({item}: Props) => {
  const [theProfile, setProfile] = useState<IProfile | null>(null)

  const {profile, profiles, loadProfile} = useWocky()

  useEffect(() => {
    setProfile(profiles.get(item))
    loadProfile(item)
  }, [])

  if (!theProfile || !isAlive(theProfile)) {
    return null
  }
  return (
    <BottomPopup>
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
        <BlockReport profile={theProfile} />
        <ProfileAvatar
          size={74}
          style={{borderWidth: 0}}
          borderColor={colors.PINK}
          profile={theProfile}
          tappable={false}
          fontFamily="regular"
          fontSize="large"
          messageBtn={true}
        />
        <RText
          color={colors.PINK}
          weight="Bold"
          size={20}
          style={styles.displayName}
          numberOfLines={1}
        >
          @{theProfile.handle}
        </RText>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Pill>
            {theProfile.botsSize} Location{theProfile.botsSize !== 1 && 's'}
          </Pill>
        </View>
        <ConnectButton profile={theProfile!} myProfile={profile!} />
      </View>
    </BottomPopup>
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
