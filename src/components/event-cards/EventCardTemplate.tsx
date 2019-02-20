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
  children?: ReactElement<any>
}

const EventCardTemplate = observer(
  ({profile, timestamp, icon, action, line2, rightColumnElement, onPress, children}: Props) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '6%',
            paddingTop: 25,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <View style={{paddingRight: 13 * k, marginRight: '3%'}}>
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

          <View
            style={{
              flex: 1,
              marginRight: 7 * k,
              alignSelf: 'center',
              alignItems: 'flex-start',
            }}
          >
            <RText>
              <RText size={14} weight="Medium">{`@${profile.handle} `}</RText>
              <RText size={14} color={colors.PURPLISH_GREY}>
                {action}
              </RText>
              {line2 == null && (
                <RText size={12} weight="Light" color={colors.DARK_GREY}>
                  {' '}
                  {timestamp}
                </RText>
              )}
              {line2 && (
                <RText size={15} weight="Medium" color={colors.DARK_PURPLE}>
                  {'\n'}
                  {line2}
                  {'. '}
                  <RText size={12} weight="Light" color={colors.DARK_GREY}>
                    {timestamp}
                  </RText>
                </RText>
              )}
            </RText>
            {children}
          </View>

          <View
            style={[
              rightColumnElement ? {width: 71} : {width: 0},
              {height: 40, justifyContent: 'center'},
            ]}
          >
            {rightColumnElement}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

export default observer(EventCardTemplate)
