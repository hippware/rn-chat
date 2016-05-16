import React, {Component, PropTypes} from "react";
import {TouchableOpacity, Image} from "react-native";
import {connect} from 'react-redux';

class NavBarCloseButton extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired
    };

    render(){
        return <TouchableOpacity key="navBarCloseButton" testID="closeNavBtn" accessibilityLabel={this.props.kind+"NavButton"}
                                 onPress={this.props.onClose}
                                 style={[this.props.style, {width:60,justifyContent:'center',alignItems:'center'}]}>
            <Image source={this.props.isDay ? require('../../images/iconClose.png') : require('../../images/iconCloseNight.png')}/>
        </TouchableOpacity>
    }
}

export default connect(state=>({isDay:state.location.isDay}))(NavBarCloseButton)