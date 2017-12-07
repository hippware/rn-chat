// @flow

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import locationStore from '../../store/locationStore';
import Screen from '../Screen';
import botStore from '../../store/botStore';
import geocodingStore from '../../store/geocodingStore';
import BotAddress from './BotAddress';
import analyticsStore from '../../store/analyticsStore';
import {toJS} from 'mobx';
import {observer} from 'mobx-react/native';
import {RText} from '../common';
import {k} from '../Global';
import {colors} from '../../constants';
import MapView from 'react-native-maps';

@observer
class BotCreate extends React.Component<{}> {
  static rightButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setBotLocationAndEdit(botStore.bot.location).then(() => Actions.botCompose({isFirstScreen: false}));
        }}
        style={{marginRight: 20 * k}}
      >
        <RText size={15} color={colors.PINK}>
          Next
        </RText>
      </TouchableOpacity>
    );
  };

  componentWillMount() {
    // TODO: prevent this from firing after creating a new bot and popping
    botStore.create();
    botStore.bot.location = locationStore.location;
    botStore.bot.isCurrent = true;
    analyticsStore.track('botcreate_start');
  }

  save = (data: Object) => {
    if (data) {
      botStore.bot.load(data);
    }
    analyticsStore.track('botcreate_chooselocation', toJS(botStore.bot));
    Actions.botCompose({isFirstScreen: true});
  };

  render() {
    const {latitude, longitude} = botStore.bot.location;
    return (
      <Screen isDay={locationStore.isDay}>
        <BotAddress
          onChangeBotLocation={setBotLocationAndEdit}
          marker={
            <MapView.Marker.Animated centerOffset={{x: 0, y: -35}} coordinate={{latitude, longitude}}>
              <Image source={require('../../../images/newBotMarker.png')} />
            </MapView.Marker.Animated>
          }
        />
      </Screen>
    );
  }
}

const setBotLocationAndEdit = async (location: Object) => {
  const data = await geocodingStore.reverse(location);
  botStore.changeBotLocation({...data, isCurrent: botStore.bot.isCurrent});
};

export default BotCreate;
