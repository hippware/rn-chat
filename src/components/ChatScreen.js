import React, {Component} from "react";
import {View, Dimensions, TouchableOpacity, TextInput, Image, StyleSheet} from "react-native";
import Screen from './Screen';
import Avatar from './Avatar';
import Chat from '../model/Chat';
import Message from '../model/Message';
import GiftedMessenger from 'react-native-gifted-messenger';
import Button from 'react-native-button';
import assert from 'assert';
import showImagePicker from './ImagePicker';
import MessageStore from '../store/message';
import autobind from 'autobind-decorator'
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import ChatBubble from './ChatBubble';
import GiftedSpinner from 'react-native-gifted-spinner';
import location from '../store/location';
import message from '../store/message';

// must be less than ~50px due to ScrollView bug (event only fires once)
// https://github.com/facebook/react-native/pull/452
// TODO: expose as a prop when onScroll works properly
var PULLDOWN_DISTANCE = 40 // pixels

@autobind
class AttachButton extends Component {
  onAttach() {
    const chat:Chat = this.props.item || console.error("No Chat is defined");
    showImagePicker('Select Image', (source, response) => {
      message.sendMedia({
        file: source,
        width: response.width,
        height: response.height,
        size: response.fileSize,
        to: chat.id
      })
    });
  }
  
  render(){
    return <Button onPress={this.onAttach}>
      <Image source={require('../../images/iconAttach.png')}/>
    </Button>
  }
}

@autobind
export default class ChatScreen extends Component {

  static renderTitle({item}){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingTop:10, flexDirection:'row'}}>
      {item.participants.map((profile,ind)=>
        <TouchableOpacity key={ind+profile.user+'touch'}
                          onPress={()=>Actions.profileDetail({item: profile, title: profile.displayName})}>
          <Avatar size={40} key={ind+profile.user+'avatart'} source={profile.avatar && profile.avatar.source}
                title={profile.displayName} isDay={location.isDay} />
        </TouchableOpacity>
      )}
    </View>;
  }
  
  renderTextInput(props) {
    if (props.hideTextInput === false) {
      return (
        <View style={[styles.textInputContainer, location.isDay ? styles.textInputContainerDay : styles.textInputContainerNight]}>
          {props.leftControlBar}
          <TextInput
            style={[styles.textInput, location.isDay ? styles.textInputDay : styles.textInputNight]}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={props.onChangeText}
            value={props.text}
            autoFocus={props.autoFocus}
            returnKeyType={props.submitOnReturn ? 'send' : 'default'}
            onSubmitEditing={props.submitOnReturn ? props.onSend : () => {}}
            enablesReturnKeyAutomatically={true}
            
            blurOnSubmit={props.blurOnSubmit}
          />
          <Button
            style={styles.sendButton}
            styleDisabled={styles.sendButtonDisabled}
            onPress={props.onSend}
            disabled={props.disabled}
          >
            <Image source={props.disabled ?
              require('../../images/iconSendInactive.png') : require('../../images/iconSendActive.png')}/>
          </Button>
        </View>
      );
    }
    return null;
  }
  
  constructor(props){
    super(props);
    this.state = {isLoadingEarlierMessages : false};
  }
  onChangeText(){
    //this.props.dispatch(actions.sendComposing(this.props.item.id));
  }
  onErrorButtonPress(){
    
  }
  onImagePress(){
    
  }
  async onLoadEarlierMessages(){
    this.setState({isLoadingEarlierMessages: true});
    await message.loadEarlierMessages(this.props.item.id);
    this.setState({isLoadingEarlierMessages: false});
  }

  handleScroll(e) {
    if (e.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.onLoadEarlierMessages()
    }
  }

  renderHeader() {
    if (this.state.isLoadingEarlierMessages) {
      return (
        <View style={{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <GiftedSpinner />
        </View>
      )
    } else {
      return null
    }
  }

  render(){
    const chat: Chat = this.props.item;
    assert(chat, "chat item is not defined");
    this.list = chat.messages.map((el: Message)=>({
      uniqueId: el.id,
      text: el.body || '',
      isDay: location.isDay,
      title: el.from.displayName,
      media: el.media,
      size: 40,
      position: el.from.isOwn ? 'right' : 'left',
      status: '',
      name: el.from.isOwn ? '' : el.from.displayName,
      image: el.from.isOwn || !el.from.avatar || !el.from.avatar.source ? null : el.from.avatar.source,
      imageView: Avatar,
      view: ChatBubble,
      date: new Date(el.time),
      
    }));


    return <Screen isDay={location.isDay}>
      <GiftedMessenger {...this.props}
        leftControlBar={<AttachButton {...this.props}/>}
        renderTextInput={this.renderTextInput}
        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
        onLoadEarlierMessages={this.onLoadEarlierMessages}
        styles={styles}
        autoFocus={true}
        submitOnReturn={true}
        messages={this.list}
        handleSend={({text})=>message.sendMessage({to:this.props.item.id, body:text})}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        onImagePress={this.onImagePress}
        displayNames={false}
        parseText={false} // enable handlePhonePress, handleUrlPress and handleEmailPress
        typingMessage={this.state.typingMessage}
        maxHeight={Dimensions.get('window').height - 70}
        onScroll={this.handleScroll}
        renderHeader={this.renderHeader}
      />
    </Screen>;
  }
}



const styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listView: {
    flex: 1,
  },
  textInputContainerDay: {
    backgroundColor: 'white',
  },
  textInputContainerNight: {
    backgroundColor: 'rgba(63,50,77,0.9)',
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  textInput: {
    alignSelf: 'center',
    height: 20,
    width: 100,
    fontFamily:'Roboto-Regular',
    flex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 20,
    fontSize: 15,
  },
  textInputDay: {
    color: 'rgb(63,50,77)',
  },
  textInputNight: {
    color: 'white',
  },
  sendButton: {
  },
  date: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  linkLeft: {
    color: '#000',
  },
  linkRight: {
    color: '#fff',
  },
  loadEarlierMessages: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadEarlierMessagesButton: {
    fontSize: 14,
  },
  
};