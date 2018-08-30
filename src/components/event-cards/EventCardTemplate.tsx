import React from 'react'
import {View, Image, ImageRequireSource} from 'react-native'
import {Avatar, RText} from '../common'
import {k} from '../Global'
import {colors} from '../../constants'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  timestamp: string
  icon: ImageRequireSource
  userHandle: string
  action: string
  line2?: string
}

const EventCardTemplate = ({profile, timestamp, icon, userHandle, action, line2}: Props) => (
  <View style={{flexDirection: 'row', padding: 15 * k, alignItems: 'center'}}>
    <View style={{paddingRight: 10 * k, marginLeft: 15 * k, marginRight: 15 * k}}>
      <Avatar size={47 * k} profile={profile} hideDot />
      <Image source={icon} style={{position: 'absolute', right: 0, bottom: 5 * k}} />
    </View>

    <View style={{flex: 1}}>
      <RText>
        <RText>{`@${userHandle} `}</RText>
        {action}
      </RText>
      {line2 && <RText>{line2}</RText>}
      <RText size={12} weight="Light" color={colors.DARK_GREY}>
        {timestamp}
      </RText>
    </View>

    <View style={{width: 100, height: 20, borderWidth: 1}} />
  </View>
)

export default EventCardTemplate
