import React, {TouchableOpacity, PropTypes, Component, Image} from 'react-native';

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
                                 onPress={()=>this.context.drawer.toggle()}
                                 style={{width:60,justifyContent:'center',alignItems:'center'}}>
            <Image source={this.props.isDay ? require('../../images/iconMenu.png') : require('../../images/iconMenuNight.png')}/>
        </TouchableOpacity>
    }
}