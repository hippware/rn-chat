import React from "react";
import {View, Slider, Image, Alert, StyleSheet, NativeModules, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
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
import {k, width, height} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';
import location from '../store/location';
import fileStore from '../store/file';
import File from '../model/File';
import Swiper from 'react-native-swiper'
import NavBar from './NavBar';
import NavBarRightButton from './NavBarRightButton';
import NavBarLeftButton from './NavBarLeftButton';
import {Actions} from 'react-native-router-native';

const styles = {
  wrapper: {
  },
  
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  
  image: {
    width,
    flex: 1
  }
}

@observer
class TopBar extends React.Component {
  render(){
    if (!this.props.displayed){
      return null;
    }
    return <NavBar style={{position:'absolute', top:0, height:70}}>
      <Text style={{top:5, color:location.isDay ? 'rgb(63,50,77)':'white', fontFamily:'Roboto-Regular',fontSize:18}}>{this.props.children}</Text>
      <NavBarRightButton onPress={()=>statem.botPhotoList.addPhoto({bot: bot.bot})}><Image source={require('../../images/attachPhotoPlus.png')}/></NavBarRightButton>
    </NavBar>
      // <NavBarLeftButton onPress={Actions.pop}><Image source={require('../../images/iconBackGray.png')}/></NavBarLeftButton>
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View pointerEvents="box-none" style={{position:'absolute',top:0,right:0,left:0,bottom:0}}>
      <TopBar>{index+1}/{total}</TopBar>
      <BottomBar isOwn={true} currentIndex={index}/>
    </View>
  )
}

TopBar.defaultProps = {
  displayed: true
}

@autobind
@observer
class BottomBar extends React.Component {
  async removeImage(){
    try {
      await bot.bot.removeImageWithIndex(this.props.currentIndex);
    } catch (e){
      alert(e);
    }
  }
  render(){
    if (!this.props.displayed){
      return null;
    }
    return <View style={{position:'absolute',bottom:0,right:0,left:0,height:90,
    backgroundColor:location.isDay ? 'rgb(243,244,246)':'rgb(63,50,77)', alignItems:'center', justifyContent:'center'}}>
        {!!this.props.isOwn && <TouchableOpacity onPress={()=>Alert.alert(null, 'Do you want to delete this image?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:this.removeImage}])}
                                                 style={{position:'absolute', top:20, bottom:20,left:5,right:5, borderRadius:2, backgroundColor:'white',alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:'Roboto-Regular',color:'red'}}>Delete Photo</Text>
        </TouchableOpacity>}
      {!this.props.isOwn && <Text style={{fontFamily:'Roboto-Regular',
      color:location.isDay ? 'rgb(63,50,77)':'white',
      }}>Uploaded by @{this.props.media.owner.handle}</Text>}
    </View>
  }
}
BottomBar.defaultProps = {
  displayed: true
}



@autobind
@observer
export default class BotPhotoList extends React.Component {
  constructor(props){
    super(props);
    if (!bot.bot){
      bot.createImage();
      bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '1');
      bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '2');
    }
  }
  render(){
    if (!bot.bot){
      return <Screen/>
    }
    console.log("BotPhotoList render", this.props.index);
    return <Screen>
      <Swiper style={styles.wrapper} height={height}
              renderPagination={renderPagination}
              index={this.props.index}
              loop={false}>
        {bot.bot.images.map(image=><View key={image.item} style={styles.slide}>
              <Image style={styles.image} source={image.source} />
            </View>)}
      </Swiper>
    </Screen>
  }
}
