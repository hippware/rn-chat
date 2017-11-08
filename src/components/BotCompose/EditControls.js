// @flow

import React from 'react';
import {View, Alert, TextInput, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';
import botStore from '../../store/botStore';
import VisibilitySwitch from '../BotVisibilitySwitch';
import Button from '../Button';
import TextInputMaxLines from '../common/TextInputMaxLines';

const removeBot = () => {
  Alert.alert(null, 'Are you sure you want to delete this bot?', [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Delete',
      style: 'destructive',
      onPress: () => {
        botStore.remove(botStore.bot.id, botStore.bot.server);
        Actions.pop();
        Actions.pop({animated: false});
      },
    },
  ]);
};

const EditControls = observer(() => (
  <View>
    <View style={[{backgroundColor: colors.WHITE}, styles.separator]}>
      <VisibilitySwitch bot={botStore.bot} />
      <Cell imageStyle={{paddingLeft: 10 * k, paddingTop: 7 * k, alignSelf: 'flex-start'}} style={styles.separator} image={require('../../../images/botNotePink.png')}>
        <TextInputMaxLines
          multiline
          style={{height: 200 * k, flex: 1, fontFamily: 'Roboto-Regular', fontSize: 15}}
          placeholder="What's cool about this place?"
          onChangeText={text => (botStore.bot.description = text)}
          value={botStore.bot.description}
          maxLength={1500}
          maxLines={2}
        />
      </Cell>
    </View>
    {botStore.bot.isNew ? (
      <Button
        onPress={() => {
          Actions.pop({animated: false});
          Actions.pop();
        }}
        textStyle={{color: colors.PINK}}
        style={styles.crud}
      >
        Cancel Bot
      </Button>
    ) : (
      <Button onPress={removeBot} textStyle={{color: colors.PINK}} style={styles.crud}>
        Delete Bot
      </Button>
    )}
  </View>
));

export default EditControls;

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
  },
  crud: {
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    position: 'relative',
    backgroundColor: 'transparent',
  },
});
