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
import {autorun} from 'mobx';

type Props = {
  edit?: boolean,
  titleBlurred?: boolean,
};

@inject('bot', 'wocky', 'locationStore')
@observer
class ComposeCard extends React.Component<Props> {
  botTitle: any;
  handler: any;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.titleBlurred) {
      this.botTitle.blur();
    }
  }
  componentDidMount() {
    if (this.botTitle && this.botTitle.focus && !this.props.edit && !this.props.bot.title) {
      this.botTitle.focus();
    }
    this.handler = autorun(() => {
      if (this.props.wocky.connected && this.props.bot.geofence) {
        if (!this.props.locationStore.alwaysOn) {
          Actions.geofenceWarning({bot: this.props.bot});
          this.switch.deactivate();
        } else {
          this.switch.activate();
        }
      }
    });
  }

  componentWillUnmount() {
    this.handler();
  }

  render() {
    const {bot, wocky, locationStore} = this.props;
    if (!bot || !isAlive(bot)) return null;
    const address = `${bot.location && bot.location.isCurrent ? 'Current - ' : ''}${bot.address}`;
    const titleColor = {color: colors.navBarTextColorDay};
    return (
      <View style={{backgroundColor: colors.WHITE}}>
        <Cell style={[{padding: 10}, styles.separator]} image={require('../../../images/faceless.png')} imageStyle={{paddingLeft: 16}} textStyle={{fontFamily: 'Roboto-Light'}}>
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
        <Cell imageStyle={{paddingLeft: 5, width: 50}} image={require('../../../images/foot.png')} style={[styles.separator, {paddingTop: 0, paddingBottom: 0}]}>
          <View style={{padding: 16, flex: 1, paddingRight: 30}}>
            <RText weight='Medium' size={15}>
              {"See Who's Here"}
            </RText>
            <RText weight='Light' size={14}>
              Know when friends are here!
            </RText>
          </View>

          <Switch
            ref={r => (this.switch = r)}
            style={{paddingRight: 21}}
            toggleHeight={32}
            toggleWidth={32}
            switchHeight={38}
            switchWidth={63}
            active={bot.geofence}
            onChangeState={bot.setGeofence}
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
