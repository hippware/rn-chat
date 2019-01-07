import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import moment from 'moment'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import Screen from '../Screen'
import ChatMessage from './ChatMessage'
import {withKeyboardHOC} from '../common'
import {IWocky, IChat, IMessage} from 'wocky-client'
import InputArea from './InputArea'

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
    this.chat = wocky!.createChat(item)
    await this.chat!.messages.load({force: true})
    this.chat!.readAll()
    this.chat!.setActive(true)
  }

  componentWillUnmount() {
    if (this.chat) {
      this.chat.setActive(false)
    }
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
