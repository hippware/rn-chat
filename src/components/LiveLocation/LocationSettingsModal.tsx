import React, {useState} from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {RText, Separator, Avatar, GradientButton} from '../common'
import ModalContainer from '../modals/ModalContainer'
import {IProfile, FriendShareTypeEnum} from '../../../third-party/wocky-client/src'
import {DARK_PURPLE, PINK, PINKISH_GREY} from '../../constants/colors'
import {Actions} from 'react-native-router-flux'

export type LocationSettingsType = 'SEND_REQUEST' | 'ACCEPT_REQUEST' | 'ACCEPT_REJECT_REQUEST'

export type Props = {
  settingsType: LocationSettingsType
  profile?: IProfile
  displayName?: string
  onOkPress: (shareType: FriendShareTypeEnum) => void
  onCancelPress?: () => void
}

const buttonHeight = 50

const {ALWAYS, NEARBY} = FriendShareTypeEnum

const LocationSettingsModal = (props: Props) => {
  const {profile, displayName} = props

  const [selection, setSelection] = useState<FriendShareTypeEnum | null>(null)
  return (
    <ModalContainer
      onPress={Actions.pop}
      innerStyle={{
        alignItems: 'center',
        borderRadius: 15,
        paddingTop: 20,
        paddingBottom: buttonHeight + 15,
      }}
    >
      <RText size={15} color={DARK_PURPLE} weight="Medium">
        Friend Request
      </RText>
      {(profile || displayName) && (
        <>
          <Avatar
            profile={profile}
            displayName={displayName}
            size={50}
            borderColor={PINK}
            hideDot
            style={{marginTop: 15}}
          />
          <RText size={20} color={PINK} style={{marginTop: 2}} weight="Bold">
            {profile ? profile.handle : displayName!}
          </RText>
        </>
      )}
      <Separator style={{width: '100%', marginTop: 25, marginBottom: 20}} />
      <RText size={16} color={DARK_PURPLE} weight="Medium" style={{marginBottom: 25}}>
        Share My Location
      </RText>
      <RadioButton
        text="Always Share Location"
        onPress={() => setSelection(ALWAYS)}
        selected={selection === ALWAYS}
      />
      <RadioButton
        text="Only When I'm Nearby"
        onPress={() => setSelection(NEARBY)}
        selected={selection === 'NEARBY'}
      />
      <BottomButtons {...props} selection={selection} />
    </ModalContainer>
  )
}

export default LocationSettingsModal

const on = require('../../../images/radioSelected.png')
const off = require('../../../images/radioUnselected.png')
const radioSize = 22

const RadioButton = ({text, selected, onPress}) => (
  <View
    style={{
      flexDirection: 'row',
      width: 190,
      marginBottom: 25,
    }}
  >
    <TouchableOpacity onPress={onPress}>
      <Image source={selected ? on : off} style={{height: radioSize, width: radioSize}} />
    </TouchableOpacity>
    <RText size={15} color={DARK_PURPLE} style={{marginLeft: 10}}>
      {text}
    </RText>
  </View>
)

const BottomButtons = ({
  settingsType,
  selection,
  onOkPress,
  onCancelPress = Actions.pop,
}: Props & {selection: FriendShareTypeEnum | null}) => {
  const okPress = () => {
    if (selection) {
      onOkPress(selection)
    }
  }
  if (settingsType === 'ACCEPT_REJECT_REQUEST') {
    return (
      <View style={[{flexDirection: 'row'}, styles.bottom]}>
        <TouchableOpacity
          onPress={onCancelPress}
          style={[
            styles.button,
            {backgroundColor: PINKISH_GREY, alignItems: 'center', justifyContent: 'center'},
          ]}
        >
          <RText size={15} color="white">
            Reject
          </RText>
        </TouchableOpacity>
        <GradientButton onPress={okPress} style={styles.button}>
          <RText size={15} color="white">
            Accept
          </RText>
        </GradientButton>
      </View>
    )
  } else {
    return (
      <GradientButton onPress={okPress} style={[styles.bottom, styles.button]}>
        <RText size={15} color="white">
          {settingsType === 'ACCEPT_REQUEST' ? 'Accept Friend Request' : 'Send Friend Request'}
        </RText>
      </GradientButton>
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  button: {
    height: buttonHeight,
    flex: 1,
  },
})
