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

const ImagePicker = NativeModules.ImagePickerManager;
const options = {
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 1200, // photos only
  maxHeight: 1200, // photos only
  //aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  //aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  //quality: 0.2, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

@autobind
@observer
export default class BotPhoto extends React.Component {
  @observable bot: Bot;
  
  componentWillMount(){
    this.bot = bot.bot ? new Bot({...bot.bot}) : botFactory.createImage();
  }
  
  getSource(response) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    // You can display the image using either data:
    console.log("SIZE:", response.fileSize);
    const fileName = response.uri.replace('file://', '');
    const source = {
      uri: fileName,
      type: fileName.indexOf(".png") === -1 ? "image/jpeg" : "image/png",
      name: fileName.substring(fileName.lastIndexOf("/") + 1),
      isStatic: true
    };
    return source;
  
  }
  
  launchPicker(isLibrary){
    // Open Image Library:
    return new Promise((resolve, reject)=>{
      const func = isLibrary ? ImagePicker.launchImageLibrary : ImagePicker.launchCamera;
      func(options,
        response => {
          if (response.error){
            reject(response.error);
          } else {
            resolve(response);
          }
        });
    });
  }
  
  async onTap(isLibrary){
    try {
      const response = await this.launchPicker(isLibrary);
      const source = this.getSource(response);
      console.log("SSOURCE:", source);
      if (source) {
        console.log("SRESPONSE:", response, source);
        fileStore.requestUpload({file:source, size:response.fileSize, width:response.width, height:response.height, access:'all'}).then(url=>{
          this.bot.image = new File(url);
        });
        // const url = await fileStore.requestUpload({file:source, size:response.fileSize, width:response.width, height:response.height, access:'all'});
        // this.bot.image = new File(url);
        this.props.onSave(this.bot);
      }
    } catch (e){
      alert(e);
    }
  }
  
  
  render(){
    const isDay = location.isDay;
    return <Screen isDay={isDay}>
      <View style={{flex:1}}>
        <View style={{padding:51*k, paddingTop:166*k,paddingBottom:40*k}}>
          <Text style={{fontFamily:'Roboto-Regular',fontSize:30,backgroundColor:'transparent',color:isDay ? 'rgb(63,50,77)' : 'white',textAlign:'center'}}>Bots look prettier with photos</Text>
        </View>
        <View style={{padding:82*k, paddingTop:0}}>
          <Text style={{fontFamily:'Roboto-Light',fontSize:18,backgroundColor:'transparent',color:isDay ? 'rgb(63,50,77)' : 'white',textAlign:'center'}}>
            You can take a new photo or add a photo from an existing album
          </Text>
        </View>
        <TouchableOpacity onPress={()=>this.onTap(false)} style={{justifyContent:'center', alignItems:'center',position:'absolute', bottom:110*k, height:50*k,right:30*k,left:30*k,borderRadius:2, backgroundColor:'rgb(254,92,108)'}}>
          <Text style={{letterSpacing:0.7,color:'white',fontSize:15,fontFamily:'Roboto-Regular'}}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTap(true)}  style={{justifyContent:'center', alignItems:'center',position:'absolute', bottom:43*k, height:50*k,right:30*k,left:30*k,borderRadius:2, backgroundColor:'white',borderColor:'rgb(233,233,233)'}}>
          <Text style={{letterSpacing:0.7,color:'rgb(253,95,108)',fontSize:15,fontFamily:'Roboto-Regular'}}>Choose from Existing</Text>
        </TouchableOpacity>
      </View>
      <NavTitle isDay={isDay}>{this.props.title  || 'Photo'}</NavTitle>
      <SaveButton title="Skip" onSave={()=>this.props.onSave(this.bot)}/>
    </Screen>;
    
  }
}