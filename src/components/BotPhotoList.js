import React from "react";
import {View, Slider, Image, StyleSheet, NativeModules, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"
import assert from 'assert';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/bot';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';
import location from '../store/location';
import fileStore from '../store/file';
import File from '../model/File';
import PhotoBrowser from 'react-native-photo-browser';
import NavBar from './NavBar';
import NavBarRightButton from './NavBarRightButton';
import NavBarLeftButton from './NavBarLeftButton';
import {Actions} from 'react-native-router-native';

class TopBar extends React.Component {
  render(){
    if (!this.props.displayed){
      return null;
    }
    return <NavBar style={{position:'absolute', top:10, height:60}}>
      <Text style={{top:0, color:location.isDay ? 'rgb(63,50,77)':'white', fontFamily:'Roboto-Regular',fontSize:18}}>{(this.props.title || '').replace(' of ','/')}</Text>
      <NavBarRightButton onPress={()=>statem.botPhotoList.addPhoto({bot: bot.bot})}><Image source={require('../../images/attachPhotoPlus.png')}/></NavBarRightButton>
      <NavBarLeftButton onPress={Actions.pop}><Image source={require('../../images/iconBackGray.png')}/></NavBarLeftButton>
    </NavBar>
  }
}

@autobind
class BottomBar extends React.Component {
  async removeImage(itemId){
    try {
      await bot.bot.removeImage(this.props.media.item);
      Actions.refresh({removed: true});
    } catch (e){
      alert(e);
    }
  }
  render(){
    if (!this.props.displayed){
      return null;
    }
    console.log("BottomBar media:",JSON.stringify(this.props.media));
    return <View style={{position:'absolute',bottom:0,right:0,left:0,height:90,
    backgroundColor:location.isDay ? 'rgb(243,244,246)':'rgb(63,50,77)', alignItems:'center', justifyContent:'center'}}>
        {!!this.props.media.owner.isOwn && <TouchableOpacity onPress={()=>this.removeImage(this.props.media.item)}style={{position:'absolute', top:20, bottom:20,left:5,right:5, borderRadius:2, backgroundColor:'white',alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:'Roboto-Regular',color:'red'}}>Delete Photo</Text>
        </TouchableOpacity>}
      {!this.props.media.owner.isOwn && <Text style={{fontFamily:'Roboto-Regular',
      color:location.isDay ? 'rgb(63,50,77)':'white',
      }}>Uploaded by @{this.props.media.owner.handle}</Text>}
    </View>
  }
}


@autobind
@observer
export default class BotPhotoList extends React.Component {
  render(){
    if (!bot.bot){
      return <Screen/>
    }
    const images = bot.bot.images.map(file=>file.source && file.source.uri ?
      {item: file.item, owner:bot.bot.owner, updated: bot.bot.date, photo: file.source.uri} :
      {owner:bot.bot.owner, updated: bot.bot.date, photo: require('../../images/iconBotXs.png')});
    console.log("BotPhotoList.render", images.length, JSON.stringify(images));
    return <Screen><PhotoBrowser
      mediaList={images}
      displayNavArrows={false}
      displaySelectionButtons={false}
      displayActionButton={false}
      startOnGrid={false}
      displayTopBar={true}
      enableGrid={false}
      topBarComponent={TopBar}
      bottomBarComponent={BottomBar}

    />
    </Screen>
  }
}
