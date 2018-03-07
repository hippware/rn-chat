// @flow

import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import {observer, inject} from 'mobx-react/native';
import BotButton from '../BotButton';
import {Actions} from 'react-native-router-flux';

@inject('locationStore', 'store')
@observer
class FullMap extends React.Component<{}> {
  componentWillMount() {
    if (!this.props.locationStore.alwaysOn && !this.props.store.locationPrimed) {
      Actions.locationPrimer();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Map fullMap followUser>
          <BotButton />
        </Map>
      </View>
    );
  }
}

export default FullMap;
