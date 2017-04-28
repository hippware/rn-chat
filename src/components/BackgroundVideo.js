import React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default class extends React.Component {
    render() {
        return (
            <View style={[styles.container, {opacity: 1}]}>
                <Video
                    source={{uri: 'Launch'}} // Can be a URL or a local file.
                    rate={1.0} // 0 is paused, 1 is normal.
                    volume={0} // 0 is muted, 1 is normal.
                    muted // Mutes the audio entirely.
                    paused={false} // Pauses playback entirely.
                    resizeMode='cover' // Fill the whole screen at aspect ratio.
                    repeat // Repeat forever.
                    style={styles.container}
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                    style={[styles.container, {opacity: 0.79}]}
                />
            </View>
        );
    }
}
