import React, {Navigator, Image, View, PropTypes,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';

class NavBar extends Navigator.NavigationBar {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        const isDay = this.props.location.isDay;
//        const isDay = this.props.chameleon? this.props.location.isDay : true;
        return <NavigationBar
            {...this.props}
            navBarHeader={this.props.navBarHeader || (this.props.navBarHeaderDay && this.props.navBarHeaderNight && (isDay ? this.props.navBarHeaderDay : this.props.navBarHeaderNight))}
            style={ [{backgroundColor:'transparent'}, this.props.navigationBarStyle, (isDay? this.props.navigationBarStyleDay : this.props.navigationBarStyleNight)]}
            renderBackButton={()=>
                                <TouchableOpacity key="back"  onPress={()=>Actions.pop()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconBackGray.png')}/>
                                </TouchableOpacity>}
            renderLeftButton={()=>
                                <TouchableOpacity key="left"  onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={isDay ? require('../../images/iconMenu.png') : require('../../images/iconMenuNight.png')}/>
                                </TouchableOpacity>}
            textStyle={{fontFamily:'Roboto-Regular',color:'rgb(63,50,77)',fontSize:18}}
            renderRightButton={()=>
                                <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={isDay ? require('../../images/iconMessage.png') : require('../../images/iconMessageNight.png')}/>
                                </TouchableOpacity>}/>
    }

}



export default connect(state=>state)(NavBar)