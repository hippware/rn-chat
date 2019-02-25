import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {ILocationShare} from 'third-party/wocky-client/src/model/LocationShare'
import {Avatar, RText} from '../common'
import {minHeight} from '../Global'
import {colors} from '../../constants'
import {Actions} from 'react-native-router-flux'
import {IActiveBannerItem} from './ActiveGeoBotBanner'
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
          homeStore!.selectProfile(sharer.sharedWith)
        }}
      >
        {/* todo: need custom avatar with the extra circle around the outside...will need to wait until Alan comes back to get that asset */}

        <Avatar profile={sharer.sharedWith} size={64} tappable={false} />
        <Image source={liveImg} style={{position: 'absolute', right: 0, top: 0}} />
        <TouchableOpacity
          onPress={() => Actions.profileDetails({item: sharer.sharedWith.id})}
          style={{marginTop: 4}}
        >
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
      </TouchableOpacity>
    </View>
  )
)

export default ActiveLocationSharer
