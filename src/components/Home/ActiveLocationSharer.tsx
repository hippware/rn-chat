import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {RText} from '../common'
import {minHeight} from '../Global'
import {colors} from '../../constants'
import {IActiveBannerItem} from './HomeBanner'
import LocationAvatar from './LocationAvatar'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {IProfile} from 'wocky-client'

interface IProps extends IActiveBannerItem {
  profile: IProfile
}

const ActiveLocationSharer = observer(({profile, outerStyle, innerStyle}: IProps) => {
  const {followUserOnMap, select} = useHomeStore()
  return (
    <View style={outerStyle}>
      <TouchableOpacity
        style={innerStyle}
        onPress={() => {
          followUserOnMap(profile)
          select(profile.id)
        }}
      >
        <LocationAvatar profile={profile} asHeaderItem tappable={false} />
        <RText
          size={13}
          style={{textAlign: 'center', marginTop: 2 * minHeight}}
          numberOfLines={1}
          ellipsizeMode="tail"
          color={profile.isLocationShared ? colors.PINK : colors.DARK_GREY}
          weight={'Medium'}
        >
          {profile.handle}
        </RText>
      </TouchableOpacity>
    </View>
  )
})

export default ActiveLocationSharer
