// @flow

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';

type Props = {
  edit?: boolean,
  titleBlurred?: boolean,
};

@inject('bot')
@observer
class ComposeCard extends React.Component<Props> {
  botTitle: any;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.titleBlurred) {
      this.botTitle.blur();
    }
  }
  componentDidMount() {
    if (this.botTitle && this.botTitle.focus && !this.props.edit && !this.props.bot.title) {
      this.botTitle.focus();
    }
  }

  render() {
    const {bot} = this.props;
    const address = `${bot.location.isCurrent ? 'Current - ' : ''}${bot.address}`;
    const titleColor = {color: colors.navBarTextColorDay};
    return (
      <View style={{backgroundColor: colors.WHITE}}>
        <Cell
          style={[{padding: 10 * k}, styles.separator]}
          image={require('../../../images/faceless.png')}
          imageStyle={{paddingLeft: 14 * k}}
          textStyle={{fontFamily: 'Roboto-Light'}}
        >
          <View style={styles.textWrapper}>
            <TextInput
              placeholder='Name your bot'
              autoCorrect={false}
              ref={t => (this.botTitle = t)}
              placeholderTextColor={colors.GREY}
              value={bot.title}
              onChangeText={text => bot.load({title: text})}
              returnKeyType='done'
              clearButtonMode='while-editing'
              onSubmitEditing={() => {
                this.botTitle && this.botTitle.blur();
              }}
              blurOnSubmit={false}
              maxLength={60}
              style={[styles.titleInput, titleColor]}
            />
          </View>
        </Cell>
        <Cell
          imageStyle={{paddingLeft: 8 * k}}
          style={styles.separator}
          onPress={() => Actions.botAddress({botId: bot.id})}
          image={require('../../../images/iconBotLocationPink.png')}
        >
          {address}
        </Cell>
      </View>
    );
  }
}

export default ComposeCard;

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10 * k,
    justifyContent: 'center',
  },
  titleInput: {
    height: 25 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
