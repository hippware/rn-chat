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
  const {
    otherUser,
    messages: {first},
  } = chat
  const text = first ? (first.getUpload ? 'Image Attached' : first.content) : ''
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: 'white'}}>
      <PersonRow
        imageComponent={<Avatar size={44} profile={otherUser} tappable={false} />}
        handleComponent={
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <ProfileHandle profile={otherUser} size={15} />
            <RText weight="Light" size={12} color={colors.DARK_GREY} style={{marginLeft: 5}}>
              {first!.dateAsString}
            </RText>
          </View>
        }
        displayName={text}
        style={style}
      />
    </TouchableOpacity>
  )
})

export default ChatCard
