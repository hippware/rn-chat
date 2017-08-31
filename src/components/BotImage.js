// @flow

import React from 'react';
import {Image, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {k, defaultCover, width} from './Global';
import Bot from '../model/Bot';
import File from '../model/File';
import {colors} from '../constants';

type Props = {
  bot: Bot,
  image?: File,
  filter?: boolean,
};

const BotImage = (props: Props) => {
  const {bot, image} = props;
  const source = image ? image.source : bot.image && bot.image.source;
  if (source) {
    return (
      <View style={{flex: 1}}>
        <Image style={{height: width, width}} source={source} resizeMode='contain' />
      </View>
    );
  } else {
    return <Image style={{height: width, width}} source={defaultCover[bot.coverColor % 4]} resizeMode='contain' />;
  }
};

export default observer(BotImage);
