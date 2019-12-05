import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import moment from 'moment'
import {useLocalStore, observer} from 'mobx-react'
import {isAlive} from 'mobx-state-tree'
import Screen from '../Screen'
import ChatMessage from './ChatMessage'
import {withKeyboardHOC, RText} from '../common'
import {IChat, IMessage} from 'wocky-client'
import InputArea from './InputArea'
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'
import {colors} from 'src/constants'
import {useWocky} from 'src/utils/injectors'

type Props = {
  item: string
  navigation: any
}

type StoreShape = {chat?: IChat; setChat: (c) => void}

const ChatScreen = withKeyboardHOC(
  observer((props: Props) => {
    const {item, navigation} = props
    const {chats} = useWocky()

    const store = useLocalStore<StoreShape>(() => ({
      chat: undefined,
      setChat(c) {
        store.chat = c
      },
    }))

    useEffect(() => {
      const processChat = async () => {
        store.setChat(chats.createChat(item))
        try {
          await store.chat!.messages.load() // catch here because some invalid picture could happen
        } finally {
          await store.chat!.readAll()
        }
        store.chat!.setActive(true)

        // insert chat into props for accessing in navigationOptions
        navigation.setParams({chat: store.chat})
      }
      processChat()
      return function cleanup() {
        if (store.chat) {
          store.chat.setActive(false)
        }
      }
    }, [])

    return store.chat && isAlive(store.chat) ? <ChatView chat={store.chat} /> : <Screen />
  })
)
;(ChatScreen as any).navigationOptions = ({navigation}) => {
  const chat = navigation.getParam('chat')
  return {
    title: chat && chat.otherUser ? `@${chat.otherUser.handle}` : '',
  }
}

export const ChatView = observer(({chat}: {chat: IChat}) => {
  function getPreviousMessage(index: number): IMessage | null {
    const {sortedMessages} = chat
    return sortedMessages.length > index + 1 ? sortedMessages[index + 1] : null
  }

  function renderDate(message: IMessage, index: number) {
    const diffMessage = getPreviousMessage(index)
    if (!diffMessage) {
      return <Text style={styles.date as any}>{message.dateAsString}</Text>
    } else if (diffMessage.date) {
      const diff = moment(message.date).diff(diffMessage.date, 'minutes')
      if (diff > 5) {
        return <RText style={styles.date as any}>{message.dateAsString}</RText>
      }
    }
    return null
  }

  const renderItem = ({item, index}: {item: IMessage; index: number}) => {
    if (item.unread) {
      chat.readOne(item)
    }

    return (
      <>
        <ChatMessage message={item} diffMessage={getPreviousMessage(index)} />
        {renderDate(item, index)}
      </>
    )
  }

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareFlatList
        style={{paddingHorizontal: 10}}
        inverted
        data={chat.sortedMessages.slice()}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        onEndReached={() => chat.messages.load()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          chat.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null
        }
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      />
      <InputArea chat={chat} />
    </View>
  )
})

export default ChatScreen

const styles = StyleSheet.create({
  date: {
    color: colors.DARK_GREY,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
})
