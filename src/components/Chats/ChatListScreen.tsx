import React from 'react'
import {View, StyleSheet, FlatList, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import MessageButton from '../MessageButton'
import ChatCard from './ChatCard'
import ListFooter from '../ListFooter'
import {RText} from '../common'
import {colors} from '../../constants'
import {IWocky} from 'wocky-client'

const footerImage = require('../../../images/graphicEndMsgs.png')

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class ChatListScreen extends React.Component<Props> {
  list: any

  scrollTo = params => {
    this.list.scrollTo(params)
  }

  componentDidMount() {
    this.props.wocky!.loadChats()
  }

  renderItem = ({item}) => <ChatCard chat={item} onPress={i => Actions.chat({item: i.id})} />

  keyExtractor = item => `${item.id}`

  render() {
    const {chats} = this.props.wocky!
    return (
      <Screen>
        <FlatList
          style={{flex: 1}}
          ref={l => (this.list = l)}
          contentContainerStyle={{marginTop: chats.unreadCount > 0 ? 47 : 10}}
          data={chats.list.slice()}
          initialNumToRender={6}
          ListFooterComponent={
            chats.list.length ? (
              <ListFooter
                footerImage={footerImage}
                finished
                style={{backgroundColor: 'transparent'}}
              />
            ) : null
          }
          ListEmptyComponent={EmptyComponent}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <MessageButton />
        {chats.unreadCount > 0 && (
          <View style={styles.button}>
            <RText weight="Italic" color="white">
              New Messages
            </RText>
          </View>
        )}
      </Screen>
    )
  }
}

export default ChatListScreen

const EmptyComponent = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 150,
      backgroundColor: 'transparent',
    }}
  >
    <RText size={18} color={colors.PINKISH_GREY} style={{textAlign: 'center'}}>
      {'No messages yet\r\nWhy not start a conversation?'}
    </RText>
    <Image source={require('../../../images/botGray.png')} style={{marginTop: 20}} />
  </View>
)

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    backgroundColor: 'rgba(254,92,108, 0.9)',
  },
})
