// @flow

import React from 'react';
import {TouchableOpacity, Text, View, Keyboard, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {Actions} from 'react-native-router-flux';
import location from '../store/locationStore';
import {k} from './Global';
import SelectableProfileList from '../model/SelectableProfileList';
import SelectableProfile from '../model/SelectableProfile';
import botStore from '../store/botStore';
import model from '../model/model';
import AutoExpandingTextInput from './common/AutoExpandingTextInput';
import Bot, {SHARE_SELECT} from '../model/Bot';
import SelectFriends from './SelectFriends';
import Screen from './Screen';
import {colors} from '../constants';
import {injectBot} from './hocs';

type Props = {
  bot: Bot,
};

type State = {
  height: number,
  message: string,
};

@observer
class BotShareSelectFriends extends React.Component {
  props: Props;
  state: State;
  @observable selection: SelectableProfileList;
  mounted: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {height: 0, message: ''};
  }

  @action
  componentWillMount() {
    this.selection = new SelectableProfileList(model.friends.friends);
    this.props.bot.shareSelect = [];
    this.selection.multiSelect = true;
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
  }

  @action
  share = () => {
    const {bot} = this.props;
    bot.shareMode = SHARE_SELECT;
    bot.shareSelect = this.selection.list
      .filter((selectableProfile: SelectableProfile) => selectableProfile.selected)
      .map((selectableProfile: SelectableProfile) => selectableProfile.profile);
    try {
      botStore.share(this.state.message, 'headline', bot);
      Actions.pop({animated: false});
      Actions.botShareCompleted({
        user: bot.shareSelect[0].user,
        number: bot.shareSelect.length,
      });
    } catch (e) {
      alert('There was a problem sharing the bot.');
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
      <Screen isDay={location.isDay}>
        <SelectFriends selection={this.selection} />
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

export default injectBot(BotShareSelectFriends);

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
