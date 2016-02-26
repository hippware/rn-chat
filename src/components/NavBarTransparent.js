import React, {Image, View, TouchableOpacity, PropTypes} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar';
import {Actions} from 'react-native-router-flux';
import FadeView from './FadeView';

class NavBarGradientDay extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                               style={{height:100}} pointerEvents="none"/>
    }
}
export default class extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        return <NavigationBar
            {...this.props}
            style={{backgroundColor:'transparent'}}
            header={<NavBarGradientDay/>}
            renderBackButton={()=>
                                <View style={{width:60,justifyContent:'center',alignItems:'center'}}><TouchableOpacity key="back" onPress={()=>Actions.pop()} >
                                    <Image source={require('../../images/iconBackGray.png')}/>
                                </TouchableOpacity></View>}
            renderLeftButton={()=>
                                <TouchableOpacity key="left"  onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMenu.png')}/>
                                </TouchableOpacity>}
            renderRightButton={()=>
                                <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMessage.png')}/>
                                </TouchableOpacity>}
        />;
    }

}


