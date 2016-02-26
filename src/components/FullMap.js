import React, {Component, Animated, TextInput, Text, View, Image} from 'react-native';
import Map from './Map';
import NavBarTransparent from './NavBarTransparent';
import FadeView from './FadeView';

export default class extends Component {
    static renderNavigationBar(props){
        return <NavBarTransparent {...props}
            renderTitle={()=>
                <View toValue={0.9} style={{flex:1, opacity:0.9, flexDirection:'row', position:'absolute', top:5, bottom:5, left:0, right:0, backgroundColor:'white', borderRadius:2,
                shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12}}>
                    <View style={{width:50, justifyContent:'center', alignItems:'center'}}><Image source={require('../../images/iconMapLayers.png')}></Image></View>
                    <View style={{flex:1}}><TextInput style={{height:40, fontFamily:'Roboto-Regular',color:'rgb(155,155,155)', fontSize:15, letterSpacing:0.6}} placeholder="Search the Map"/></View>
                </View>}/>;
    }

    render(){
        return <View style={{flex:1, backgroundColor:'white'}}><Map full={true}/></View>
    }
}