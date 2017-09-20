// @flow

import React from 'react';
import {Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {defaultCover, width} from '../Global';
import Bot from '../../model/Bot';
import File from '../../model/File';

type Props = {
  bot: Bot,
  image?: File,
};

const BotImage = (props: Props) => {
  const {bot, image} = props;
  const source = (image ? image.source : bot.image && bot.image.source) || defaultCover[bot.coverColor % 4];
  return <Image style={{height: width, width}} source={source} resizeMode='contain' />;
};

export default observer(BotImage);
