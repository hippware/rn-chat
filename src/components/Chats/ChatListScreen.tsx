import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import ChatCard from './ChatCard'
import {RText} from '../common'
import {colors} from '../../constants'
import {IWocky} from 'wocky-client'
import DraggablePopupList from '../common/DraggablePopupList'

const sendMessageImg = require('../../../images/sendMessage.png')

type Props = {
  wocky?: IWocky
  isActive: boolean
}

@inject('wocky')
@observer
class ChatListScreen extends React.Component<Props> {
  static navigationOptions = {
    fadeNavConfig: {
      back: true,
      title: (
        <RText size={16} color={colors.DARK_PURPLE}>
          Messages
        </RText>
      ),
    },
  }

  // todo: convert to functional component with hooks, but mobx-react 6+ required
  componentDidMount() {
    this.props.wocky!.chats.loadChats()
  }

  renderItem = ({item}) => <ChatCard chat={item} onPress={i => Actions.chat({item: i.id})} />

  keyExtractor = item => `${item.id}`

  render() {
    const {wocky, isActive} = this.props
    const {chats} = wocky!
    return (
      <DraggablePopupList
        contentContainerStyle={{marginTop: chats.unreadCount > 0 ? 47 : 10}}
        data={chats.list.slice()}
        initialNumToRender={6}
        headerInner={
          <>
            <TouchableOpacity
              onPress={() => null}
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
            <RText
              weight="Medium"
              size={16}
              style={{paddingLeft: 10, paddingTop: 25, paddingBottom: 10}}
            >
              Messages
            </RText>
          </>
        }
        // todo: figure out a flexible height setting
        ListEmptyComponent={
          <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
            <RText color={colors.DARK_GREY} size={16}>
              No messages
            </RText>
          </View>
        }
        renderItem={({item}) => (
          <ChatCard
            chat={item}
            onPress={() => Actions.chat({item: item.id})}
            style={{paddingHorizontal: 30}}
          />
        )}
        keyExtractor={({id}) => id}
        isActive={isActive}
      />
    )
  }
}

export default ChatListScreen
