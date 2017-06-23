import React from 'react';
import {
  View,
  Slider,
  Image,
  StyleSheet,
  TextInput,
  ListView,
  InteractionManager,
  Animated,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import {colors} from '../constants';

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/botStore';
import Bot from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/botFactory';
import {k} from '../globals';
import NavTitle from './NavTitle';
import Screen from './Screen';

@autobind
@observer
export default class BotNote extends React.Component {
  @observable value = '';

  componentWillMount() {
    this.value = bot.bot.description;
  }

  deleteNote() {
    Alert.alert(null, 'Are you sure you want to delete this note?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => this.props.onSave('')},
    ]);
  }

  render() {
    return (
      <Screen>
        <TextInput
            style={{
              position: 'absolute',
              top: 72 * k,
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
            }}
            multiline
            autoFocus
            placeholder='Enter a note'
            placeholderTextColor='rgb(211,211,211)'
            maxLength={1500}
            value={this.value}
            onChangeText={value => (this.value = value)}
        />
        {!!this.value &&
          <TouchableOpacity
              onPress={this.deleteNote}
              style={{
                borderRadius: 2,
                backgroundColor: 'rgb(246,246,246)',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 274 * k,
                width: 78 * k,
                right: 15 * k,
                height: 31 * k,
              }}
          >
            <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 11 * k,
                  color: 'rgb(254,92,108)',
                  letterSpacing: 0.5,
                }}
            >
              DELETE
            </Text>
          </TouchableOpacity>}

        <NavTitle>{this.props.title || 'Note'}</NavTitle>
        <SaveButton active={this.value.trim().length > 0} onSave={() => this.props.onSave(this.value.trim())} />
      </Screen>
    );
  }
}
