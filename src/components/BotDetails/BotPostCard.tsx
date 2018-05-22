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
  const timestamp = post.relativeDateAsString
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', flex: 1, paddingVertical: 5 * k}}>
          <View style={{paddingLeft: 15 * k, paddingRight: 5 * k, marginTop: -14 * k}}>
            <Avatar size={40 * k} profile={post.profile!} />
          </View>
          <View
            style={{
              flex: 1,
              paddingRight: 8 * k,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => Actions.profileDetails({item: post.profile!.id})}>
              <RText color={colors.COOL_BLUE} weight="Medium" size={15} style={styles.hyperlink}>
                @{post.profile!.handle}
              </RText>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <RText size={12} weight="Light" color={colors.DARK_GREY}>
                {timestamp}
              </RText>
              <BotPostOptions bot={bot} item={post} />
            </View>
          </View>
        </View>
      </View>
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
