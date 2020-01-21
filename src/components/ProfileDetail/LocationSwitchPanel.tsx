import React from 'react'
import {View} from 'react-native'
import {RText, Switch} from '../common'
import {PINK, GREY, WHITE} from '../../constants/colors'
import SwitchButton from '../SwitchButton'
import {FriendShareTypeEnum} from 'wocky-client'

export type ShareType = 'ALWAYS' | 'NEARBY' | 'DISABLED'

export type Props = {
  onTypeToggle: (type: ShareType) => void
  shareType: ShareType
}

const LocationSwitchPanel = ({onTypeToggle, shareType}: Props) => {
  const {DISABLED, ALWAYS, NEARBY} = FriendShareTypeEnum
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
          onToggle={on => onTypeToggle(on ? ALWAYS : DISABLED)}
        />
      </View>
      <SwitchButton
        value={shareType === NEARBY}
        text1="Always"
        text2="When Nearby"
        switchWidth={300}
        switchHeight={36}
        btnStyle={{}}
        btnHeight={36}
        btnBorderColor={PINK}
        btnBackgroundColor={PINK}
        switchBackgroundColor={WHITE}
        switchBorderColor={PINK}
        switchBorderRadius={16}
        activeFontColor={WHITE}
        fontColor={PINK}
        disabled={shareType === 'DISABLED'}
        onValueChange={value => onTypeToggle(value ? 'NEARBY' : 'ALWAYS')}
      >
        {/* {notifications.hasUnreadRequests && <View style={styles.newDot} />} */}
      </SwitchButton>
    </View>
  )
}

export default LocationSwitchPanel
