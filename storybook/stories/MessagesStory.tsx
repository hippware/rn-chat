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
import CreateMessage from 'src/components/Chats/CreateMessage'
import SelectableProfileList from 'src/store/SelectableProfileList'

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
                  {id: '1', otherUser: '1', media: '1', isOutgoing: false, content: 'hello!'},
                ],
                count: 1,
              },
            },
            {
              id: '2',
              otherUser: '2',
              messages: {
                result: [{id: '2', otherUser: '2', media: '1', isOutgoing: true, content: 'hi!'}],
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
      },
    }
  )

export const MessagesRouterStory = () => (
  <Provider {...store}>
    <Router {...navBarStyle}>
      <Stack>
        <Stack renderer={SplitRenderer}>
          <Scene key="home" component={Home} />
          <Scene key="chats" component={ChatListScreen} />
        </Stack>
        <Scene key="selectChatUser" component={CreateMessage} title="Message" />
      </Stack>
    </Router>
  </Provider>
)

const Home = () => {
  useEffect(() => {
    Actions.chats()
  }, [])

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <RText size={50}>Home Screen</RText>
      <TouchableOpacity style={{padding: 10, borderWidth: 1}} onPress={() => Actions.chats()}>
        <RText>Press me</RText>
      </TouchableOpacity>
    </View>
  )
}
