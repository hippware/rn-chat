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
import Screen from './Screen'
import Avatar from './common/Avatar'
import {showImagePicker} from './ImagePicker'
import ChatBubble from './ChatBubble'
import ChatMessage from './ChatMessage'
import {AutoExpandingTextInput} from './common'
import {colors} from '../constants'

const Button = require('apsl-react-native-button')

type Props = {
  item: string
  wocky?: any
}

type State = {
  text: string
  height: number
}

const ChatTitle = inject('wocky')(
  observer(({item, wocky}) => {
    return wocky.chats.get(item)
      ? wocky.chats.get(item).participants.map((profile, ind) => (
          <TouchableOpacity
            key={`${ind}${profile.id}touch`} // eslint-disable-line
            onPress={() => {
              Actions.profileDetail({item: profile, title: profile.displayName})
            }}
          >
            <Avatar size={40} profile={profile} />
          </TouchableOpacity>
        ))
      : null
  })
)

@inject('wocky')
@observer
class ChatScreen extends React.Component<Props, State> {
  static renderTitle = ({item}) => <ChatTitle item={item} />

  state: State = {
    text: '',
    height: 0,
  }

  @observable messages: any[] = []
  @observable chat: any
  mounted: boolean
  handler: any
  list: any

  componentDidMount() {
    const {item, wocky} = this.props
    this.chat = wocky.createChat(item)
    this.chat.setActive(true)
    this.chat.readAll()
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
    if (this.chat.message.body.trim()) {
      this.chat.message.send()
    }
  }

  keyboardWillShow = e => {
    if (this.mounted) this.setState({height: e.endCoordinates.height})
  }

  keyboardWillHide = () => {
    if (this.mounted) this.setState({height: 0})
  }

  // TODO: rework this so it's included in row render...inefficient this way
  renderDate = (rowData: any = {}) => {
    let diffMessage = null
    diffMessage = this.getPreviousMessage(rowData)
    if (rowData.date instanceof Date) {
      if (diffMessage === null) {
        return <Text style={[styles.date]}>{moment(rowData.date).calendar()}</Text>
      } else if (diffMessage.date instanceof Date) {
        const diff = moment(rowData.date).diff(diffMessage.date, 'minutes')
        if (diff > 5) {
          return <Text style={[styles.date]}>{moment(rowData.date).calendar()}</Text>
        }
      }
    }
    return null
  }

  getPreviousMessage = message => {
    const i = this.messages.findIndex(m => m.uniqueId === message.uniqueId)
    return this.messages.length > i + 1 ? this.messages[i + 1] : null
  }

  renderItem = ({item}) =>
    item ? (
      <View>
        {this.renderDate(item)}
        <ChatMessage
          rowData={item}
          diffMessage={this.getPreviousMessage(item)}
          position={item.position}
        />
      </View>
    ) : null

  render() {
    return this.chat && isAlive(this.chat) ? (
      <Screen>
        <FlatList
          inverted
          data={this.chat.messages
            .map(el => {
              let media = null
              try {
                media = el.media
              } catch (err) {
                // console.log('TODO: fix Message.media reference error', err)
              }
              return el
                ? {
                    uniqueId: el.id,
                    text: el.body || '',
                    isDay: true,
                    title: el.from.displayName,
                    media,
                    size: 40,
                    position: el.from.isOwn ? 'right' : 'left',
                    status: '',
                    name: el.from.isOwn ? '' : el.from.displayName,
                    image:
                      el.from.isOwn || !el.from.avatar || !el.from.avatar.source
                        ? null
                        : el.from.avatar.source,
                    profile: el.from,
                    imageView: Avatar,
                    view: ChatBubble,
                    date: new Date(el.time),
                  }
                : null
            })
            .reverse()}
          ref={l => (this.list = l)}
          renderItem={this.renderItem}
          keyExtractor={i => i.uniqueId}
          onEndReached={() => this.chat.load()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={observer(
            () =>
              this.chat && this.chat.loading ? (
                <ActivityIndicator style={{marginVertical: 20}} />
              ) : null
          )}
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
    return (
      <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
        <AttachButton message={chat.message} />
        <AutoExpandingTextInput
          style={[styles.textInput, styles.textInputDay]}
          placeholder="Write a message"
          placeholderTextColor={colors.DARK_GREY}
          multiline
          autoFocus
          returnKeyType="default"
          enablesReturnKeyAutomatically
          onChangeText={chat.message.setBody}
          value={chat.message.body}
          blurOnSubmit={false}
          maxHeight={100}
          maxLength={500}
        />
        <TouchableOpacity disabled={!chat.message.body.trim() || !wocky.connected} onPress={onSend}>
          <Image
            source={
              chat.message.body.trim() && wocky.connected
                ? require('../../images/iconSendActive.png')
                : require('../../images/iconSendInactive.png')
            }
          />
        </TouchableOpacity>
      </View>
    )
  })
)

const onAttach = (message, notificationStore) => {
  showImagePicker('Select Image', async (source, response) => {
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
  })
}

const AttachButton = inject('notificationStore')(({notificationStore, message}) => (
  <Button
    style={{borderWidth: 0, borderColor: 'transparent', paddingTop: 4}}
    onPress={() => onAttach(message, notificationStore)}
  >
    <Image source={require('../../images/iconAttach.png')} />
  </Button>
))

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listView: {
    flex: 1,
  },
  textInputContainerDay: {
    backgroundColor: 'white',
  },
  textInputContainerNight: {
    backgroundColor: 'rgba(63,50,77,0.9)',
  },
  textInputContainer: {
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
  },
  textInputDay: {
    color: colors.DARK_PURPLE,
  },
  textInputNight: {
    color: 'white',
  },
  date: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  linkLeft: {
    color: '#000',
  },
  linkRight: {
    color: '#fff',
  },
  loadEarlierMessages: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadEarlierMessagesButton: {
    fontSize: 14,
  },
})
