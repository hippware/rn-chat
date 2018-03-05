// @flow

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {isAlive} from 'mobx-state-tree';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';
import VisibilitySwitch from '../BotVisibilitySwitch';
import Button from '../Button';

type Props = {
  bot: Bot,
};

@inject('bot', 'wocky')
@observer
class EditControls extends React.Component<Props> {
  input: any;

  focus = () => {
    this.input.focus();
  };

  render() {
    const {bot} = this.props;
    if (!bot || !isAlive(bot)) return null;
    return (
      <View>
        <View style={[{backgroundColor: colors.WHITE}, styles.separator]}>
          <VisibilitySwitch bot={bot} />
          <Cell imageStyle={{paddingLeft: 10 * k, paddingTop: 7 * k, alignSelf: 'flex-start'}} style={styles.separator} image={require('../../../images/botNotePink.png')}>
            <TextInput
              multiline
              style={{height: 200 * k, flex: 1, fontFamily: 'Roboto-Regular', fontSize: 15}}
              placeholder='Tell us about this place!'
              onChangeText={text => bot.load({description: text})}
              value={bot.description}
              maxLength={1500}
              ref={r => (this.input = r)}
            />
          </Cell>
        </View>
        {bot.isNew && (
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
