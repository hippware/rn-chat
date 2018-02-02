// @flow

import React from 'react';
import {View, Alert, TextInput, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';
import VisibilitySwitch from '../BotVisibilitySwitch';
import Button from '../Button';

type Props = {
  // bot: Bot
};

@inject('bot')
@observer
class EditControls extends React.Component<Props> {
  input: any;

  focus = () => {
    this.input.focus();
  };

  removeBot = () => {
    Alert.alert(null, 'Are you sure you want to delete this bot?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          // TODO: botStore.remove(botStore.bot.id, botStore.bot.server);
          // Actions.pop();
          // Actions.pop({animated: false});
        },
      },
    ]);
  };

  render() {
    const {bot} = this.props;
    return (
      <View>
        <View style={[{backgroundColor: colors.WHITE}, styles.separator]}>
          <VisibilitySwitch bot={bot} />
          <Cell imageStyle={{paddingLeft: 10 * k, paddingTop: 7 * k, alignSelf: 'flex-start'}} style={styles.separator} image={require('../../../images/botNotePink.png')}>
            <TextInput
              multiline
              style={{height: 200 * k, flex: 1, fontFamily: 'Roboto-Regular', fontSize: 15}}
              placeholder='Tell us about this place!'
              onChangeText={text => bot.update({description: text})}
              value={bot.description}
              maxLength={1500}
              ref={r => (this.input = r)}
            />
          </Cell>
        </View>
        {bot.isNew ? (
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
          <Button onPress={this.removeBot} textStyle={{color: colors.PINK}} style={styles.crud}>
            Delete Bot
          </Button>
        )}
      </View>
    );
  }
}

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
