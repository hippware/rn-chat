// @flow

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {defaultCover, width} from '../Global';

type Props = {
  bot: any,
  image?: any,
  isGeo?: boolean,
};

const geoDefault = require('../../../images/geoShareDefault.png');
const geoOverlay = require('../../../images/geoShareOverlay.png');

const BotImage = observer(({bot, image, isGeo}: Props) => {
  const img = (image && image.source) || (bot.image && bot.image.thumbnail);
  const source = img || (isGeo ? geoDefault : defaultCover[bot.coverColor % 4]);
  const inner = <Image style={styles.image} source={source} resizeMode='cover' />;
  return isGeo && img ? (
    <View style={styles.image}>
      {inner}
      <View style={{backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
        <Image source={geoOverlay} style={styles.image} resizeMode='cover' />
      </View>
    </View>
  ) : (
    inner
  );
});

export default BotImage;

const styles = StyleSheet.create({
  image: {height: width, width},
});
