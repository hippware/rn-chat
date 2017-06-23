import React from 'react';
import SelectFriends from './SelectFriends';
import Screen from './Screen';
import {TouchableOpacity, Text, View, Keyboard, StyleSheet} from 'react-native';
import location from '../store/locationStore';
import {k} from '../globals';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import SelectableProfileList from '../model/SelectableProfileList';
import SelectableProfile from '../model/SelectableProfile';
import botStore from '../store/botStore';
import model from '../model/model';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-native';
import AutoExpandingTextInput from './AutoExpandingTextInput';
import {SHARE_SELECT} from '../model/Bot';
import {colors} from '../constants';

@autobind
@observer
export default class extends React.Component {
  @observable selection: SelectableProfileList;

  constructor(props) {
    super(props);
    this.state = {height: 0, message: ''};
  }

  share() {
    botStore.bot.shareMode = SHARE_SELECT;
    botStore.bot.shareSelect = this.selection.list
      .filter((selectableProfile: SelectableProfile) => selectableProfile.selected)
      .map((selectableProfile: SelectableProfile) => selectableProfile.profile);
    try {
      botStore.share(this.state.message, 'headline');
      Actions.pop({animated: false});
      Actions.botShareCompleted({
        user: botStore.bot.shareSelect[0].user,
        number: botStore.bot.shareSelect.length,
      });
    } catch (e) {
      alert(e);
    }
  }

  componentWillMount() {
    this.selection = new SelectableProfileList(model.friends.friends);
    botStore.bot.shareSelect = [];
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

  keyboardWillShow(e) {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  }

  keyboardWillHide(e) {
    if (this.mounted) this.setState({height: 0});
  }

  render() {
    return (
      <Screen isDay={location.isDay} style={{paddingTop: 70 * k, flex: 1}}>
        <SelectFriends selection={this.selection} />
        {!!this.selection.selected.length &&
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
              <Text style={styles.shareText}>
                Share
              </Text>
            </TouchableOpacity>
          </View>}
        <View style={{height: this.state.height}} />
      </Screen>
    );
  }
}

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
