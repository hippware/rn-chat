// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
// import analyticsStore from '../../store/analyticsStore';

type Props = {
  trackName: string,
  trackData?: Object,
  onPress: Function,
};

const TouchableOpTrack = (props: Props) => (
  <TouchableOpacity
    {...props}
    onPress={(...args) => {
      // TODO analytics with new MST
      // analyticsStore.track(props.trackName, props.trackData);
      props.onPress(...args);
    }}
  />
);

export default TouchableOpTrack;
