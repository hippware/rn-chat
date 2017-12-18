// @flow

import React from 'react';
import {View, Image} from 'react-native';
import {Spinner} from './common';
import {observer} from 'mobx-react/native';

type Props = {
  footerImage: any,
  finished: boolean,
  style?: Object,
};

const ListFooter = observer(({footerImage, finished, style}: Props) => (
  <View style={[{...style}, {paddingTop: 10, alignItems: 'center', paddingBottom: 21}]}>{finished ? footerImage ? <Image source={footerImage} /> : null : <Spinner />}</View>
));

export default ListFooter;
