import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import Avatar from '../common/Avatar'
import {k, width} from '../Global'
import {Actions} from 'react-native-router-flux'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react/native'
import BotPostOptions from './BotPostOptions'
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

const styles = StyleSheet.create({
  hyperlink: {
    letterSpacing: -0.1,
  },
  action: {
    color: colors.PURPLISH_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
    letterSpacing: -0.1,
  },
  title: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
