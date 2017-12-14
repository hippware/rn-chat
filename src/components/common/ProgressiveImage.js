// @flow

import React from 'react';
import {Image} from 'react-native';
import * as colors from '../../constants/colors';
import File from '../../model/File';

type Props = {
  style?: Object,
  file: File,
};

const ProgressiveImage = ({style, file, ...rest}: Props) => {
  style = file && file.loaded ? style : {...style, backgroundColor: colors.gray(222)};
  return <Image style={{...style}} source={file && file.source} {...rest} />;
};

export default ProgressiveImage;
