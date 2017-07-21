import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import Screen from './Screen';
import FilterBar from './FilterBar';
import model from '../model/model';
import assert from 'assert';
import FriendCard from './FriendCard';
import Button from 'react-native-button';
import Separator from './Separator';
import friend from '../store/friendStore';
import Profile from '../model/Profile';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import {colors} from '../constants';

@observer
class FollowerCard extends Component {
  render() {
    const profile: Profile = this.props.profile;
    return (
      <FriendCard {...this.props}>
        {!profile.isBlocked &&
          <TouchableOpacity onPress={() => friend.block(profile)}>
            <Image style={{margin: 20 * k}} source={require('../../images/block.png')} />
          </TouchableOpacity>}
        {profile.isBlocked &&
          <TouchableOpacity onPress={() => friend.unblock(profile)}>
            <Image style={{margin: 20 * k}} source={require('../../images/blockActive.png')} />
          </TouchableOpacity>}
        <View
          style={{
            height: 35.6 * k,
            width: 1 * k,
            backgroundColor: 'rgba(155,155,155,0.26)',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            friend.follow(profile);
            // Actions.pop();
          }}
        >
          <Image style={{margin: 20 * k}} source={require('../../images/approve.png')} />
        </TouchableOpacity>
      </FriendCard>
    );
  }
}
FollowerCard.propTypes = {
  profile: React.PropTypes.any.isRequired,
};

@observer
export default class FollowersList extends Component {
  render() {
    const isDay = location.isDay;
    const list = this.props.filter === 'newFollowers' ? model.friends.newFollowers : model.friends.followers;
    this.dataSource = ds.cloneWithRows(list.map(x => x));
    return (
      <Screen isDay={isDay}>
        <FilterBar isDay={isDay} style={{paddingLeft: 15 * k, paddingRight: 15 * k}} onSelect={data => Actions.refresh({filter: data.key})} selected={this.props.filter}>
          <Text key='followers'>All</Text>
          <Text key='newFollowers'>New</Text>
          <Image key='search' onSelect={() => alert('Not implemented!')} source={require('../../images/iconFriendsSearch.png')} />
        </FilterBar>
        <ListView
          ref='list'
          removeClippedSubviews={false} // workaround for react-native bug #13316, https://github.com/react-community/react-navigation/issues/1279
          style={{flex: 1}}
          scrollEventThrottle={1}
          {...this.props}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={row => <FollowerCard key={row.user} isDay={isDay} profile={row} friend={friend} />}
        />
        {!!model.friends.blocked.length &&
          <Button containerStyle={styles.button} onPress={Actions.blocked} style={styles.text}>
            {model.friends.blocked.length} Blocked
          </Button>}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8 * k,
    marginBottom: 8 * k,
    height: 40 * k,
    backgroundColor: colors.DARK_GREY,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {height: 1, width: 0},
  },
  text: {
    color: 'white',
    letterSpacing: 0.7,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});
