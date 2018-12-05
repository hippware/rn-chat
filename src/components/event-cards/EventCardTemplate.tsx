import React, {ReactElement} from 'react'
import {View, Image, ImageRequireSource, TouchableWithoutFeedback} from 'react-native'
import {Avatar, RText} from '../common'
import {k, avatarScale} from '../Global'
import {colors} from '../../constants'
import {IProfile} from 'wocky-client'
import {observer} from 'mobx-react/native'

type Props = {
  profile: IProfile
  timestamp: string
  icon: ImageRequireSource
  action: string
  line2?: string | null
  rightColumnElement?: ReactElement<any>
  onPress?: () => void
}

const EventCardTemplate = observer(
  ({profile, timestamp, icon, action, line2, rightColumnElement, onPress}: Props) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <View style={{paddingRight: 13 * k, marginLeft: 5 * k, marginRight: 10 * k}}>
            <Avatar size={47} profile={profile} hideDot />
            <Image
              source={icon}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 5 * k,
                width: 26 * avatarScale,
                height: 26 * avatarScale,
              }}
            />
          </View>

          <View style={{flex: 1, marginRight: 7 * k}}>
            <RText style={{lineHeight: 10}}>
              <RText size={13} weight="Medium">{`@${profile.handle} `}</RText>
              <RText size={13} color={colors.PURPLISH_GREY}>
                {action}{' '}
              </RText>
              {line2 == null && (
                <RText size={13} weight="Light" color={colors.DARK_GREY}>
                  {timestamp}
                </RText>
              )}
            </RText>
            {line2 && (
              <RText style={{marginBottom: 5}} size={15} color={colors.DARK_PURPLE}>
                {line2}
                {'. '}
                <RText size={13} weight="Light" color={colors.DARK_GREY}>
                  {timestamp}
                </RText>
              </RText>
            )}
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
