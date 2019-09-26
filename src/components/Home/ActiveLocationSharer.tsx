import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {ILocationShare} from 'third-party/wocky-client/src/model/LocationShare'
import {RText} from '../common'
import {minHeight} from '../Global'
import {colors} from '../../constants'
import {IActiveBannerItem} from './ActiveGeoBotBanner'
import LocationAvatar from './LocationAvatar'
import {useHomeStore} from 'src/utils/injectors'

interface IProps extends IActiveBannerItem {
  sharer: ILocationShare
}

const ActiveLocationSharer = ({sharer, outerStyle, innerStyle}: IProps) => {
  const {followUserOnMap, select} = useHomeStore()
  return (
    <View style={outerStyle}>
      <TouchableOpacity
        style={innerStyle}
        onPress={() => {
          followUserOnMap(sharer.sharedWith)
          select(sharer.sharedWith.id)
        }}
      >
        <LocationAvatar
          profile={sharer.sharedWith}
          sharesLocation
          tappable={false}
          currentActivity={sharer.sharedWith.currentActivity}
        />
        <RText
          size={13}
          style={{textAlign: 'center', marginTop: 2 * minHeight}}
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colors.DARK_GREY}
          weight={'Medium'}
        >
          {`@${sharer.sharedWith.handle}`}
        </RText>
      </TouchableOpacity>
    </View>
  )
}

export default ActiveLocationSharer
