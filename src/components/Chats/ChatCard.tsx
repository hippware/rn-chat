import React from 'react'
import {observer} from 'mobx-react/native'
import {Avatar, ProfileHandle} from '../common'
import {isAlive} from 'mobx-state-tree'
import {IChat} from 'wocky-client'
import PersonRow from '../people-lists/PersonRow'
import {View, TouchableOpacity} from 'react-native'

type Props = {
  chat: IChat
  onPostOptions?: any
  onPress: any
  style?: any
}

const ChatCard = observer(({chat, style, onPress}: Props) => {
  if (!chat || !isAlive(chat)) return null
  const {otherUser} = chat
  return (
    <TouchableOpacity onPress={onPress}>
      <PersonRow
        imageComponent={<Avatar size={44} profile={otherUser} tappable={false} />}
        handleComponent={
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <ProfileHandle profile={otherUser} size={15} />
            {/* todo: add timestamp (hopefully coming in API changes?) */}
          </View>
        }
        displayName={chat.messages.first ? chat.messages.first.content : ''}
        style={style}
      />
    </TouchableOpacity>
  )
})

export default ChatCard
