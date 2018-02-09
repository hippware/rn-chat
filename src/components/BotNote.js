// @flow

import React from 'react';
import {TextInput, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {when} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {colors} from '../constants';
import bot from '../store/botStore';
import {k} from './Global';
import Screen from './Screen';

const save = async (data) => {
  const oldDescription = bot.bot.description;
  bot.bot.description = data;
  Actions.pop();
  if (!bot.bot.isNew) {
    bot.bot.noteSaving = true;
    try {
      await bot.save();
    } catch (e) {
      bot.bot.description = oldDescription;
      Alert.alert(e);
    } finally {
      bot.bot.noteSaving = false;
    }
  }
};

type Props = {
  value?: string,
};

@observer
class BotNote extends React.Component {
  props: Props;

  static title = 'Note';

  static onRight = ({value}) => {
    if (value.trim().length) {
      save(value.trim());
    }
  };

  static rightTitle = 'Save';

  static rightButtonTintColor = ({value}) => (value && value.length && colors.PINK) || colors.DARK_GREY;

  componentWillMount() {
    when(() => bot.bot && bot.bot.description, () => Actions.refresh({value: bot.bot.description}));
  }

  deleteNote = () => {
    Alert.alert(null, 'Are you sure you want to delete this note?', [{text: 'Cancel', style: 'cancel'}, {text: 'Delete', style: 'destructive', onPress: () => save('')}]);
  };

  render() {
    const {value} = this.props;
    return (
      <Screen>
        <TextInput
          style={styles.text}
          multiline
          autoFocus
          placeholder='Enter a note'
          placeholderTextColor='rgb(211,211,211)'
          maxLength={1500}
          value={value}
          onChangeText={val => Actions.refresh({value: val})}
        />
        {!!value && (
          <TouchableOpacity onPress={this.deleteNote} style={styles.button}>
            <Text style={styles.buttonText}>DELETE</Text>
          </TouchableOpacity>
        )}
      </Screen>
    );
  }
}

export default BotNote;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 250 * k,
    paddingTop: 15 * k,
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    backgroundColor: 'white',
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
  button: {
    borderRadius: 2,
    backgroundColor: 'rgb(246,246,246)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 274 * k,
    width: 78 * k,
    right: 15 * k,
    height: 31 * k,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11 * k,
    color: 'rgb(254,92,108)',
    letterSpacing: 0.5,
  },
});
