import React from 'react';
import {View, TouchableWithoutFeedback, Text, ScrollView, Animated, Alert, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-native';
import Screen from './Screen';
import botFactory from '../factory/bot';
import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import GradientHeader from './GradientHeader';
import {k, width, height} from './Global';
import BotAvatar from './BotAvatar';
import Avatar from './Avatar';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import botStore from '../store/bot';
import location from '../store/location';
import Bot, {VISIBILITY_PUBLIC, VISIBILITY_OWNER, LOCATION, NOTE, IMAGE} from '../model/Bot';
import ActionButton from './ActionButton';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import PhotoGrid from './PhotoGrid';
import model from '../model/model';
import BotNavBar from './BotNavBar';
import Button from 'apsl-react-native-button';

const DOUBLE_PRESS_DELAY = 300;

function Header(props){
  return <View style={{backgroundColor:'rgba(255,255,255,0.85)',flexDirection:'row',height:41*k,shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12, }}>
    <View style={{flex:1,justifyContent:'center'}}>
      <Text numberOfLines={1} style={{paddingLeft:26*k,fontSize:14*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Regular'}}>{props.children}</Text>
    </View>
  </View>
}

@autobind
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(this.props.fullMap ? height : 0),
      fullMap: !!this.props.fullMap,
      fadeAnim: new Animated.Value(1),
      showNavBar: true,
      navBarHeight: new Animated.Value(70),
    };
  }
  
  onScrollEnd(event){
    if (!this.state.showNavBar){
      console.log("SCROLL END!");
      this.setState({showNavBar: true})
      Animated.timing(
        this.state.navBarHeight,
        {toValue: 70}
      ).start();
    }
  }
  
  onScroll(event) {
    if (this.state.showNavBar){
      this.setState({showNavBar: false})
      Animated.timing(
        this.state.navBarHeight,
        {toValue: 0}
      ).start();
    }
    // switch nav bar is scroll position is below threshold
    // const y = event.nativeEvent.contentOffset.y;
    // const limit = 50 * k;
    // const upper = 240*k;
    // if (y > limit) {
    //   Animated.timing(          // Uses easing functions
    //     this.state.fadeAnim,    // The value to drive
    //     {toValue: Math.max(0, 1 - y/upper)}            // Configuration
    //   ).start();
    //   if (!this.state.showNavBar) {
    //     this.setState({showNavBar: true});
    //   }
    // } else {
    //   Animated.timing(          // Uses easing functions
    //     this.state.fadeAnim,    // The value to drive
    //     {toValue: Math.min(1, 1 - y/upper)}            // Configuration
    //   ).start();
    //   if (this.state.showNavBar) {
    //     this.setState({showNavBar: false});
    //   }
    // }
  }
  
  componentWillMount(){
    if (!this.props.item){
      botStore.bot = botFactory.create({id: '789daa44-e9a6-11e6-b22b-0e2ac49618c7', server:'staging.dev.tinyrobot.com'});
    }
    if (!this.props.item && !botStore.bot){
      console.error("Bot ID is not defined");
    }
    if (this.props.item){
      botStore.bot = botFactory.create({id: this.props.item});
      botStore.load();
    }
  }
  
  hideFullMap(){
    this.setState({fullMap: true});
    Animated.timing(
      this.state.top,
      {toValue: 0}
    ).start();
    Actions.refresh({});
  }
  
  showFullMap(){
    this.setState({fullMap: true});
    Animated.timing(
      this.state.top,
      {toValue: height}
    ).start();
    Actions.refresh({leftButton:{icon:require('../../images/iconClose.png'), onPress:this.hideFullMap}});
  }
  
  onLayout(event) {
    var layout = event.nativeEvent.layout
    this.setState({currentScreenWidth: layout.width, currentScreenHeight: layout.height })
  }
  
  unsubscribe(){
    Alert.alert(null, 'Are you sure you want to unsubscribe?',[
      {text:'Cancel', style:'cancel'},
      {text:'Unsubscribe', style:'destructive', onPress:()=>botStore.unsubscribe()}
    ]);
  }
  
  subscribe(){
    botStore.subscribe();
  }
  
// ...
  
  /**
   * Double Press recognition
   * @param  {Event} e
   */
  handleImagePress(e) {
    const now = new Date().getTime();
    
    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.handleImageDoublePress(e);
    }
    else {
      this.lastImagePress = now;
    }
  }
  
  handleImageDoublePress(e) {
    const bot = botStore.bot;
    return bot.isSubscribed ? this.unsubscribe() : this.subscribe()
  }
  
  render(){
    const bot = botStore.bot;
    if (!bot){
      console.log("No bot defined", this.props.item);
      return <Screen/>
    }
    const isDay = location.isDay;
    const isOwn = !bot.owner || bot.owner.isOwn;
    const coef = bot.image && bot.image.width ? (width-34*k)/bot.image.width : 0;
    const profile = bot.owner;
    if (!profile || !bot.location){
      return <Screen/>
    }
    const source = bot.image && bot.image.source;
    return <View style={{flex:1,backgroundColor:location.isDay ? 'white' : 'rgba(49,37,62,0.90)'}}>
      <ScrollView style={{paddingTop:70*k}} onMomentumScrollEnd={this.onScrollEnd} onScrollEndDrag={this.onScrollEnd} onScrollBeginDrag={this.onScroll} scrollEventThrottle={1}>
        <View style={{width: 375*k, height:275*k}}>
          <TouchableWithoutFeedback onPress={this.handleImagePress}>
            <Image style={{width: 375*k, height:275*k}} source={source || require('../../images/defaultCover.png')}/>
          </TouchableWithoutFeedback>
          {isOwn && <TouchableOpacity onPress={()=>statem.logged.botEdit({item: bot.id})}
                            style={{borderRadius:2, backgroundColor:'rgba(255,255,255,0.75)', position:'absolute',
                            justifyContent:'center',alignItems:'center',bottom:20*k, right:20*k, height:30*k, width:36*k}}>
            <Image source={require('../../images/iconEditBot.png')}/>
          </TouchableOpacity>}
        </View>
        <View style={{paddingTop:15*k, paddingLeft:20*k, paddingRight:20*k}}>
          {!isOwn && !bot.isSubscribed && <Button onPress={this.subscribe} style={{height:40*k, borderWidth:0, backgroundColor:'rgb(254,92,108)', borderRadius:2*k}}
                                        textStyle={{fontSize:11*k, letterSpacing:0.5, fontFamily:'Roboto-Medium',color:'white'}}>
            ADD BOT
          </Button>}
          {!isOwn && !!bot.isSubscribed && <TouchableOpacity onPress={this.unsubscribe} style={{height:40*k, flexDirection:'row',justifyContent:'center', alignItems:'center', borderWidth:0, backgroundColor:'rgb(228,228,228)', borderRadius:2*k}}>
            <View style={{padding:10*k}}><Image source={require('../../images/iconCheckBotAdded.png')}/></View>
            <Text style={{fontSize:11*k, letterSpacing:0.5, fontFamily:'Roboto-Medium',color:'rgb(99,62,90)'}}>BOT ADDED</Text>
          </TouchableOpacity>}
        </View>
        <View style={{paddingTop:15*k, backgroundColor:location.isDay ? 'white' : 'rgba(49,37,62,0.90)'}}>
          {!!bot.description && <Header>Note</Header>}
          {!!bot.description && <View style={{padding:15*k}}>
            <View  style={{backgroundColor:'rgba(255,255,255,0.85)',
        borderRadius:2, shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,paddingTop:15*k, paddingRight:20*k, paddingLeft:20*k, paddingBottom:20*k}}>
              <Text numberOfLines={0} style={{fontFamily:'Roboto-Light', fontSize:15, color:'rgb(63,50,77)'}}>{bot.description}</Text>
              <View style={{paddingTop:15*k, flexDirection:'row'}}>
                <View><Avatar size={40} profile={profile} source={profile.avatar && profile.avatar.source}
                              title={profile.displayName} isDay={location.isDay} /></View>
                <View style={{paddingLeft:10*k, flex:1}}>
                  <Text style={{fontFamily:'Roboto-Regular', fontSize:13,color:'rgb(63,50,77)'}}>Last edited by {profile.displayName}</Text>
                  <Text style={{fontFamily:'Roboto-Regular', fontSize:12,color:'rgb(155,155,155)'}}>{bot.date}</Text>
                </View>
              </View>
            </View>
          </View>
          }
          {(isOwn || !!bot.images.length) && <Header>Photo</Header>}
          {(isOwn || !!bot.images.length) && <View style={{padding:15*k}}>
            <View  style={{backgroundColor:'transparent'}}>
              <PhotoGrid isOwn={bot.owner.isOwn} images={bot.images} onAdd={()=>statem.handle("addPhoto")}
                         onView={index=>statem.handle("editPhotos", {index})}/>
            </View></View>}
        </View>
      </ScrollView>
      {!this.state.fullMap && <ActionButton/>}
      {this.state.showNavBar && <BotNavBar bot={bot}/>}
    </View>
  }
}