import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import File from '../model/File';
import ResizedImage from './ResizedImage';
import {k} from './Global';
import ParsedText from 'react-native-parsed-text';

const {height, width} = Dimensions.get('window');
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {colors} from '../constants';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 2,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    paddingTop: 5,
  },
  mediaBubble: {
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  text: {
    color: '#000',
  },
  textLeft: {
    color: colors.DARK_PURPLE,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textRight: {
    color: colors.DARK_PURPLE,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginLeft: 8,
    marginRight: 70,
    // shadowOffset: {width:0, height: 1},
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginRight: 14,
    marginLeft: 70,
    // shadowOffset: {width:0, height: 1},
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
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

@autobind
@observer
export default class ChatBubble extends React.Component {
  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderMedia(media: File = '', position) {
    // if (!media.loaded) {}
    const w = position === 'left' ? width - 150 * k : width - 93;
    return (
      <View key={`${media.id}view`} style={{width: w, height: w * media.height / media.width}}>
        <ResizedImage key={`${media.id}image`} image={media} />
      </View>
    );
  }

  renderText(text = '', position) {
    if (this.props.renderCustomText) {
      return this.props.renderCustomText(this.props);
    }

    if (this.props.parseText === true) {
      return (
        <ParsedText
          style={[styles.text, position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter]}
          parse={[
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
          ]}
        >
          {text}
        </ParsedText>
      );
    }
    return <Text style={[styles.text, position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter]}>{text}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={[
            this.props.media && this.props.media.source ? styles.mediaBubble : styles.bubble,
            this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter,
            this.props.status === 'ErrorButton' ? styles.bubbleError : null,
          ]}
          key={`${this.props.id}bubble`}
        >
          {this.props.name}
          {this.renderText(this.props.text, this.props.position)}
          {this.props.media && this.props.media.source && this.renderMedia(this.props.media, this.props.position)}
        </View>
        {this.props.position === 'left' && <Image style={{position: 'absolute', bottom: 12, left: -4}} source={require('../../images/triangleWhite.png')} />}
        {this.props.position === 'right' && <Image style={{position: 'absolute', bottom: 5, right: 2}} source={require('../../images/triangleYellow.png')} />}
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
