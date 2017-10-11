// @flow

import React from 'react';
import {View, Text, Animated, Alert, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import Popover from 'react-native-popover';
import {observer} from 'mobx-react/native';
import {toJS} from 'mobx';
import {k, width, defaultCover} from '../Global';
import botStore from '../../store/botStore';
import locationStore from '../../store/locationStore';
import {colors} from '../../constants';
import BotButtons from './BotButtons';
import UserInfoRow from './UserInfoRow';
import Bot from '../../model/Bot';
import {RText} from '../common';

type Props = {
  bot: Bot,
  flashPopover: Function,
};

type State = {
  fadeAnim: any,
  // showNavBar: true,
  // navBarHeight: any,
  // currentScreenWidth?: number,
  // currentScreenHeight?: number,
  isVisible?: boolean,
  buttonRect?: Object,
};

const DOUBLE_PRESS_DELAY = 300;

@observer
class BotDetailsHeader extends React.Component {
  props: Props;
  state: State;
  lastImagePress: ?number;
  userInfo: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
      fadeAnim: new Animated.Value(0),
      buttonRect: {},
    };
  }

  flashPopover = (buttonRect?: Object) => {
    this.setState({isVisible: true, buttonRect});
    setTimeout(() => this.setState({isVisible: false, buttonRect: {}}), 2000);
  };

  showPopover = () => {
    this.userInfo.measure()((ox, oy, w, h, px, py) => this.flashPopover({x: px, y: py, width: w, height: h}));
  };

  handleImagePress = (e: Object) => {
    const now = new Date().getTime();

    if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.handleImageDoublePress(e);
    } else {
      this.lastImagePress = now;
    }
  };

  handleImageDoublePress = () => {
    if (!this.props.bot.isSubscribed) {
      this.subscribe();
    }
  };

  unsubscribe = () => {
    Alert.alert(null, 'Are you sure you want to unsubscribe?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unsubscribe',
        style: 'destructive',
        onPress: () => botStore.unsubscribe(this.props.bot),
      },
    ]);
  };

  subscribe = () => {
    botStore.subscribe(this.props.bot);
    // do animation
    this.setState({fadeAnim: new Animated.Value(1)});
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {toValue: 0}).start();
    }, 500);
  };

  render() {
    const {bot} = this.props;
    if (!bot) return null;
    const owner = bot.owner;
    const isOwn = !owner || owner.isOwn;
    return (
      <View style={{flex: 1}}>
        <View style={{height: width, backgroundColor: 'white'}}>
          <TouchableWithoutFeedback onPress={this.handleImagePress}>
            {bot.image && bot.image.source ? (
              <Image style={{height: width, width}} resizeMode='contain' source={bot.image.source} />
            ) : (
              <Image style={{height: width, width}} source={defaultCover[bot.coverColor % 4]} resizeMode='contain' />
            )}
          </TouchableWithoutFeedback>
          <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
            <Image source={require('../../../images/iconBotAdded.png')} />
          </Animated.View>
        </View>
        <BotButtons bot={toJS(bot)} subscribe={this.subscribe} unsubscribe={this.unsubscribe} afterCopy={this.showPopover} />
        <UserInfoRow flashPopover={this.props.flashPopover} bot={toJS(bot)} ref={r => (this.userInfo = r)} />
        {!!bot.description && (
          <View style={styles.descriptionContainer}>
            <RText numberOfLines={0} size={16} weight='Light' color={locationStore.isDay ? colors.DARK_PURPLE : colors.WHITE}>
              {bot.description}
            </RText>
          </View>
        )}
        <View style={{height: 8.5, width}} />
        <View style={{height: 45, width, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
          <Image style={{marginLeft: 14, width: 14, height: 14}} source={require('../../../images/postsIcon.png')} />
          <RText size={15} color={colors.DARK_PURPLE} style={{marginLeft: 7, letterSpacing: 0.3}}>
            Posts
          </RText>

          <RText size={12} color={colors.DARK_GREY} style={{marginLeft: 7}}>
            {bot.totalItems}
          </RText>
        </View>
        <View style={{height: 1, width}} />
        <Popover
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          contentStyle={{backgroundColor: colors.DARK_PURPLE}}
          placement='bottom'
          // onClose={this.closePopover}
        >
          <Text style={styles.popoverText}>Address copied to clipboard</Text>
        </Popover>
      </View>
    );
  }
}

export default BotDetailsHeader;

const styles = StyleSheet.create({
  popoverText: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 14 * k,
  },
  showNoMore: {
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 21,
  },
  noPhotosAdded: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    // @TODO: #683. standardize. this is between GREY and LIGHT_GREY
    color: 'rgb(186,186,186)',
  },
  attachPhoto: {
    height: 201 * k,
    backgroundColor: colors.LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    paddingBottom: 15 * k,
    backgroundColor: colors.WHITE,
  },
  botAddedContainer: {
    height: width,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
