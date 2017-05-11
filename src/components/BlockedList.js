import React from 'react';
import {TouchableOpacity, Image, ListView} from 'react-native';
import {k} from './Global';
import Screen from './Screen';
import model from '../model/model';
import FriendCard from './FriendCard';
import friend from '../store/friendStore';
import Profile from '../model/Profile';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';

type FollowerProps = {
    profile: Profile
};

const FollowerCard = observer((props: FollowerProps) => {
    return (
        <FriendCard {...props}>
            <TouchableOpacity onPress={() => friend.unblock(props.profile)}>
                <Image style={{margin: 20 * k}} source={require('../../images/blockActive.png')} />
            </TouchableOpacity>
        </FriendCard>
    );
});

export default props => {
    const isDay = location.isDay;
    const list = model.friends.blocked;
    this.dataSource = ds.cloneWithRows(list.map(x => x));
    return (
        <Screen isDay={isDay}>
            <ListView
                ref='list'
                style={{flex: 1}}
                scrollEventThrottle={1}
                {...props}
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={row => <FollowerCard key={row.user} isDay={isDay} profile={row} />}
            />
        </Screen>
    );
};
