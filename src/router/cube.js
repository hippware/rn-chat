import React from 'react';
import {Actions, Scene} from 'react-native-router-native';
import statem from '../../gen/state';

import Home from '../components/Home';
import MyAccount from '../components/MyAccount';
import FriendsList from '../components/FriendsListView';
import FollowersList from '../components/FollowersList';
import BlockedList from '../components/BlockedList';
import AddFriends from '../components/AddFriends';
import AddFriendByUsername from '../components/AddFriendByUsername';
import ChatsScreen from '../components/ChatsScreen';
import ChatScreen from '../components/ChatScreen';
import friend from '../store/friendStore';
import search from '../store/searchStore';
import BotsScreen from '../components/BotsScreen';

const messageButton = {
    icon: require('../../images/iconMessage.png'),
    badgeTextColor: 'white',
    badgeFontFamily: 'Roboto-Medium',
    badgeFontSize: 11.0,
    testID: 'rightNavButton',
    badgeBGColor: 'rgb(254,92,108)',
    onPress: statem.cubeBar && statem.cubeBar.chatsContainer,
};

export default (
    <Scene key='cube' cube tabs>
        <Scene key='main' tabs hideTabBar rightButton={messageButton} state={statem.drawerTabs}>
            <Scene key='home' component={Home} state={statem.homeContainer} navTransparent>
                <Scene key='restoreHome' fullMap={false} hideNavBar={false} state={statem.home} />
                <Scene
                    key='fullMap'
                    fullMap
                    state={statem.fullMap}
                    leftButton={{
                        icon: require('../../images/iconClose.png'),
                        onPress: () => statem.homeContainer.home(),
                    }}
                />
                <Scene key='fullActivities' hideNavBar />
            </Scene>

            <Scene key='friends' state={statem.friendsContainer}>
                <Scene
                    key='friendsMain'
                    state={statem.friendsMain}
                    navTransparent
                    component={FriendsList}
                    title='People'
                />
                <Scene key='followers' state={statem.followers} component={FollowersList} title='Followers' />
                <Scene key='blocked' state={statem.blocked} component={BlockedList} title='Blocked' />
                <Scene key='addFriends' component={AddFriends} title='Add Friends' rightButtons={[]} />
                <Scene
                    key='addFriendByUsername'
                    component={AddFriendByUsername}
                    rightButton={{
                        disabled: true,
                        disabledTextColor: 'rgba(254,92,108,0.5)',
                        fontSize: 15,
                        textColor: 'rgb(254,92,108)',
                        title: 'Done',
                        onPress: () => {
                            friend.addAll(search.globalResult.selected);
                            Actions.pop();
                            Actions.pop();
                        },
                    }}
                    title='Add by Username'
                />
            </Scene>

            <Scene key='myAccount' component={MyAccount} title='My Account' state={statem.myAccountScene}>
                <Scene key='viewAccount' editMode={false} save={false} />
                <Scene
                    key='editAccount'
                    editMode
                    save={false}
                    rightTitle='Save'
                    onRight={() => Actions.saveAccount()}
                    leftTitle='Cancel'
                    onLeft={() => Actions.viewAccount()}
                />
                <Scene key='saveAccount' save />
            </Scene>
            <Scene key='botsScreen' state={statem.botsScene} navTransparent component={BotsScreen} title='Bots' />

        </Scene>
        <Scene
            key='messaging'
            rightButton={{
                icon: require('../../images/iconClose.png'),
                onPress: () => {
                    statem.cubeBar.drawerTabs();
                },
            }}
            state={statem.chatsContainer}
        >
            <Scene key='chats' component={ChatsScreen} navTransparent title='Messages' state={statem.chats} />
            <Scene key='chat' component={ChatScreen} state={statem.chat} rightButtons={[]} navTransparent />
        </Scene>

    </Scene>
);
