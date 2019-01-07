import React from 'react'
import {TouchableOpacity} from 'react-native'
import {IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import {Avatar} from '../common'

export default inject('wocky')(
  observer(({item, wocky}: {item: string; wocky?: IWocky}) => {
    const chat = wocky!.chats.get(item)
    return chat ? (
      <TouchableOpacity
        onPress={() => {
          Actions.profileDetail({item: chat.otherUser})
        }}
      >
        <Avatar size={40} profile={chat.otherUser} />
      </TouchableOpacity>
    ) : null
  })
)
