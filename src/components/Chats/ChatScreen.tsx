import React from 'react'
import {
  View,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native'

import moment from 'moment'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import {showImagePicker} from '../ImagePicker'
import ChatMessage from './ChatMessage'
import {AutoExpandingTextInput, Avatar} from '../common'
import {colors} from '../../constants'
import {IWocky, IChat, IMessage} from 'wocky-client'

const Button = require('apsl-react-native-button')

type Props = {
  item: string
  wocky?: IWocky
}

type State = {
  text: string
  height: number
}

@inject('wocky')
@observer
class ChatScreen extends React.Component<Props, State> {
  static renderTitle = ({item}) => <ChatTitle item={item} />

  state: State = {
    text: '',
    height: 0,
  }

  // @observable messages: any[] = []
  @observable chat?: IChat
  mounted: boolean = false
  handler: any

  async componentDidMount() {
    const {item, wocky} = this.props
    this.chat = wocky!.createChat(item)
    // console.log('& this.chat', item, this.chat.messages.list.length)
    await this.chat.messages.load()
    this.chat.readAll()
    this.chat.setActive(true)
    // TODO: use withKeyboardHOC here
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    if (this.chat) {
      this.chat.setActive(false)
    }
    Keyboard.removeListener('keyboardWillShow', this.keyboardWillShow)
    Keyboard.removeListener('keyboardWillHide', this.keyboardWillHide)
    if (this.handler) {
      this.handler()
      this.handler = null
    }
  }

  onSend = () => {
    if (this.chat!.message!.body.trim()) {
      this.chat!.message!.send()
    }
  }

  keyboardWillShow = e => {
    if (this.mounted) this.setState({height: e.endCoordinates.height})
  }

  keyboardWillHide = () => {
    if (this.mounted) this.setState({height: 0})
  }

  renderDate = (message: IMessage, index: number) => {
    const diffMessage = this.getPreviousMessage(index)
    // TODO: need message date
    if (message.date instanceof Date) {
      if (diffMessage === null) {
        return <Text style={[styles.date]}>{moment(message.date).calendar()}</Text>
      } else if (diffMessage.date instanceof Date) {
        const diff = moment(message.date).diff(diffMessage.date, 'minutes')
        if (diff > 5) {
          return <Text style={[styles.date]}>{moment(message.date).calendar()}</Text>
        }
      }
    }
    return null
  }

  getPreviousMessage = (index: number): IMessage | null => {
    return this.chat!.messages.length > index + 1 ? this.chat!.messages[index + 1] : null
  }

  renderItem = ({item, index}: {item: IMessage; index: number}) => (
    <View>
      {this.renderDate(item, index)}
      <ChatMessage message={item} diffMessage={this.getPreviousMessage(index)} />
    </View>
  )

  _footerComponent: any = observer(
    () =>
      this.chat && this.chat.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null
  )

  render() {
    return this.chat && isAlive(this.chat) ? (
      <Screen>
        <FlatList
          inverted
          data={this.chat.messages.list.reverse()}
          renderItem={this.renderItem}
          keyExtractor={i => i.id}
          onEndReached={() => this.chat!.messages.load()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._footerComponent}
        />
        <InputArea chat={this.chat} onSend={this.onSend} />
        <View style={{height: this.state.height}} />
      </Screen>
    ) : (
      <Screen />
    )
  }
}

// separating text input here prevents unnecessary re-renders of the entire list when user enters text
const InputArea = inject('wocky')(
  observer(({wocky, chat, onSend}) => {
    return chat.message ? (
      <View style={styles.textInputContainer}>
        <AttachButton message={chat.message} />
        <AutoExpandingTextInput
          style={styles.textInput}
          placeholder="Write a message"
          placeholderTextColor={colors.DARK_GREY}
          multiline
          autoFocus
          returnKeyType="default"
          enablesReturnKeyAutomatically
          onChangeText={t => chat.message && chat.message.setBody(t)}
          value={chat.message.body}
          blurOnSubmit={false}
          maxHeight={100}
          maxLength={500}
        />
        <TouchableOpacity disabled={!chat.message.body.trim() || !wocky.connected} onPress={onSend}>
          <Image
            source={
              chat.message.body.trim() && wocky.connected
                ? require('../../../images/iconSendActive.png')
                : require('../../../images/iconSendInactive.png')
            }
          />
        </TouchableOpacity>
      </View>
    ) : null
  })
)

const onAttach = (message, notificationStore) => {
  showImagePicker({
    title: 'Select Image',
    callback: async (source, response) => {
      try {
        await message.upload({
          file: source,
          width: response.width,
          height: response.height,
          size: response.size,
        })
        message.send()
      } catch (e) {
        notificationStore.flash(e.message)
      }
    },
  })
}

const AttachButton = inject('notificationStore')(({notificationStore, message}) => (
  <Button
    style={{borderWidth: 0, borderColor: 'transparent', paddingTop: 4}}
    onPress={() => onAttach(message, notificationStore)}
  >
    <Image source={require('../../../images/iconAttach.png')} />
  </Button>
))

const ChatTitle = inject('wocky')(
  observer(({item, wocky}: {item: string; wocky?: IWocky}) => {
    const chat = wocky!.chats.get(item)
    return chat ? (
      <TouchableOpacity
        key={`${chat.otherUser.id}touch`}
        onPress={() => {
          Actions.profileDetail({item: chat.otherUser, title: chat.otherUser.displayName})
        }}
      >
        <Avatar size={40} profile={chat.otherUser} />
      </TouchableOpacity>
    ) : null
  })
)

export default ChatScreen

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 100,
    fontFamily: 'Roboto-Regular',
    flex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    color: colors.DARK_PURPLE,
  },
  date: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
