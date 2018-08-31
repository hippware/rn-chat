import React, {ReactElement} from 'react'
import {View, Image, ImageRequireSource, TouchableWithoutFeedback} from 'react-native'
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
  onPress?: () => void
}

const EventCardTemplate = observer(
  ({profile, timestamp, icon, action, line2, rightColumnElement, onPress}: Props) => {
    // console.log('& EventCardTemplate', profile, timestamp)
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            padding: 15 * k,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <View style={{paddingRight: 10 * k, marginLeft: 5 * k, marginRight: 10 * k}}>
            <Avatar size={47 * k} profile={profile} hideDot />
            <Image source={icon} style={{position: 'absolute', right: 0, bottom: 5 * k}} />
          </View>

          <View style={{flex: 1}}>
            <RText size={13}>
              <RText weight="Medium">{`@${profile.handle} `}</RText>
              <RText color={colors.PURPLISH_GREY}>{action}</RText>
            </RText>
            {line2 && (
              <RText size={14} color={colors.DARK_PURPLE}>
                {line2}
              </RText>
            )}
            <RText size={12} weight="Light" color={colors.DARK_GREY}>
              {timestamp}
            </RText>
          </View>

          <View style={{width: 71 * k, height: 40, justifyContent: 'center'}}>
            {rightColumnElement}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

export default observer(EventCardTemplate)
