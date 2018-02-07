// @flow

import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {k} from '../Global';
import * as colors from '../../constants/colors';
import {observer} from 'mobx-react/native';
import {RText} from '../common';

type Props = {
  profile: any,
  onPress?: Function,
  style?: any,
  size?: number,
  textStyle?: any,
};

const ProfileHandle = observer((props: Props) => {
  const {onPress, profile, style, size, textStyle} = props;
  const theSize = size || 13;

  const inner = (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <RText color={colors.DARK_PURPLE} weight='Medium' size={theSize} style={textStyle}>
        @{profile.handle}
      </RText>
      {profile.isVerified && <Image source={require('../../../images/verifiedIcon.png')} style={{marginLeft: 2 * k}} resizeMode='contain' />}
    </View>
  );

  return onPress ? <TouchableOpacity onPress={onPress}>{inner}</TouchableOpacity> : inner;
});

export default ProfileHandle;
