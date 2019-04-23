import React, {ReactElement} from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'
import {ActionAvatar, RText} from '../common'
import {k} from '../Global'
import {colors} from '../../constants'
import {IProfile} from 'wocky-client'
import {observer} from 'mobx-react/native'
import {AvatarIcon} from '../common/ActionAvatar'

type Props = {
  profile: IProfile
  timestamp: string
  iconType: AvatarIcon
  action: string
  line2?: string | null
  rightColumnElement?: ReactElement<any>
  onPress?: () => void
  children?: ReactElement<any>
}

const EventCardTemplate = observer(
  ({profile, timestamp, action, line2, rightColumnElement, onPress, children, iconType}: Props) => {
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
          <ActionAvatar
            profile={profile}
            type={iconType}
            size={47}
            outerStyle={{marginRight: '3%'}}
          />

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
