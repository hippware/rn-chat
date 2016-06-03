import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import File from '../model/File';
import ResizedImage from './ResizedImage';

import ParsedText from 'react-native-parsed-text';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 2,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
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
    marginLeft: 12,
    marginRight: 70,
    shadowOffset: {width:0, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginRight: 12,
    marginLeft: 70,
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

  renderMedia(media: File = '') {
    if (!media.loaded){
      return null;
    }
    return <View style={{width:300, height:300*media.height/media.width}}>
      {media.source && <ResizedImage image={media} />}
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
      <View>
        <View style={[styles.bubble,
        (this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter),
        (this.props.status === 'ErrorButton' ? styles.bubbleError : null),
        flexStyle]}
        >
          {this.props.name}
          {this.renderText(this.props.text, this.props.position)}
          {this.props.media && this.renderMedia(this.props.media, this.props.position)}
        </View>
        {this.props.position === 'left' && <Image style={{position:'absolute',bottom:18}} source={require('../../images/triangleWhite.png')}/>}
        {this.props.position === 'right' && <Image style={{position:'absolute',bottom:7, right:0}} source={require('../../images/triangleYellow.png')}/>}
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
