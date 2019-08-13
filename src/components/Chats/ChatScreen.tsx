import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import moment from 'moment'
import {useLocalStore, observer} from 'mobx-react-lite'
import {inject} from 'mobx-react'
import {isAlive} from 'mobx-state-tree'
import Screen from '../Screen'
import ChatMessage from './ChatMessage'
import {withKeyboardHOC, RText} from '../common'
import {IWocky, IChat, IMessage} from 'wocky-client'
import InputArea from './InputArea'
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'
import {colors} from 'src/constants'

type Props = {
  item: string
  wocky?: IWocky
  navigation: any
}

type StoreShape = {chat?: IChat; setChat: (c) => void}

const ChatScreen = withKeyboardHOC(
  inject('wocky')(
    observer((props: Props) => {
      const {item, wocky, navigation} = props

      const store = useLocalStore<StoreShape>(() => ({
        chat: undefined,
        setChat(c) {
          store.chat = c
        },
      }))

      useEffect(() => {
        store.setChat(wocky!.chats.createChat(item))
        store.chat!.messages.load().then(() => {
          store.chat!.readAll()
        })
        store.chat!.setActive(true)
        navigation.setParams({chat: store.chat})

        return function cleanup() {
          if (store.chat) {
            store.chat.setActive(false)
          }
        }
      }, [])

      return store.chat && isAlive(store.chat) ? <ChatView chat={store.chat} /> : <Screen />
    })
  )
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

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareFlatList
        style={{paddingHorizontal: 10}}
        inverted
        data={chat.sortedMessages.slice()}
        renderItem={({item, index}: {item: IMessage; index: number}) => (
          <>
            <ChatMessage message={item} diffMessage={getPreviousMessage(index)} />
            {renderDate(item, index)}
          </>
        )}
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
