import React from 'react-native';
const {View, Text, Component, PropTypes, Image, StyleSheet, InteractionManager, TouchableOpacity} = React;
import { connect } from 'react-redux';
import {k} from '../globals';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-flux';

class MenuImage extends Component {
    render(){
        return <Image source={this.props.image} resizeMode={Image.resizeMode.contain} style={{width:32*k, height:32*k}}/>
    }
}

class MenuItem extends Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render(){
        const { drawer } = this.context;
        return <TouchableOpacity onPress={()=>{this.props.onPress && this.props.onPress();drawer.close()}} testID={this.props.testID}>
            <View style={[{height:60*k, flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1, borderRadius:1, borderColor:'rgba(63,50,77,1)', backgroundColor:'rgba(255,255,255,0.05)'},this.props.style]}>
                <View style={{width:80*k, alignItems:'center'}}>{this.props.icon || <MenuImage image={this.props.image}/>}</View>
                <View style={{flex:1}}>
                    {this.props.children}
                </View>

            </View></TouchableOpacity>;
    }
}
class SideMenu extends Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render(){
        return <View style={{flex:1, backgroundColor:'rgba(63,50,77,1)'}}>
            <View style={{height:20}}/>
            <MenuItem onPress={()=>Actions.myAccount()} testID="profileButton" style={{backgroundColor:'transparent'}}
                      icon={<Avatar frame={require("../../images/avatarFrame.png")} title={this.props.profile.firstName && this.props.profile.firstName[0]}
                            image={this.props.profile.photo}
                            style={{borderWidth:0}}/>
                            }>
                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:15}}>{this.props.profile.firstName} {this.props.profile.lastName}</Text>
                <Text style={{color:'rgba(255,255,255,0.57)',fontFamily:'Roboto-Regular',fontSize:12}}>View Account</Text>
            </MenuItem>
            <MenuItem onPress={()=>Actions.homeRouter()} image={require("../../images/menuHome.png")}><Text style={styles.text}>HOME</Text></MenuItem>
            <MenuItem onPress={()=>Actions.fullMap()} image={require("../../images/menuExplore.png")}><Text style={styles.text}>EXPLORE NEARBY</Text></MenuItem>
            <MenuItem image={require("../../images/menuFriends.png")}><Text style={styles.text}>FRIENDS</Text></MenuItem>
            <MenuItem image={require("../../images/mENUCHANNELS.png")}><Text style={styles.text}>CHANNELS</Text></MenuItem>
            <MenuItem image={require("../../images/menuBots.png")}><Text style={styles.text}>BOTS</Text></MenuItem>
        </View>;
    }
}

const styles = StyleSheet.create({
    text: {color:'white',fontFamily:'Roboto-Medium',fontSize:15,letterSpacing:0.5}
})
export default connect(state=>({profile:state.profile}))(SideMenu)
