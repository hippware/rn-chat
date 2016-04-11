import React, {Image, View, PropTypes,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import {navBarTextColorNight, navBarTextColorDay, navBarBackgroundColorDay, navBarBackgroundColorNight} from '../globals';

class NavBar extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        const isDay = this.props.isDay;
//        const isDay = this.props.chameleon? this.props.location.isDay : true;
        return <NavigationBar
            {...this.props}
            navBarHeader={this.props.navBarHeader || (this.props.navBarHeaderDay && this.props.navBarHeaderNight && (isDay ? this.props.navBarHeaderDay : this.props.navBarHeaderNight))}
            style={ [{backgroundColor:isDay ? navBarBackgroundColorDay : navBarBackgroundColorNight}, this.props.navigationBarStyle, (isDay? this.props.navigationBarStyleDay : this.props.navigationBarStyleNight)]}
            renderBackButton={()=>
                                <TouchableOpacity key="back" accessibilityLabel="backNavButton" onPress={()=>Actions.pop()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconBackGray.png')}/>
                                </TouchableOpacity>}
            renderLeftButton={()=>
                                <TouchableOpacity key="left" accessibilityLabel="leftNavButton"   onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={isDay ? require('../../images/iconMenu.png') : require('../../images/iconMenuNight.png')}/>
                                </TouchableOpacity>}
            textStyle={{fontFamily:'Roboto-Regular',color:isDay ? navBarTextColorDay : navBarTextColorNight, fontSize:18}}
            renderRightButton={()=>
                                <TouchableOpacity key="right" accessibilityLabel="rightNavButton" onPress={Actions.messaging} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={isDay ? require('../../images/iconMessage.png') : require('../../images/iconMessageNight.png')}/>
                                </TouchableOpacity>}/>
    }

}



export default connect(state=>({isDay:state.location.isDay}))(NavBar)