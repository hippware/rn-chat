import React from 'react'
import {View} from 'react-native'
// import Avatar from '../common/Avatar'
import {k, width} from '../Global'
// import {Actions} from 'react-native-router-flux'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react/native'
// import BotPostOptions from './BotPostOptions'
import {RText, ProgressiveImage} from '../common'
import {isAlive} from 'mobx-state-tree'
import {IBotPost, IBot} from 'wocky-client'
import UserInfoRow from './UserInfoRow'

type Props = {
  item: IBotPost
  bot: IBot
}

const BotPostCard = (props: Props) => {
  const post = props.item
  const {bot} = props
  if (!isAlive(bot)) {
    return null
  }
  // const timestamp = post.relativeDateAsString
  return (
    <View>
      <UserInfoRow profile={post.profile} style={{paddingHorizontal: 20 * k}} />
      {!!post.content && (
        <View style={{flex: 1, paddingBottom: 15 * k, paddingLeft: 20 * k, paddingRight: 20 * k}}>
          <RText size={14} color={colors.DARK_PURPLE}>
            {post.content}
          </RText>
        </View>
      )}
      {!!post.image && (
        <ProgressiveImage style={{height: width, width}} file={post.image} resizeMode="contain" />
      )}
    </View>
  )
}

export default observer(BotPostCard)
