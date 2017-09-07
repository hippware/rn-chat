// @flow

import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';
import location from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';
import Profile from '../../model/Profile';

const onlineColor = colors.LIGHT_BLUE;
const offlineColor = 'rgb(211,211,211)';
const imgAnon = require('../../../images/follower.png');

type Props = {
  // @NOTE: if we have a profile, we usually don't need a source or title
  profile?: Profile,
  source?: string,
  title: string,

  text: string,
  size: number,
  disableStatus: boolean,
  style?: Object,
  borderWidth: number,
  showFrame: boolean,
  tappable: boolean,
  smallFont?: boolean,
};

const PresenceDot = observer(({profile, size, disableStatus}) => {
  const backgroundColor = profile && profile.status === 'available' ? onlineColor : offlineColor;
  const shift = size * k * 3 / 4;
  const d = Math.max(10, size / 5) * k;
  const style = {borderRadius: d / 2, borderWidth: d / 10, height: d, width: d, top: shift, left: shift};

  if (profile) {
    const {isOwn, isMutual} = profile;
    if ((isMutual || isOwn) && !disableStatus) {
      return <View style={[styles.dot, style, {backgroundColor}]} />;
    } else {
      return <Image source={imgAnon} style={[styles.dot, style]} />;
    }
  } else {
    return null;
  }
});

@observer
export default class Avatar extends Component {
  props: Props;

  static defaultProps = {
    tappable: true,
  };

  setNativeProps(nativeProps) {
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  }

  render() {
    const {text, size = 50, disableStatus, style, borderWidth, showFrame, profile, tappable, smallFont} = this.props;
    let {source, title = ' '} = this.props;
    if (profile) {
      source = !!profile.avatar && profile.avatar.source;
      title = profile.displayName || ' ';
    }
    if (title.length > 1) {
      title = title[0];
    }
    if (text) {
      title = text;
    }
    const isDay = location.isDay;
    const Clazz = tappable ? TouchableOpacity : View;
    return (
      <Clazz style={{justifyContent: 'flex-end'}} onPress={() => Actions.profileDetails({item: profile.user})}>
        <View ref={component => (this._root = component)} style={[style, {height: size * k, width: size * k}]}>
          {!!source && (
            <Image
              source={source}
              style={[
                {
                  borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
                  borderColor: isDay ? colors.WHITE : colors.PURPLE,
                },
                style,
                {width: size * k, height: size * k, borderRadius: size * k / 2},
              ]}
            />
          )}
          {!source && (
            <View
              style={{
                width: size * k,
                height: size * k,
                borderRadius: size * k / 2,
                justifyContent: 'center',
                borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
                borderColor: isDay ? 'white' : colors.PURPLE,
                alignItems: 'center',
                backgroundColor: 'rgb(228,228,228)',
              }}
            >
              <Text style={[styles.title, {fontSize: smallFont ? 12 * k : 18 * k}]}>{title.toUpperCase()}</Text>
            </View>
          )}
          {showFrame && (
            <View style={styles.frameOuter}>
              <Image source={require('../../../images/avatarFrame.png')} style={{width: size * k, height: size * k}} />
            </View>
          )}
          <PresenceDot profile={profile} size={size} disableStatus={disableStatus} />
        </View>
      </Clazz>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Regular',
  },
  dot: {
    position: 'absolute',
    borderColor: 'white',
  },
  frameOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
