import React from 'react';
import {Image, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {k, defaultCover} from './Global';
import Bot from '../model/Bot';
import File from '../model/File';
import {colors} from '../constants';

type Props = {
    bot: Bot,
    image?: File
};

const maskColors = [colors.COVER_PINK_MASK, colors.COVER_BLUE_MASK, colors.COVER_GREEN_MASK, colors.COVER_PURPLE_MASK];
const BotImage = (props: Props) => {
    const {bot, image} = props;
    const source = image ? image.source : bot.image && bot.image.source;
    return (
        <View>
            {source
                ? <View style={{flex: 1}}>
                      <Image
                          resizeMode='contain'
                          style={{
                              width: 375 * k,
                              height: 275 * k,
                          }}
                          source={source}
                      />
                      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: maskColors[bot.coverColor % 4]}} />
                  </View>
                : <Image
                    style={{
                        width: 375 * k,
                        height: 275 * k,
                    }}
                    source={defaultCover[bot.coverColor % 4]}
                />}
        </View>
    );
};

export default observer(BotImage);
