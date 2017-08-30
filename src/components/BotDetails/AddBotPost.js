// @flow

import React from 'react';
import Button from 'react-native-button';
import {View, Keyboard, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import RText from '../common/RText';
import {colors} from '../../constants';
import model from '../../model/model';
import Bot from '../../model/Bot';
import botStore from '../../store/botStore';
import {Actions} from 'react-native-router-flux';
// import ActionSheet from 'react-native-actionsheet';
import {showImagePicker} from '../ImagePicker';
import {k} from '../Global';

@observer
class AddBotPost extends React.Component {
  props: {
    bot: Bot,
  };
  @observable imageSrc: ?Object = null;
  @observable text: string = '';
  @observable keyboardHeight: number = 0;
  @observable inputHeight: number = 0;
  @observable focused: boolean = false;
  mounted: boolean = false;
  textInput: any;

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
    // if (this.handler) {
    //   this.handler();
    //   this.handler = null;
    // }
  }

  onSend = () => {
    const img = this.imageSrc ? this.imageSrc.uri : null;
    botStore.publishItem(this.text.trim(), img, this.props.bot);
    this.text = '';
    this.imageSrc = null;
    this.textInput.blur();
    Actions.refresh({scrollToFirst: true});
  };

  onAttach = () => {
    showImagePicker('Image Picker', (source, response) => {
      console.log('& image picker response', source, response);
      this.imageSrc = source;
    });
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.keyboardHeight = e.endCoordinates.height;
  };

  keyboardWillHide = () => {
    if (this.mounted) this.keyboardHeight = 0;
  };
  render() {
    const imgContainerHeight = this.imageSrc ? IMAGE_HEIGHT + 40 : 0;
    const textLength = this.text.trim().length;
    const height = Math.min(115 + imgContainerHeight + 20, this.inputHeight + 30 + imgContainerHeight);
    return (
      <View style={{position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, backgroundColor: this.focused ? 'rgba(0,0,0,0.40)' : 'transparent'}} pointerEvents='box-none'>
        <View style={{position: 'absolute', bottom: this.keyboardHeight, left: 0, right: 0, height, backgroundColor: colors.WHITE}}>
          <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
            <Button hitSlop={{top: 15, left: 15, right: 15, bottom: 15}} containerStyle={styles.sendButton} onPress={this.onAttach} disabled={!!this.imageSrc}>
              <Image style={{width: 25, height: 21}} source={this.imageSrc ? require('../../../images/attachPhotoGray.png') : require('../../../images/attachPhoto.png')} />
            </Button>
            <TextInput
              ref={text => (this.textInput = text)}
              onChangeText={text => (this.text = text)}
              onContentSizeChange={({nativeEvent}) => (this.inputHeight = nativeEvent.contentSize.height)}
              style={[styles.textInput, styles.textInputDay, {height: 'auto'}]}
              placeholder='Add a post'
              placeholderTextColor={colors.DARK_GREY}
              onFocus={() => (this.focused = true)}
              onBlur={() => (this.focused = false)}
              multiline
              returnKeyType='default'
              onSubmitEditing={this.onSend}
              enablesReturnKeyAutomatically
              value={this.text}
              maxLength={5000}
              blurOnSubmit
            />
            <TouchableOpacity
              hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
              disabled={(textLength === 0 && !this.imageSrc) || !model.connected}
              style={styles.sendButton}
              onPress={this.onSend}
            >
              <RText size={16} color={(textLength || this.imageSrc) && model.connected ? colors.PINK : colors.GREY}>
                Post
              </RText>
            </TouchableOpacity>
          </View>
          <ImagePost imageSrc={this.imageSrc} deleteImage={() => (this.imageSrc = null)} />
          <View style={{height: this.keyboardHeight}} />
        </View>
      </View>
    );
  }
}

const IMAGE_HEIGHT = 70;

const ImagePost = ({imageSrc, deleteImage}) => {
  return imageSrc && imageSrc.uri
    ? <View style={styles.imageContainer}>
      <Image source={{uri: imageSrc.uri}} style={{height: IMAGE_HEIGHT, width: IMAGE_HEIGHT, marginLeft: 40, marginTop: 10, alignSelf: 'flex-start'}} />
      <TouchableOpacity onPress={deleteImage}>
        <Image source={require('../../../images/deleteImage.png')} style={{position: 'relative', right: 10}} />
      </TouchableOpacity>
    </View>
    : null;
};

export default observer(AddBotPost);

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 1,
    // height: IMAGE_HEIGHT + 20,
    // marginLeft: 40,
    // padding: 10,
    // borderColor: 'blue',
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
  },
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
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'pink',
    // borderWidth: 1,
  },
  textInput: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
    flex: 1,
    margin: 0,
    paddingTop: 0,
    paddingLeft: 11,
    paddingRight: 11,
    fontSize: 13,
  },
  textInputDay: {
    color: colors.DARK_PURPLE,
  },
  textInputNight: {
    color: 'white',
  },
  sendButton: {
    alignSelf: 'flex-start',
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
});
