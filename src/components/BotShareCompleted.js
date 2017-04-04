import React from 'react';
import {View, Text} from 'react-native';
import {k, width, height} from './Global';
import {Actions} from 'react-native-router-native';

export default class extends React.Component {
    componentDidMount() {
        setTimeout(Actions.pop, 3000);
    }

    render() {
        return <View style={{
            width, height, justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'rgba(254,92,108,0.9)'
        }}>
            <View style={{paddingTop: 294 * k, paddingRight: 80 * k, paddingLeft: 80 * k, paddingBottom: 274 * k}}>
                <Text style={{fontFamily: 'Roboto-Medium', textAlign: 'center', color: 'white', fontSize: 22 * k}}>Awesome!{'\n\n'}
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20 * k}}>You just shared this bot{'\n'}
                        with {this.props.text}</Text>
                </Text>
            </View>
        </View>
    }
}
