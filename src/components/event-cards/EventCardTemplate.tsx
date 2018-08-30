import React, {ReactElement} from 'react'
import {View, Image, ImageRequireSource} from 'react-native'
import {Avatar, RText} from '../common'
import {k} from '../Global'
import {colors} from '../../constants'
import {IProfile} from 'wocky-client'
import {observer} from 'mobx-react/native'

type Props = {
  profile: IProfile
  timestamp: string
  icon: ImageRequireSource
  action: string
  line2?: string
  rightColumnElement?: ReactElement<any>
}

const EventCardTemplate = observer(
  ({profile, timestamp, icon, action, line2, rightColumnElement}: Props) => {
    // console.log('& EventCardTemplate', profile, timestamp)
    return (
      <View style={{flexDirection: 'row', padding: 15 * k, alignItems: 'center'}}>
        <View style={{paddingRight: 10 * k, marginLeft: 5 * k, marginRight: 10 * k}}>
          <Avatar size={47 * k} profile={profile} hideDot />
          <Image source={icon} style={{position: 'absolute', right: 0, bottom: 5 * k}} />
        </View>

        <View style={{flex: 1}}>
          <RText>
            <RText>{`@${profile.handle} `}</RText>
            {action}
          </RText>
          {line2 && <RText>{line2}</RText>}
          <RText size={12} weight="Light" color={colors.DARK_GREY}>
            {timestamp}
          </RText>
        </View>

        <View style={{width: 71 * k, height: 40, justifyContent: 'center'}}>
          {rightColumnElement}
        </View>
      </View>
    )
  }
)

export default observer(EventCardTemplate)
