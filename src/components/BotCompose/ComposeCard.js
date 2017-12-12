// @flow

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';
import location from '../../store/locationStore';
import botStore from '../../store/botStore';

type Props = {
  edit: boolean,
  titleBlurred: boolean,
};

@observer
class ComposeCard extends React.Component {
  props: Props;
  botTitle: any;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.titleBlurred) {
      this.botTitle.blur();
    }
  }
  componentDidMount() {
    if (this.botTitle && this.botTitle.focus && !this.props.edit && !botStore.bot.title) {
      this.botTitle.focus();
    }
  }

  render() {
    const {edit} = this.props;
    const address = `${botStore.bot.isCurrent ? 'Current - ' : ''}${botStore.bot.address}`;
    const titleColor = {color: location.isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight};
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
              value={botStore.bot.title}
              onChangeText={text => (botStore.bot.title = text)}
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
          onPress={() => Actions.botAddress({bot: botStore.bot})}
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
