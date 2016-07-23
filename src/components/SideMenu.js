import React from "react";
import {View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from '../globals';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-flux';
import model from '../model/model';
import statem from '../../gen/state';

class MenuImage extends React.Component {
  render(){
    return <Image source={this.props.image} resizeMode={Image.resizeMode.contain} style={{width:32*k, height:32*k}}/>
  }
}

class MenuItem extends React.Component {
  render(){
    return <TouchableOpacity onPress={()=>{Actions.get('logged').ref.close();InteractionManager.runAfterInteractions(()=>this.props.onPress && this.props.onPress())}} testID={this.props.testID}>
      <View style={[{height:60*k, flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1, borderRadius:1, borderColor:'rgba(63,50,77,1)', backgroundColor:'rgba(255,255,255,0.05)'},this.props.style]}>
        <View style={{width:80*k, alignItems:'center'}}>{this.props.icon || <MenuImage image={this.props.image}/>}</View>
        <View style={{flex:1}}>
          {this.props.children}
        </View>

      </View></TouchableOpacity>;
  }
}
MenuItem.contextTypes = {
  drawer: React.PropTypes.object
};

export default class SideMenu extends React.Component {
  render(){
    const profile = model.profile;
    if (!profile){
      return null;
    }
    let displayName = ' ';
    if (profile && profile.displayName){
      displayName = profile.displayName;
    }
    return <View style={{flex:1, backgroundColor:'rgba(63,50,77,1)'}}>
      <View style={{height:20}}/>
      <MenuItem testID="myAccountMenuItem"
                onPress={statem.drawerTabs.myAccountScene} style={{backgroundColor:'transparent'}}
                icon={<Avatar title={displayName}
                            size={40}
                            source={!!profile.avatar && profile.avatar.source} showFrame
                            style={{borderWidth:0}}/>
                            }>
        <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:15}}>{displayName}</Text>
        <Text style={{color:'rgba(255,255,255,0.57)',fontFamily:'Roboto-Regular',fontSize:12}}>View Account</Text>
      </MenuItem>
      <MenuItem onPress={statem.homeContainer.home} image={require("../../images/menuHome.png")}><Text style={styles.text}>HOME</Text></MenuItem>
      <MenuItem onPress={statem.homeContainer.fullMap} image={require("../../images/menuExplore.png")}><Text style={styles.text}>EXPLORE NEARBY</Text></MenuItem>
      <MenuItem onPress={statem.drawerTabs.friendsContainer} image={require("../../images/menuFriends.png")}><Text style={styles.text}>FRIENDS</Text></MenuItem>
      <MenuItem image={require("../../images/menuBots.png")}><Text style={styles.text}>BOTS</Text></MenuItem>
    </View>;
  }
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object
};


const styles = StyleSheet.create({
  text: {color:'white',fontFamily:'Roboto-Medium',fontSize:15,letterSpacing:0.5}
})
