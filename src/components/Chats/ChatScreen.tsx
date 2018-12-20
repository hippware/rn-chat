import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import moment from 'moment'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import ChatMessage from './ChatMessage'
import {Avatar, withKeyboardHOC} from '../common'
import {IWocky, IChat, IMessage} from 'wocky-client'
import InputArea from './InputArea'

type Props = {
  item: string
  wocky?: IWocky
}

@inject('wocky')
@observer
class ChatScreen extends React.Component<Props> {
  static renderTitle = ({item}) => <ChatTitle item={item} />

  @observable chat?: IChat

  async componentDidMount() {
    const {item, wocky} = this.props
    this.chat = wocky!.createChat(item)
    await this.chat!.messages.load({force: true})
    this.chat!.readAll()
  }

  onSend = () => {
    if (this.chat!.message!.content.trim()) {
      this.chat!.message!.send()
    }
  }

  renderDate = (message: IMessage, index: number) => {
    const diffMessage = this.getPreviousMessage(index)
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

  getPreviousMessage = (index: number): IMessage | null => {
    const {sortedMessages: messages} = this.chat!
    return messages.length > index + 1 ? messages[index + 1] : null
  }

  renderItem = ({item, index}: {item: IMessage; index: number}) => (
    <View>
      {this.renderDate(item, index)}
      <ChatMessage message={item} diffMessage={this.getPreviousMessage(index)} />
    </View>
  )

  _footerComponent: any = observer(
    () => (this.chat!.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null)
  )

  render() {
    return this.chat && isAlive(this.chat) ? (
      <Screen>
        <FlatList
          inverted
          data={this.chat.sortedMessages.reverse()}
          renderItem={this.renderItem}
          keyExtractor={i => i.id}
          onEndReached={() => this.chat!.messages.load()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._footerComponent}
        />
        <InputArea chat={this.chat} />
      </Screen>
    ) : (
      <Screen />
    )
  }
}

const ChatTitle = inject('wocky')(
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
