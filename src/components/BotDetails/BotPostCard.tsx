import React from 'react'
import {View} from 'react-native'
import {k, width} from '../Global'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react/native'
import {RText, ProgressiveImage} from '../common'
import {isAlive} from 'mobx-state-tree'
import {IBotPost, IBot} from 'wocky-client'
import UserInfoRow from './UserInfoRow'

type Props = {
  item: IBotPost
  bot: IBot
}

const BotPostCard = observer(({bot, item: post}: Props) => {
  if (!isAlive(bot) || (bot.invitation && !bot.invitation.accepted) || !bot.isSubscribed) {
    return null
  }
  return (
    <View style={{backgroundColor: 'white'}}>
      <UserInfoRow profile={post.profile!} style={{paddingHorizontal: 20 * k}} />
      {!!post.content && (
        <View style={{flex: 1, paddingLeft: 20 * k, paddingRight: 20 * k}}>
          <RText weight="Light" size={17} color={colors.DARK_PURPLE}>
            {post.content}
          </RText>
        </View>
      )}
      {!!post.image && (
        <View>
          {!!post.content && <View style={{height: 15 * k}} />}
          <ProgressiveImage style={{height: width, width}} file={post.image} resizeMode="contain" />
        </View>
      )}
    </View>
  )
})

export default BotPostCard
