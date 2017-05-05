import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {k, width, height, defaultCover} from './Global';
import Bot from '../model/Bot';
import File from '../model/File';

type Props = {
    bot: Bot,
    image?: File
};

@observer
export default class extends React.Component {
    props: Props;
    render() {
        const {bot, image} = this.props;
        const source = (image && image.source) || (bot.image && bot.image.source) || (bot.thumbnail && bot.thumbnail.source);
        return (
            <View>
                {source
                    ? <Image
                        resizeMode='contain'
                        style={{
                            width: 375 * k,
                            height: 275 * k,
                        }}
                        source={source}
                    />
                    : <Image
                        style={{
                            width: 375 * k,
                            height: 275 * k,
                        }}
                        source={defaultCover[bot.coverColor % 4]}
                    />}
            </View>
        );
    }
}
