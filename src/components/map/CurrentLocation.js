// @flow

import React from 'react';
import {Animated, View, Image, TouchableOpacity} from 'react-native';
import {k} from '../Global';
// import {observer} from 'mobx-react/native';
import {observable, autorun, when, toJS, reaction} from 'mobx';
import {colors} from '../../constants/index';
import {RText} from '../common';
import botStore from '../../store/botStore';

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
    console.log('& toggle', show);
    if (show) this.show();
    else this.hide();
  };

  show = () => Animated.timing(this.state.marginTop, {toValue: 0}).start();

  hide = () => Animated.timing(this.state.marginTop, {toValue: HIDDEN}).start();

  render() {
    return (
      <Animated.View style={[{marginTop: this.state.marginTop}, {paddingHorizontal: 20 * k, paddingVertical: 10 * k, backgroundColor: colors.WHITE}]}>
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
