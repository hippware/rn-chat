import React, {View} from 'react-native';
import BackgroundVideo from './BackgroundVideo';

export default class extends React.Component {
    render(){
        return (
            <View style={{flex:1, alignItems: 'center', backgroundColor:'transparent'}}>
                <BackgroundVideo/>
                {this.props.children}
            </View>
        );
    }
}

