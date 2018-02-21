// @flow

import React from 'react';
import * as log from '../../utils/log';
import {View, Animated, Alert, Image, StyleSheet, Clipboard} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {k, width, height} from '../Global';
import {colors} from '../../constants';
import BotButtons from './BotButtons';
import UserInfoRow from './UserInfoRow';
import {RText} from '../common';
import BotDetailsMap from '../map/BotDetailsMap';
import {Actions} from 'react-native-router-flux';

type Props = {
  bot: Bot,
  scale: number,
};

type State = {
  fadeAnim: any,
};

const DOUBLE_PRESS_DELAY = 300;

@inject('notificationStore', 'analytics')
@observer
class BotDetailsHeader extends React.Component<Props, State> {
  lastImagePress: ?number;
  userInfo: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  handleImagePress = (e: Object) => {
    const now = new Date().getTime();

    if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.handleImageDoublePress();
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
    Alert.alert(null, 'Are you sure you want to remove this from your saved bots?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => this.props.bot.unsubscribe(this.props.bot),
      },
    ]);
  };

  subscribe = () => {
    this.props.bot.subscribe();
    this.setState({fadeAnim: new Animated.Value(1)});
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {toValue: 0}).start();
    }, 500);
    this.props.analytics.track('bot_save', this.props.bot.toJSON());
  };

  copyAddress = () => {
    Clipboard.setString(this.props.bot.address);
    this.props.notificationStore.flash('Address copied to clipboard 👍');
  };

  render() {
    const {bot, scale} = this.props;
    if (!bot) return null;
    const owner = bot ? bot.owner : null;
    const isOwn = !owner || owner.isOwn;
    return (
      <View style={{flex: 1}}>
        <View style={{height: scale === 0 ? height - 60 * k : width, backgroundColor: 'white', overflow: 'hidden'}}>
          <BotDetailsMap bot={bot} onMapPress={() => Actions.refresh({scale: 0})} onImagePress={() => Actions.refresh({scale: scale === 1 ? 0.5 : scale + 0.5})} scale={scale} />
          <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
            <Image source={require('../../../images/iconBotAdded.png')} />
          </Animated.View>
        </View>
        {scale > 0 && (
          <View>
            <BotButtons isOwn={isOwn} bot={bot} subscribe={this.subscribe} unsubscribe={this.unsubscribe} isSubscribed={bot.isSubscribed} copyAddress={this.copyAddress} />
            <UserInfoRow bot={bot} owner={owner} copyAddress={this.copyAddress} />
            {bot &&
              !!bot.description && (
                <View style={styles.descriptionContainer}>
                  <RText numberOfLines={0} size={16} weight='Light' color={colors.DARK_PURPLE}>
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
                {bot ? bot.totalItems : ''}
              </RText>
            </View>
            <View style={{height: 1, width}} />
          </View>
        )}
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
