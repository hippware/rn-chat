// @flow

import React from 'react';
import Map from './Map';
import Bot from '../../model/Bot';
import {observer} from 'mobx-react/native';
import BotMarker from './BotMarker';

type Props = {
  bot: Bot,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

const BotDetailsMap = observer(({bot, scale, ...props}: Props) => {
  const fullMap = scale === 0;
  return (
    <Map
      location={bot ? bot.location : null}
      showOnlyBot
      showUser={fullMap}
      fullMap={fullMap}
      scale={scale}
      bot={bot}
      scrollEnabled={fullMap}
      rotateEnabled={fullMap}
      pitchEnabled={fullMap}
      zoomEnabled={fullMap}
      marker={<BotMarker {...props} scale={scale} bot={bot} />}
      {...props}
    />
  );
});

export default BotDetailsMap;
