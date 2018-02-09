// @flow

import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {defaultCover, width} from '../Global';
import {colors} from '../../constants';

type Props = {
  bot: any,
  image?: any,
};

const BotImage = observer((props: Props) => {
  const {bot, image} = props;
  const img = (image && image.source) || (bot.image && bot.image.thumbnail);
  const source = img || defaultCover[bot.coverColor % 4];
  return <Image style={styles.image} source={source} resizeMode='contain' />;
});

export default BotImage;

const styles = StyleSheet.create({
  image: {height: width, width},
});
