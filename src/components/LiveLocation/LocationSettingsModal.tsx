import React, {useState} from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {RText, Separator, Avatar, GradientButton} from '../common'
import ModalContainer from '../modals/ModalContainer'
import {IProfile} from '../../../third-party/wocky-client/src'
import {DARK_PURPLE, PINK} from '../../constants/colors'

type Props = {
  type: 'SEND_REQUEST' | 'ACCEPT_REQUEST' | 'ACCEPT_REJECT_REQUEST'
  user: IProfile
}

const buttonHeight = 50

export default ({type, user}: Props) => {
  const [selection, setSelection] = useState<'always' | 'nearby' | null>(null)
  return (
    <ModalContainer>
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
        {/* <RText>Avatar</RText> */}
        <Avatar profile={user} size={50} borderColor={PINK} hideDot style={{marginTop: 15}} />
        <RText size={20} color={PINK} style={{marginTop: 2}} weight="Bold">
          {user.handle}
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
        {/* todo: differentiate buttons based on type */}
        <GradientButton
          // isDisabled={!selected}
          onPress={() => {
            // todo
          }}
          style={{
            height: buttonHeight,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <RText size={15} color="white">
            Accept Friend Request
          </RText>
        </GradientButton>
      </View>
    </ModalContainer>
  )
}

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
