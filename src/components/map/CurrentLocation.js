// @flow

import React from 'react';
import {Animated, View, Image, TouchableOpacity} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants/index';
import {RText} from '../common';
import geocodingStore from '../../store/geocodingStore';
import locationStore from '../../store/locationStore';

type Props = {
  enabled: boolean,
  onPress: Function,
};

type State = {
  address: string,
  meta: any,
  marginTop: any,
};

const HIDDEN = -100;

class CurrentLocation extends React.Component<Props, State> {
  state: State = {
    marginTop: new Animated.Value(0),
    address: '',
    meta: {},
  };

  componentDidMount() {
    this.toggle(this.props.enabled);
    setTimeout(async () => {
      const data = await geocodingStore.reverse(locationStore.location);
      if (data) {
        this.setState(data);
      }
    });
  }
  componentWillReceiveProps(props) {
    if (props.enabled !== undefined && this.props.enabled !== props.enabled) {
      this.toggle(props.enabled);
    }
  }
  toggle = (show: boolean) => {
    const toValue = show ? 0 : HIDDEN;
    Animated.spring(this.state.marginTop, {toValue}).start();
  };

  onPress = () => {
    this.props.onPress({location: locationStore.location, address: this.state.address, meta: this.state.meta});
  };

  render() {
    return (
      <Animated.View style={[{marginTop: this.state.marginTop},
        {paddingHorizontal: 20 * k, borderColor: colors.LIGHT_GREY, borderBottomWidth: 1, paddingVertical: 10 * k, backgroundColor: colors.WHITE, zIndex: -1}]}
      >
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={this.onPress}>
          <Image source={require('../../../images/currentLocation.png')} style={{marginRight: 20 * k}} />
          <View style={{flex: 1}}>
            <RText weight='Bold' size={15}>
              Use Current Location
            </RText>
            <RText size={15} numberOfLines={1}>{this.state.address}</RText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default CurrentLocation;
