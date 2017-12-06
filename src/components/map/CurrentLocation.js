// @flow

import React from 'react';
import {Animated, View, Image, TouchableOpacity} from 'react-native';
import {k} from '../Global';
import {reaction} from 'mobx';
import {colors} from '../../constants/index';
import {RText} from '../common';
import botStore from '../../store/botStore';
import Separator from '../Separator';

type Props = {};

type State = {
  marginTop: any,
};

const HIDDEN = -100;

class CurrentLocation extends React.Component<Props, State> {
  handler: ?Function = null;

  state: State = {
    // marginTop: new Animated.Value(HIDDEN),
    marginTop: new Animated.Value(0),
  };

  componentWillMount() {
    this.handler = reaction(() => botStore.addressSearchEnabled, this.toggle);
  }

  componentWillUnmount() {
    this.handler && this.handler();
  }

  toggle = (show: boolean) => {
    const toValue = show ? 0 : HIDDEN;
    Animated.spring(this.state.marginTop, {toValue}).start();
  };

  render() {
    return (
      <Animated.View style={[{marginTop: this.state.marginTop},
        {paddingHorizontal: 20 * k, borderColor: colors.LIGHT_GREY, borderBottomWidth: 1, paddingVertical: 10 * k, backgroundColor: colors.WHITE, zIndex: -1}]}
      >
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={botStore.redirectToCurrentLocation}>
          <Image source={require('../../../images/currentLocation.png')} style={{marginRight: 20 * k}} />
          <View>
            <RText weight='Bold' size={15}>
              Use Current Location
            </RText>
            <RText size={15}>1365 Wichita Dr</RText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default CurrentLocation;
