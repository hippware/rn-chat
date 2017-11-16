// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import {when, toJS} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {colors} from '../../constants';
import locationStore from '../../store/locationStore';
import {LOCATION} from '../../model/Bot';
import botFactory from '../../factory/botFactory';
import botStore from '../../store/botStore';
import analyticsStore from '../../store/analyticsStore';
import BotCompose from './BotCompose';

type Props = {
  isFirstScreen?: boolean,
  item?: number,
  edit?: boolean,
  titleBlurred?: boolean,
};

@observer
class BotComposeScene extends React.Component<Props> {
  static onRight = ({isFirstScreen}) => {
    const {title, location, address} = botStore.bot;
    if (title.trim().length && location && address) {
      if (isFirstScreen) {
        Actions.refresh({isFirstScreen: false, titleBlurred: true});
      }
    }
  };

  static rightTitle = ({isFirstScreen}) => {
    return isFirstScreen ? 'Next' : null;
  };

  static rightButtonTintColor = () => (botStore.bot.title.trim().length && botStore.bot.location && botStore.bot.address && colors.PINK) || colors.DARK_GREY;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.item) {
      botStore.bot = botFactory.create({id: this.props.item});
    }
    if (!botStore.bot) {
      botStore.create({type: LOCATION});

      when(
        () => locationStore.location,
        () => {
          botStore.bot.location = locationStore.location;
        },
      );
    }
    // TODO: figure out how to do this for a bot that doesn't yet exist in botFactory
    // else if (botStore.bot.location) {
    //   this.latitude = botStore.bot.location.latitude;
    //   this.longitude = botStore.bot.location.longitude;
    // }
  }

  componentWillReceiveProps(props: Props) {
    if (!props.isFirstScreen && this.props.isFirstScreen) {
      analyticsStore.track('botcreate_namebot', toJS(botStore.bot));
    }
  }
  render() {
    return <BotCompose bot={botStore.bot} {...this.props} />;
  }
}

export default BotComposeScene;
