import React, {Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {isDay} from '../globals';
import NavigationBar from './NavigationBar';

class NavBarGradientDay extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                               style={{height:100}} pointerEvents="none"/>
    }
}
class NavBarGradientNight extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(47,35,59,0)','rgba(47,35,59,1)']}
                               style={{height:100}}/>
    }
}
export default class TopButtons extends React.Component {
    render() {
        const renderTitle = this.props.renderTitle;

        return <NavigationBar
            style={renderTitle ? {backgroundColor:'rgba(255,255,255,0.83)'} : {backgroundColor:'transparent'}}
            header={!renderTitle && <NavBarGradientDay/>}
            footer={renderTitle && <View style={{height:1, backgroundColor:'white', shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12}}/>}
            renderTitle={renderTitle}
            renderLeftButton={()=>
                                <TouchableOpacity onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMenu.png')}/>
                                </TouchableOpacity>}
            renderRightButton={()=>
                                <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMessage.png')}/>
                                </TouchableOpacity>}
        />;
    }

}

TopButtons.contextTypes = {drawer: React.PropTypes.object};

