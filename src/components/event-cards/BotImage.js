// @flow

import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {defaultCover, width} from '../Global';
import Bot from '../../model/Bot';
import File from '../../model/File';
import {colors} from '../../constants';

type Props = {
  bot: Bot,
  image?: File,
};

const BotImage = observer((props: Props) => {
  const {bot, image} = props;
  const img = image || bot.image;
  const source = img ? img.source : defaultCover[bot.coverColor % 4];
  return img && !img.loaded ? <View style={[styles.image, {backgroundColor: colors.GREY}]} /> : <Image style={styles.image} source={source} resizeMode='contain' />;
});

export default BotImage;

const styles = StyleSheet.create({
  image: {height: width, width},
});
