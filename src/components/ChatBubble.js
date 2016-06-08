import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import File from '../model/File';
import ResizedImage from './ResizedImage';
import {k} from '../globals';
import ParsedText from 'react-native-parsed-text';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  bubble: {
    borderRadius: 2*k,
    paddingLeft: 14*k,
    paddingRight: 14*k,
    paddingBottom: 12*k,
    paddingTop: 5*k,
  },
  mediaBubble: {
    borderRadius: 2*k,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  text: {
    color: '#000',
  },
  textLeft: {
    color: 'rgb(63,50,77)',
    fontSize: 15,
    fontFamily: 'Roboto-Regular'
  },
  textRight: {
    color: 'rgb(63,50,77)',
    fontSize: 15,
    fontFamily: 'Roboto-Regular'
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginLeft: 8*k,
    marginRight: 70*k,
    shadowOffset: {width:0, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginRight: 14*k,
    marginLeft: 70*k,
    shadowOffset: {width:0, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,254,227,0.9)',
    alignSelf: 'flex-end',
  },
  bubbleCenter: {
    backgroundColor: '#007aff',
    alignSelf: 'center',
  },
  bubbleError: {
    backgroundColor: '#e01717',
  },
});

export default class ChatBubble extends React.Component {
  
  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderMedia(media: File = '', position) {
    if (!media.loaded){

    }
    return <View key={media.id+"view"}
                 style={{width:width-90, height:(width-90)*media.height/media.width}}>
      <ResizedImage key={media.id+"image"} image={media} />
    </View>
  }
  
  renderText(text = '', position) {
    if (this.props.renderCustomText) {
      return this.props.renderCustomText(this.props);
    }
    
    if (this.props.parseText === true) {
      return (
        <ParsedText
          style={[styles.text, (position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter)]}
          parse={
            [
              {
                type: 'url',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleUrlPress,
              },
              {
                type: 'phone',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handlePhonePress,
              },
              {
                type: 'email',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleEmailPress,
              },
            ]
          }
        >
          {text}
        </ParsedText>
      );
    }
    
    return (
      <Text style={[styles.text, (position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter)]}>
        {text}
      </Text>
    );
  }
  
  render() {
    const flexStyle = {};
    if (this.props.text) {
      if (this.props.text.length > 40) {
        flexStyle.flex = 1;
      }
    }
    
    return (
      <View style={{flex:1}}>
        <View style={[this.props.media && this.props.media.source ? styles.mediaBubble : styles.bubble ,
        (this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter),
        (this.props.status === 'ErrorButton' ? styles.bubbleError : null),
        flexStyle]} key={this.props.id+"bubble"} >
          {this.props.name}
          {this.renderText(this.props.text, this.props.position)}
          {this.props.media && this.props.media.source && this.renderMedia(this.props.media, this.props.position)}
          {this.props.media && this.props.media.error && this.renderText(this.props.media.error, this.props.position)}
        </View>
        {this.props.position === 'left' && <Image style={{position:'absolute',bottom:14*k, left:-6*k}} source={require('../../images/triangleWhite.png')}/>}
        {this.props.position === 'right' && <Image style={{position:'absolute',bottom:5*k, right:0*k}} source={require('../../images/triangleYellow.png')}/>}
      </View>
    );
  }
}

ChatBubble.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right', 'center']),
  status: React.PropTypes.string,
  text: React.PropTypes.string,
  renderCustomText: React.PropTypes.func,
  styles: React.PropTypes.object,
  parseText: React.PropTypes.bool,
  name: React.PropTypes.element,
  handleUrlPress: React.PropTypes.func,
  handlePhonePress: React.PropTypes.func,
  handleEmailPress: React.PropTypes.func,
};
