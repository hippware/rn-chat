import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
import Video from 'react-native-video';

export default class Launch extends React.Component {
    componentDidMount(){
        //setTimeout(()=>Actions.processLogin(),50);
    }

    render(){
        return <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor:'transparent'}}>
            <Video source={{uri: "Launch"}} // Can be a URL or a local file.
                   rate={1.0}                   // 0 is paused, 1 is normal.
                   volume={0}                 // 0 is muted, 1 is normal.
                   muted={true}                // Mutes the audio entirely.
                   paused={false}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={true}                // Repeat forever.
                   style={styles.backgroundVideo} />
        </View>

    }
}


var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});