// @flow

import React from 'react';
import Button from 'apsl-react-native-button';
import {Alert, View, Keyboard, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, when, computed} from 'mobx';
import RText from '../common/RText';
import {colors} from '../../constants';
import model from '../../model/model';
import Bot from '../../model/Bot';
import botStore from '../../store/botStore';
import fileStore from '../../store/fileStore';
import {Actions} from 'react-native-router-flux';
import {showImagePicker} from '../ImagePicker';
import {k} from '../Global';

const IMAGE_HEIGHT = 70 * k;

@observer
class AddBotPost extends React.Component {
  props: {
    bot: Bot,
    scrollToEnd: Function,
  };
  @observable imageSrc: ?Object = null;
  @observable image: ?Object = null;
  @observable text: string = '';
  @observable keyboardHeight: number = 0;
  @observable inputHeight: number = 0;
  @observable focused: boolean = false;
  @observable sendingPost: boolean = false;

  @computed
  get imgContainerHeight() {
    return this.imageSrc ? IMAGE_HEIGHT + 40 * k : 0;
  }

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
  }

  onSend = async () => {
    if (this.sendingPost) return;
    this.sendingPost = true;
    try {
      await botStore.publishItem(this.text.trim(), this.image, this.props.bot);
      this.text = '';
      this.imageSrc = null;
      this.image = null;
      this.textInput.blur();
      Keyboard.dismiss();
      this.props.scrollToEnd();
    } catch (e) {
      if (e.code === '403') {
        Alert.alert('Cannot publish the post, bot is private now');
      } else {
        Alert.alert('Cannot publish the post');
      }
    } finally {
      this.sendingPost = false;
    }
  };

  onAttach = () => {
    showImagePicker('Image Picker', async (source, response) => {
      const {size, width, height} = response;
      this.imageSrc = source;
      this.image = {source, size, width, height};
      this.textInput.focus();
    });
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.keyboardHeight = e.endCoordinates.height;
  };

  keyboardWillHide = () => {
    if (this.mounted) this.keyboardHeight = 0;
  };
  render() {
    const textLength = this.text.trim().length;
    const height = Math.min(120 * k, this.inputHeight + 30 * k);
    return (
      <View style={{position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, backgroundColor: this.focused ? 'rgba(0,0,0,0.40)' : 'transparent'}} pointerEvents='box-none'>
        <View
          style={{
            position: 'absolute',
            bottom: this.keyboardHeight + this.imgContainerHeight,
            left: 0,
            right: 0,
            height,
            backgroundColor: colors.WHITE,
            borderTopWidth: 1,
            borderColor: colors.GREY,
          }}
        >
          <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
            <Button hitSlop={{top: 15, left: 15, right: 15, bottom: 15}} style={{borderWidth: 0, borderColor: 'transparent'}} onPress={this.onAttach} disabled={!!this.imageSrc}>
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
            />
            <TouchableOpacity
              hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
              disabled={(textLength === 0 && !this.imageSrc) || !model.connected || this.sendingPost}
              onPress={this.onSend}
            >
              <RText size={16} color={(textLength || this.imageSrc) && model.connected ? colors.PINK : colors.GREY}>
                Post
              </RText>
            </TouchableOpacity>
          </View>
          <View style={{height: this.imgContainerHeight, backgroundColor: 'white'}}>
            <ImagePost
              imageSrc={this.imageSrc}
              deleteImage={() => {
                this.imageSrc = null;
                this.image = null;
              }}
            />
          </View>
          <View style={{height: this.keyboardHeight}} />
        </View>
      </View>
    );
  }
}

const ImagePost = ({imageSrc, deleteImage}) => {
  return imageSrc && imageSrc.uri ? (
    <View style={styles.imageContainer}>
      <Image source={{uri: imageSrc.uri}} style={{height: IMAGE_HEIGHT, width: IMAGE_HEIGHT, marginLeft: 50 * k, marginTop: 10 * k}} />
      <TouchableOpacity onPress={deleteImage}>
        <Image source={require('../../../images/deleteImage.png')} style={{position: 'relative', right: 10}} />
      </TouchableOpacity>
    </View>
  ) : null;
};

export default observer(AddBotPost);

const styles = StyleSheet.create({
  imageContainer: {
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
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  textInput: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    flex: 1,
    margin: 0,
    paddingTop: 0,
    paddingHorizontal: 11,
  },
  textInputDay: {
    color: colors.DARK_PURPLE,
  },
  textInputNight: {
    color: 'white',
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
