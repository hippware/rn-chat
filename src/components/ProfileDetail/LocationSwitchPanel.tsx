import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {RText, Switch} from '../common'
import {PINK, GREY, WHITE, PINKISH_GREY, DARK_GREY} from '../../constants/colors'
import SwitchButton from '../SwitchButton'
import {FriendShareTypeEnum} from 'wocky-client'

export type Props = {
  onTypeToggle: (type: FriendShareTypeEnum) => void
  shareType: FriendShareTypeEnum
}

const LocationSwitchPanel = ({onTypeToggle, shareType}: Props) => {
  const {DISABLED, ALWAYS, NEARBY} = FriendShareTypeEnum
  const [lastType, setLastType] = useState<FriendShareTypeEnum>(
    shareType === DISABLED ? ALWAYS : shareType
  )

  useEffect(() => {
    if (shareType !== DISABLED) {
      setLastType(shareType)
    }
  }, [shareType])
  return (
    <View style={{width: 300}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          justifyContent: 'space-between',
        }}
      >
        <RText size={16} weight="Medium">
          Share My Location
        </RText>
        <Switch
          isOn={shareType !== DISABLED}
          onColor={PINK}
          offColor={GREY}
          onToggle={on => onTypeToggle(on ? lastType : DISABLED)}
        />
      </View>
      <SwitchButton
        value={lastType === NEARBY}
        text1="Always"
        text2="When Nearby"
        switchWidth={300}
        switchHeight={36}
        btnStyle={{}}
        btnHeight={36}
        btnBorderColor={PINK}
        btnBackgroundColor={PINK}
        switchBackgroundColor={WHITE}
        switchBorderColor={shareType === ALWAYS ? PINKISH_GREY : PINK}
        switchBorderRadius={16}
        activeFontColor={WHITE}
        fontColor={shareType === ALWAYS ? DARK_GREY : PINK}
        disabled={shareType === DISABLED}
        onValueChange={value => onTypeToggle(value ? NEARBY : ALWAYS)}
      />
    </View>
  )
}

export default LocationSwitchPanel
