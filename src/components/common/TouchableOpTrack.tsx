// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {inject} from 'mobx-react/native';
// import analyticsStore from '../../store/analyticsStore';

type Props = {
  trackName: string,
  trackData?: Object,
  onPress: Function,
};

const TouchableOpTrack = inject('analytics')((props: Props) => (
  <TouchableOpacity
    {...props}
    onPress={(...args) => {
      // TODO analytics with new MST
      props.analytics.track(props.trackName, props.trackData);
      props.onPress(...args);
    }}
  />
));

export default TouchableOpTrack;
