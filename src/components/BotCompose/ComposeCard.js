// @flow

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {k} from '../Global';
import {colors} from '../../constants';
import Cell from '../Cell';
import {isAlive} from 'mobx-state-tree';
import Switch from '../Switch';
import {RText} from '../common';

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
    if (!bot || !isAlive(bot)) return null;
    const address = `${bot.location && bot.location.isCurrent ? 'Current - ' : ''}${bot.address}`;
    const titleColor = {color: colors.navBarTextColorDay};
    return (
      <View style={{backgroundColor: colors.WHITE}}>
        <Cell
          style={[{padding: 10 * k}, styles.separator]}
          image={require('../../../images/faceless.png')}
          imageStyle={{paddingLeft: 21 * k}}
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
        <Cell imageStyle={{paddingLeft: 21, width: 50}} image={require('../../../images/foot.png')} style={styles.separator}>
          <RText style={{padding: 16, flex: 1, paddingRight: 30}} weight='Medium' size={15 * k}>
            Know when friends visit your bot!
          </RText>
          <Switch
            style={{paddingRight: 21}}
            toggleHeight={32}
            toggleWidth={32}
            switchHeight={38}
            switchWidth={63}
            active={bot.geofence}
            onChangeState={(geofence) => {
              bot.setGeofence(geofence);
            }}
            activeBackgroundColor={colors.PINK}
            inactiveBackgroundColor={colors.GREY}
            activeButtonColor='white'
            inactiveButtonColor='white'
            activeButtonPressedColor='white'
            inactiveButtonPressedColor='white'
            buttonShadow={{
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 0,
              shadowOffset: {height: 0, width: 0},
            }}
          />
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
