import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import moment from 'moment'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import Screen from '../Screen'
import ChatMessage from './ChatMessage'
import {withKeyboardHOC} from '../common'
import {IWocky, IChat, IMessage} from 'wocky-client'
import InputArea from './InputArea'
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'

type Props = {
  item: string
  wocky?: IWocky
}

@inject('wocky')
@observer
class ChatScreen extends React.Component<Props> {
  @observable chat?: IChat

  async componentDidMount() {
    const {item, wocky} = this.props
    // console.log('& chat', this.props.item)
    this.chat = wocky!.chats.createChat(item)
    await this.chat!.messages.load({force: true})
    this.chat!.readAll()
    this.chat!.setActive(true)
  }

  componentWillUnmount() {
    if (this.chat) {
      this.chat.setActive(false)
    }
  }

  render() {
    return this.chat && isAlive(this.chat) ? <ChatView chat={this.chat} /> : <Screen />
  }
}

export const ChatView = observer(({chat}: {chat: IChat}) => {
  function getPreviousMessage(index: number): IMessage | null {
    const {sortedMessages: messages} = chat
    return messages.length > index + 1 ? messages[index + 1] : null
  }

  function renderDate(message: IMessage, index: number) {
    const diffMessage = getPreviousMessage(index)
    if (!diffMessage) {
      return <Text style={styles.date as any}>{message.dateAsString}</Text>
    } else if (diffMessage.date) {
      const diff = moment(message.date).diff(diffMessage.date, 'minutes')
      if (diff > 5) {
        return <Text style={styles.date as any}>{message.dateAsString}</Text>
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
            {renderDate(item, index)}
            <ChatMessage message={item} diffMessage={getPreviousMessage(index)} />
          </>
        )}
        keyExtractor={i => i.id}
        onEndReached={() => chat.messages.load()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          chat.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null
        }
      />
      <InputArea chat={chat} />
    </View>
  )
})

export default withKeyboardHOC(ChatScreen)

const styles = StyleSheet.create({
  date: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
