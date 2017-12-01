// @flow

import React from 'react';
import {View, Image} from 'react-native';
import {Spinner} from './common';

type Props = {
  footerImage: any,
  finished: boolean,
  style?: Object,
};

const ListFooter = ({footerImage, finished, style}: Props) => (
  <View style={[{...style}, {paddingTop: 10, alignItems: 'center', paddingBottom: 21}]}>{finished ? <Image source={footerImage} /> : <Spinner />}</View>
);

export default ListFooter;
