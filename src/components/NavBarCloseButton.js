import React, {TouchableOpacity, PropTypes, Component, Image} from 'react-native';

export default class extends Component {
    static propTypes = {
        isDay: PropTypes.bool.isRequired,
        kind: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    };

    render(){
        return <TouchableOpacity key={this.props.kind} accessibilityLabel={this.props.kind+"NavButton"}
                                 onPress={this.props.onClose}
                                 style={{width:60,justifyContent:'center',alignItems:'center'}}>
            <Image source={this.props.isDay ? require('../../images/iconClose.png') : require('../../images/iconCloseNight.png')}/>
        </TouchableOpacity>
    }
}