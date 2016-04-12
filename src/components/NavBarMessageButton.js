import React, {TouchableOpacity, PropTypes, Component, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class extends Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    static propTypes = {
        isDay: PropTypes.bool.isRequired,
        kind: PropTypes.string.isRequired
    };

    render(){
        return <TouchableOpacity key={this.props.kind} accessibilityLabel={this.props.kind+"NavButton"}
                                 onPress={Actions.messaging}
                                 style={{width:60,justifyContent:'center',alignItems:'center'}}>
            <Image source={this.props.isDay ? require('../../images/iconMessage.png') : require('../../images/iconMessageNight.png')}/>
        </TouchableOpacity>
    }
}