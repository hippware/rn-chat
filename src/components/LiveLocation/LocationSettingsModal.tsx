import React, {useState} from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {RText, Separator, Avatar, GradientButton} from '../common'
import ModalContainer from '../modals/ModalContainer'
import {IProfile} from '../../../third-party/wocky-client/src'
import {DARK_PURPLE, PINK, PINKISH_GREY} from '../../constants/colors'
import {Actions} from 'react-native-router-flux'
import {warn} from '../../../third-party/wocky-client/src/logger'

export type LocationSettingsType = 'SEND_REQUEST' | 'ACCEPT_REQUEST' | 'ACCEPT_REJECT_REQUEST'

type Props = {
  type: LocationSettingsType
  profile?: IProfile
  displayName?: string
  onOkPress: () => void
}

type SelectionType = 'always' | 'nearby' | null

const buttonHeight = 50

const LocationSettingsModal = (props: Props) => {
  const {profile, displayName} = props

  if (!profile && !displayName) {
    warn('Either profile or displayName must be provided')
  }

  const [selection, setSelection] = useState<SelectionType>(null)
  return (
    <ModalContainer onPress={Actions.pop}>
      <View
        style={{
          width: '80%',
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 15,
          paddingTop: 20,
          paddingBottom: buttonHeight + 15,
          overflow: 'hidden',
        }}
      >
        <RText size={15} color={DARK_PURPLE} weight="Medium">
          Friend Request
        </RText>
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
        <Separator style={{width: '100%', marginTop: 25, marginBottom: 20}} />
        <RText size={16} color={DARK_PURPLE} weight="Medium" style={{marginBottom: 25}}>
          Share My Location
        </RText>
        <RadioButton
          text="Always Share Location"
          onPress={() => setSelection('always')}
          selected={selection === 'always'}
        />
        <RadioButton
          text="Only When I'm Nearby"
          onPress={() => setSelection('nearby')}
          selected={selection === 'nearby'}
        />
        <BottomButtons {...props} selection={selection} />
      </View>
    </ModalContainer>
  )
}

export default LocationSettingsModal

const on = require('../../../images/radioSelected.png')
const off = require('../../../images/radioUnselected.png')
const radioSize = 22

const RadioButton = ({text, selected, onPress}) => (
  <View style={{flexDirection: 'row', width: '75%', marginBottom: 25}}>
    <TouchableOpacity onPress={onPress} style={{marginRight: 15}}>
      <Image source={selected ? on : off} style={{height: radioSize, width: radioSize}} />
    </TouchableOpacity>
    <RText size={15} color={DARK_PURPLE}>
      {text}
    </RText>
  </View>
)

const BottomButtons = ({type, selection}: Props & {selection: SelectionType}) => {
  if (type === 'ACCEPT_REJECT_REQUEST') {
    return (
      <View style={[{flexDirection: 'row'}, styles.bottom]}>
        <TouchableOpacity
          onPress={() => {
            // todo
          }}
          style={[
            styles.button,
            {backgroundColor: PINKISH_GREY, alignItems: 'center', justifyContent: 'center'},
          ]}
        >
          <RText size={15} color="white">
            Reject
          </RText>
        </TouchableOpacity>
        <GradientButton
          onPress={() => {
            // todo
          }}
          style={styles.button}
        >
          <RText size={15} color="white">
            Accept
          </RText>
        </GradientButton>
      </View>
    )
  } else {
    // todo: accept/send friend request action
    return (
      <GradientButton
        onPress={type === 'ACCEPT_REQUEST' ? () => null : () => null}
        style={[styles.bottom, styles.button]}
      >
        <RText size={15} color="white">
          {type === 'ACCEPT_REQUEST' ? 'Accept Friend Request' : 'Send Friend Request'}
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
