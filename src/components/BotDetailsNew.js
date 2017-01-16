import React from 'react';
import {View, Text, ScrollView, Animated, Alert, TouchableOpacity, Image} from 'react-native';
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
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import ActionButton from './ActionButton';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import NavBar from './NavBar';
import PhotoGrid from './PhotoGrid';
import model from '../model/model';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import BotCardInner from './BotCardInner';
function Header(props){
  return <View style={{backgroundColor:'rgba(255,255,255,0.85)',flexDirection:'row',height:41*k,shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12, }}>
    <View style={{flex:1,justifyContent:'center'}}>
      <Text numberOfLines={1} style={{paddingLeft:26*k,fontSize:14*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Regular'}}>{props.children}</Text>
    </View>
  </View>
}

class BotHeader extends React.Component {
  render(){
    const bot = botStore.bot;
    if (!bot){
      console.log("No bot defined", this.props.item);
      return <Screen/>
    }
    const isDay = location.isDay;
    const coef = bot.image && bot.image.width ? (width-34*k)/bot.image.width : 0;
    const profile = bot.owner;
    if (!profile || !bot.location){
      return <Screen/>
    }
    const source = bot.image && bot.image.source;
    return <View style={{paddingRight:15*k,paddingLeft:15*k}}>
      <View style={{backgroundColor:'rgba(255,255,255,0.85)',height:240*k,borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={this.showFullMap} style={{flex:1, justifyContent:'center', paddingLeft:20*k}}><Text style={{fontFamily:'Roboto-Medium',fontSize:11,color:'rgb(117,117,117)'}}>View Map</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>statem.handle("options", {item: bot.id})} style={{justifyContent:'center',alignItems:'center',height:50*k, width:50*k}}>
            <Image source={require('../../images/iconBotOptions.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',flex:1}}>
          <Text numberOfLines={3} style={{paddingLeft:10*k,paddingRight:10*k,textAlign:'center',fontSize:20*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Medium'}}>{bot.title}</Text>
          <Text numberOfLines={1} style={{fontSize:15*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Light'}}>{bot.address}</Text>
          <View style={{alignItems:'center', position:'absolute', right:0, left:0, bottom:65*k}}>
            {(!bot.owner || bot.owner.isOwn ) && <Text numberOfLines={1}
                                                       style={{paddingLeft:13*k,paddingRight:13*k,fontSize:12*k, color:'rgb(155,155,155)',fontFamily:'Roboto-Italic'}}>
              You created this bot
            </Text>}
            {bot.owner && !bot.owner.isOwn && !bot.isSubscribed && <TouchableOpacity
              onPress={botStore.subscribe}
              style={{width:114*k, height:31*k, borderRadius:2, backgroundColor:'rgb(99,62,90)', alignItems:'center', flexDirection:'row',justifyContent:'center'}}>
              <View style={{paddingRight:5}}><Image source={require('../../images/subscribePlus.png')}/></View>
              <Text style={{fontFamily:'Roboto-Medium',letterSpacing:0.5, fontSize:11, color:'white'}}>SUBSCRIBE</Text>
            </TouchableOpacity>}
            {bot.owner && !bot.owner.isOwn && bot.isSubscribed && <TouchableOpacity
              onPress={()=>Alert.alert(null, 'Are you sure you want to unsubscribe?',[
              {text:'Cancel', style:'cancel'},
              {text:'Unsubscribe', style:'destructive', onPress:()=>botStore.unsubscribe()}
            ])}
              style={{width:114*k, height:31*k, borderRadius:2, backgroundColor:'rgb(228,228,228)', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontFamily:'Roboto-Medium',letterSpacing:0.5, fontSize:11, color:'rgb(99,62,90)'}}>SUBSCRIBED</Text>
            </TouchableOpacity>}
          </View>
        </View>
        <View style={{position:'absolute',bottom:0*k,height:47*k,right:0,left:0}}>
          <View style={{backgroundColor:'rgba(155,155,155,0.29)', height:1*k}}/>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{justifyContent:'center'}}><Image source={require('../../images/iconMembers.png')}/></View>
                <View style={{padding:5*k, paddingTop:10*k}}><Text style={{fontSize:12,color:'rgb(63,50,77)',fontFamily:'Roboto-Regular'}}>{bot.followersSize}</Text></View>
              </View>
            </View>
            <View style={{backgroundColor:'rgba(155,155,155,0.29)',width:1*k}}></View>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{justifyContent:'center'}}><Image source={require('../../images/iconImg.png')}/></View>
                <View style={{padding:5*k, paddingTop:10*k}}><Text style={{fontSize:12,color:'rgb(63,50,77)',fontFamily:'Roboto-Regular'}}>{bot.imagesCount}</Text></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  }
}

@autobind
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(this.props.fullMap ? height : 0),
      fullMap: !!this.props.fullMap,
    };
  }
  
  componentWillMount(){
    if (!this.props.item){
      botStore.bot = botFactory.create({id: '464c001e-b561-11e6-9ca1-0e600a8611a9', server:'staging.dev.tinyrobot.com'});
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
  
  render(){
    const bot = botStore.bot;
    if (!bot){
      console.log("No bot defined", this.props.item);
      return <Screen/>
    }
    const isDay = location.isDay;
    const coef = bot.image && bot.image.width ? (width-34*k)/bot.image.width : 0;
    const profile = bot.owner;
    if (!profile || !bot.location){
      return <Screen/>
    }
    const source = bot.image && bot.image.source;
    return <Screen>
      <Map followUser={false} fullMap={true} bot={bot} location={bot.location} selectedBot={bot.id}/>
      <Animated.View style={{flex:1, transform: [{translateY:this.state.top}]}}>
        <ParallaxScrollView scrollEventThrottle={1}
                            stickyHeaderHeight={ 70 }
                            parallaxHeaderHeight={ 300 }
                            backgroundSpeed={10}
                            backgroundColor="transparent"
                            renderForeground={()=>(
          <BotHeader/>
            )}
        
                            renderStickyHeader={() => (
              <BotCardInner item={bot}/>
            )}
        >
          <TouchableOpacity onPress={this.showFullMap} style={{height:105*k}}/>
          <View style={{paddingTop:15*k, backgroundColor:location.isDay ? 'rgba(241,242,244,0.85)' : 'rgba(49,37,62,0.90)'}}>
            {bot.type === LOCATION && <Header>Location</Header>}
            {bot.type === LOCATION && <TouchableOpacity onPress={this.showFullMap} style={{flex:1,padding:15*k,height:220*k}}>
              <View  style={{backgroundColor:'rgba(255,255,255,0.85)',flex:1,
        borderColor: 'white', borderWidth:2, shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,}}>
                {bot.location && <Map followUser={false} fullMap={true} location={bot.location} selectedBot={bot.id} bot={bot} />
                }
                <View style={{top:0*k,right:0*k,left:0*k,bottom:0*k, position:'absolute'}}/>
              
              </View>
            
            </TouchableOpacity>}
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
            {!!bot.image && <Header>Photo</Header>}
            {!!bot.image && <View style={{padding:15*k}}>
              <View  style={{backgroundColor:'transparent'}}>
                <PhotoGrid isOwn={bot.owner.isOwn} images={bot.images} onAdd={statem.botDetails.addPhoto}
                           onView={index=>statem.botDetails.editPhotos({index})}/>
              </View></View>}
          </View>
          
          <Animated.View pointerEvents="box-none" style={{opacity: this.state.fadeAnim, top:76*k,right:15*k,left:15*k,justifyContent:'center', alignItems:'center',position:'absolute'}}>
            <BotAvatar size={64*k} bot={bot} tappable={false}/>
          </Animated.View>
        
        </ParallaxScrollView>
      </Animated.View>
      {!this.state.fullMap && <GradientHeader/>}
      {!this.state.fullMap && <ActionButton/>}
    </Screen>
  }
}