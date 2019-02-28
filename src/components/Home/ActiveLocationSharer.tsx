import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {ILocationShare} from 'third-party/wocky-client/src/model/LocationShare'
import {RText} from '../common'
import {minHeight} from '../Global'
import {colors} from '../../constants'
import {IActiveBannerItem} from './ActiveGeoBotBanner'
import LocationAvatar from './LocationAvatar'
import {inject} from 'mobx-react/native'
import {IHomeStore} from 'src/store/HomeStore'

interface IProps extends IActiveBannerItem {
  sharer: ILocationShare
  homeStore?: IHomeStore
}

const liveImg = require('../../../images/live.png')

const ActiveLocationSharer = inject('homeStore')(
  ({sharer, outerStyle, innerStyle, homeStore}: IProps) => (
    <View style={outerStyle}>
      <TouchableOpacity
        style={innerStyle}
        onPress={() => {
          homeStore!.setFocusedLocation(sharer.sharedWith.location)
          homeStore!.select(sharer.sharedWith.id)
        }}
      >
        <LocationAvatar profile={sharer.sharedWith} tappable={false} />
        <Image
          source={liveImg}
          style={{position: 'absolute', right: -2, top: -4, width: 39, height: 21}}
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
)

export default ActiveLocationSharer
