import React from 'react'
import {observer} from 'mobx-react/native'
import {Avatar, ProfileHandle, RText} from '../common'
import {isAlive} from 'mobx-state-tree'
import {IChat} from 'wocky-client'
import PersonRow from '../people-lists/PersonRow'
import {View, TouchableOpacity} from 'react-native'
import {colors} from 'src/constants'

type Props = {
  chat: IChat
  onPostOptions?: any
  onPress: any
  style?: any
}

const ChatCard = observer(({chat, style, onPress}: Props) => {
  if (!chat || !isAlive(chat)) return null
  const {otherUser, messages} = chat
  let media: any = null
  try {
    media = messages.first!.getUpload()
  } catch (err) {
    // console.log('TODO: Fix msg.media reference error', err)
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <PersonRow
        imageComponent={<Avatar size={44} profile={otherUser} tappable={false} />}
        handleComponent={
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <ProfileHandle profile={otherUser} size={15} />
            <RText weight="Light" size={12} color={colors.DARK_GREY}>
              {messages.first!.dateAsString}
            </RText>
          </View>
        }
        displayName={chat.messages.first ? chat.messages.first.content : ''}
        style={style}
      />
    </TouchableOpacity>
  )
})

export default ChatCard
