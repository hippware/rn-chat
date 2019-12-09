import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import ChatCard from './ChatCard'
import {RText, BottomPopupNew} from '../common'
import {colors} from '../../constants'
import DraggablePopupList from '../common/DraggablePopupList'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const sendMessageImg = require('../../../images/sendMessage.png')

type Props = {
  isActive: boolean
}

const ChatListScreen = observer(({isActive}: Props) => {
  const {chats} = useWocky()

  return (
    <BottomPopupNew
      fullViewHeight={400}
      allowFullScroll
      listProps={{
        data: chats.list.slice(),
        initialNumToRender: 6,
        ListHeaderComponent: (
          <>
            <TouchableOpacity
              onPress={() => Actions.selectChatUser()}
              style={{
                borderColor: colors.PINK,
                borderWidth: 1,
                borderRadius: 12,
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                // todo: how do I do this with flex?
                width: 200,
                alignSelf: 'center',
              }}
            >
              <Image source={sendMessageImg} style={{marginRight: 8}} />
              <RText color={colors.PINK} size={14} style={{}}>
                Send Message
              </RText>
            </TouchableOpacity>
            {chats.list.length ? (
              <RText
                weight="Medium"
                size={16}
                style={{paddingLeft: 30, paddingTop: 25, paddingBottom: 10}}
              >
                Messages
              </RText>
            ) : null}
          </>
        ),
        // todo: figure out a flexible height setting
        ListEmptyComponent: (
          <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
            <RText color={colors.DARK_GREY} size={16}>
              No messages
            </RText>
          </View>
        ),
        renderItem: ({item}) => (
          <ChatCard
            chat={item}
            onPress={() => Actions.chat({item: item.id})}
            style={{paddingHorizontal: 30}}
          />
        ),
        keyExtractor: ({id}) => id,
      }}
    />
  )
})
;(ChatListScreen as any).navigationOptions = {
  fadeNavConfig: {
    back: true,
    title: (
      <RText size={16} color={colors.DARK_PURPLE}>
        Messages
      </RText>
    ),
  },
}

export default ChatListScreen
