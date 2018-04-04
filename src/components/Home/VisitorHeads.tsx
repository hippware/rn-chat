import React from 'react'
import {View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {IBot, IWocky, IProfile} from 'wocky-client'

import {k} from '../Global'
import {Avatar, RText} from '../common'
import {colors} from '../../constants'

type Props = {
  bot: IBot
  wocky?: IWocky
}

const visitorIds = [
  'a4b48f7e-8f21-11e6-b86d-0e600a8611a9', // @becky
  '55cb59a6-55e2-11e6-b457-0eea5386eb69', // @scurry
  '1a175ee4-55d5-11e6-8fee-0eea5386eb69', // @miranda
]

@inject('wocky')
@observer
class VisitorHeads extends React.Component<Props> {
  @observable visitors: IProfile[] = []

  componentWillMount() {
    visitorIds.forEach(v => {
      this.props.wocky!.getProfile(v).then(p => {
        this.visitors.push(p)
      })
    })
  }

  render() {
    const profile = this.visitors.length ? this.visitors[0] : null
    const size = 30
    return profile ? (
      <View style={{position: 'absolute', top: 2, right: 2}}>
        <View
          style={{
            height: size * k,
            width: size * k,
            borderRadius: size * k / 2,
            backgroundColor: colors.PINK,
            position: 'absolute',
            top: 0,
            right: 0,
            borderWidth: 2 * k,
            borderColor: colors.WHITE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RText size={12} color={colors.WHITE} weight="Medium">
            +5
          </RText>
        </View>
        <Avatar
          profile={profile}
          tappable={false}
          size={size}
          hideDot
          style={{position: 'absolute', right: 12 * k, top: 0}}
        />
      </View>
    ) : null
  }
}

export default VisitorHeads
