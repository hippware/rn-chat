// @flow

import React from 'react';
import {Alert, TouchableOpacity, Text, View, Keyboard, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {AutoExpandingTextInput} from '../common';
import Screen from '../Screen';
import {colors} from '../../constants';
import SelectableProfileList from '../../store/SelectableProfileList';
import SearchBar from './SearchBar';
import ProfileList from './ProfileList';
import InviteFriendsRow from './InviteFriendsRow';

type Props = {
  botId: string,
};

type State = {
  height: number,
  message: string,
};

@inject('wocky', 'notificationStore')
@observer
export default class BotShareSelectFriends extends React.Component<Props, State> {
  @observable selection: SelectableProfileList = SelectableProfileList.create({});
  @observable bot: Bot;
  mounted: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {height: 0, message: ''};
  }

  componentDidMount() {
    const {friends, getBot} = this.props.wocky;
    this.bot = getBot({id: this.props.botId});
    this.selection.setList(friends.map(f => ({profile: f})));
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
  }

  share = () => {
    const shareSelect = this.selection.selected.map(sp => sp.id);
    try {
      this.bot.share(shareSelect, this.state.message, 'headline');
      const num = shareSelect.length;
      this.props.notificationStore.flash(`Bot shared with ${num} ${num > 1 ? 'friends' : 'friend'} 🎉`);
      Actions.pop({animated: false});
    } catch (e) {
      Alert.alert('There was a problem sharing the bot.');
      console.warn(e);
    }
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  };

  keyboardWillHide = (e) => {
    if (this.mounted) this.setState({height: 0});
  };

  render() {
    return (
      <Screen>
        <SelectFriends selection={this.selection} profile={this.props.wocky.profile} botTitle={this.bot && this.bot.title} />
        {!!this.selection.selected.length && (
          <View style={styles.container}>
            <View style={{padding: 20 * k, paddingTop: 15 * k, paddingBottom: 10 * k}}>
              <AutoExpandingTextInput
                style={styles.input}
                placeholderTextColor={colors.DARK_GREY}
                maxLength={140}
                value={this.state.message}
                onChangeText={text => this.setState({message: text})}
                placeholder='Write an optional message...'
              />
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={this.share}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{height: this.state.height}} />
      </Screen>
    );
  }
}

const SelectFriends = observer(({selection, profile, botTitle}) => {
  return (
    <View style={{flex: 1}}>
      <SearchBar
        autoCorrect={false}
        autoCapitalize='none'
        onChangeText={text => selection.setFilter(text)}
        value={selection.filter}
        placeholder='Search name or username'
        clearButtonMode='while-editing'
      />
      <InviteFriendsRow
        style={{borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: colors.WHITE}}
        subtext='Share your favorite places with your friends!'
        message={`Hey, @${profile.handle} invited you to check out "${botTitle}" on tinyrobot!`}
      />
      <ProfileList selection={selection} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'relative',
    shadowOffset: {height: -1, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.11,
  },
  shareButton: {
    height: 50 * k,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: colors.PINK,
  },
  shareText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
    letterSpacing: 0.8,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
    color: colors.PURPLE,
  },
});
