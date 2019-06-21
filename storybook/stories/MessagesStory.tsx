import React, {useEffect} from 'react'
import {Provider} from 'mobx-react/native'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import {navBarStyle} from '../../src/components/styles'
import SplitRenderer from 'src/components/custom-navigators/SplitRenderer'
import {View, TouchableOpacity} from 'react-native'
import {RText} from 'src/components/common'
import ChatListScreen from 'src/components/Chats/ChatListScreen'
import {Wocky} from 'wocky-client'
import {types} from 'mobx-state-tree'
import SelectChatUser from 'src/components/Chats/SelectChatUser'
import SelectableProfileList from 'src/store/SelectableProfileList'
import {ChatView} from 'src/components/Chats/ChatScreen'
import moment from 'moment'

const store = types
  .model({
    homeStore: types.model({}),
    searchStore: types.model({
      localResult: types.optional(SelectableProfileList, {}),
    }),
    wocky: Wocky,
  })
  .create(
    {
      homeStore: {},
      searchStore: {},
      wocky: {
        host: 'host',
        profile: {
          id: '1',
        },
        profiles: {
          storage: {
            1: {id: '1', handle: 'andy_sims'},
            2: {id: '2', handle: 'bill02'},
          },
        },
        chats: {
          _list: [
            {
              id: '1',
              otherUser: '1',
              messages: {
                result: [
                  {
                    id: '1',
                    otherUser: '1',
                    isOutgoing: false,
                    content:
                      'hello! This is a really long message that demonstrates the 1 line with ellipsis on Chat Message preview',
                  },
                ],
                count: 1,
              },
            },
            {
              id: '2',
              otherUser: '2',
              messages: {
                result: [{id: '2', otherUser: '2', isOutgoing: true, content: 'hi!'}],
                count: 1,
              },
            },
            {
              id: '3',
              otherUser: '2',
              messages: {
                result: [{id: '2', otherUser: '2', isOutgoing: true, content: 'hi!'}],
                count: 1,
              },
            },
            {
              id: '4',
              otherUser: '2',
              messages: {
                result: [{id: '2', otherUser: '2', isOutgoing: true, content: 'hi!'}],
                count: 1,
              },
            },
            {
              id: '5',
              otherUser: '2',
              messages: {
                result: [{id: '2', otherUser: '2', isOutgoing: true, content: 'hi!'}],
                count: 1,
              },
            },
          ],
        },
      },
    },
    {
      transport: {
        presence: {},
        sharedLocation: {},
        message: {},
        notification: {},
        rosterItem: {},
        botVisitor: {},
        downloadTROS: async () => '1',
        loadChats: async () => [],
        onClose: () => null,
      },
    }
  )

export const MessagesRouterStory = () => (
  <Provider {...store}>
    <Router {...navBarStyle}>
      <Stack>
        <Stack hideNavBar renderer={SplitRenderer}>
          <Scene key="home" component={Home} />
          <Scene key="chats" component={ChatListScreen} />
        </Stack>
        <Scene key="selectChatUser" component={SelectChatUser} title="Message" />
      </Stack>
    </Router>
  </Provider>
)

export const ChatUserSearchScreen = () => <SelectChatUser {...store as any} />

const otherUser = {
  id: '1',
  handle: 'otherUser',
  firstName: 'other',
  lastName: 'user',
  displayName: 'Other User',
}

const notificationStore = {}

export const ChatViewStory = () => (
  <Provider notificationStore={notificationStore}>
    <ChatView
      chat={
        {
          message: {
            // content: 'helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
            content: '',
            setBody: () => null,
          },
          messages: {
            load: () => null,
          },
          sortedMessages: [
            {
              id: '1',
              content:
                'hello! This is a long message that should wrap but doesnt appear to according to this issue.',
              unread: false,
              isOutgoing: false,
              getUpload: null,
              date: moment()
                .add(5, 'minutes')
                .toDate(),
              dateAsString: moment()
                .subtract(10, 'hours')
                .calendar(),
              otherUser,
            },
            {
              id: '2',
              // content: 'hello to you!',
              content:
                'hello to you! This is another long message intend to demonstrate how well lengthy messages render on the right side of the chat view screen',
              unread: false,
              isOutgoing: true,
              getUpload: null,
              date: moment()
                .subtract(10, 'hours')
                .toDate(),
              otherUser,
            },
            // {
            //   id: '3',
            //   content: 'image message?',
            //   unread: false,
            //   isOutgoing: true,
            //   getUpload: {
            //     id: '1file',
            //     thumbnail: require('../../images/fillMurray300.jpg'),
            //     url: '',
            //   },
            //   otherUser,
            // },
            {
              id: '3',
              content: 'image message?',
              unread: false,
              isOutgoing: true,
              getUpload: {
                loading: true,
              },
              otherUser,
            },
            {
              id: '4',
              unread: false,
              isOutgoing: false,
              getUpload: {
                id: '2file',
                thumbnail: require('../../images/placecagecrazy460.jpg'),
                url: '',
              },
              otherUser,
            },
            {
              id: '5',
              unread: false,
              isOutgoing: true,
              getUpload: {
                id: '3file',
                thumbnail: require('../../images/placecagecrazy325.jpg'),
                url: '',
              },
              otherUser,
            },
          ],
        } as any
      }
    />
  </Provider>
)

const Home = () => {
  useEffect(() => {
    Actions.chats()
  }, [])

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
      <RText size={50}>Home Screen</RText>
      <TouchableOpacity style={{padding: 10, borderWidth: 1}} onPress={() => Actions.chats()}>
        <RText>Press me</RText>
      </TouchableOpacity>
    </View>
  )
}
