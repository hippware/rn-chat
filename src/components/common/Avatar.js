// @flow

import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';

const onlineColor = colors.LIGHT_BLUE;
const offlineColor = 'rgb(211,211,211)';
const imgAnon = require('../../../images/follower.png');

type Props = {
  profile: any,
  size: number,
  disableStatus?: boolean,
  style?: Object,
  borderWidth?: number,
  showFrame?: boolean,
  tappable: boolean,
  smallFont?: boolean,
};

@observer
class Avatar extends React.Component<Props> {
  _root: any;

  static defaultProps = {
    tappable: true,
  };

  // Do we need this?
  // setNativeProps(nativeProps) {
  //   if (this._root) {
  //     this._root.setNativeProps(nativeProps);
  //   }
  // }

  render() {
    const {size = 50, disableStatus, style, borderWidth, showFrame, profile, tappable, smallFont} = this.props;
    let title = profile.displayName || ' ';
    const showLoader = !(profile.avatar && profile.avatar.loaded);
    title = title.length > 1 ? title[0] : title;
    const Clazz = tappable ? TouchableOpacity : View;
    return (
      <Clazz style={{justifyContent: 'flex-end'}} onPress={() => Actions.profileDetails({item: profile.id})}>
        <View ref={component => (this._root = component)} style={[style, {height: size * k, width: size * k}]}>
          {!!profile.avatar && <AvatarImage {...this.props} source={profile.avatar.thumbnail} showLoader={showLoader} size={size} />}
          {!profile.avatar && (
            <View
              style={{
                width: size * k,
                height: size * k,
                borderRadius: size * k / 2,
                justifyContent: 'center',
                borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
                borderColor: 'white',
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

const AvatarImage = ({source, borderWidth, style, size, showLoader}) => {
  const theStyle = [
    {
      borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
      borderColor: colors.WHITE,
      backgroundColor: colors.gray(222),
    },
    style,
    {width: size * k, height: size * k, borderRadius: size * k / 2},
  ];
  return showLoader ? <View style={theStyle} /> : <Image source={source} style={theStyle} />;
};

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

export default Avatar;
