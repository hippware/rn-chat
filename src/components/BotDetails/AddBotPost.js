import React from 'react';
import Button from 'react-native-button';
import {View, Keyboard, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import RText from '../common/RText';
import {colors} from '../../constants';
import model from '../../model/model';
import Bot from '../../model/Bot';
import botStore from '../../store/botStore';
import {Actions} from 'react-native-router-flux';

type Props = {
  bot: Bot,
};

@observer
class AddBotPost extends React.Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      image: null,
      height: 0,
      inputHeight: 0,
    };
  }

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
    if (this.handler) {
      this.handler();
      this.handler = null;
    }
  }

  onSend = () => {
    botStore.publishItem(this.state.text.trim(), this.state.image, this.props.bot);
    this.setState({text: ''});
    this.textInput.blur();
    Actions.refresh({scrollToFirst: true});
  };

  onAttach = () => {
    // TODO: actual image processing
    alert('TODO: add image');
    this.setState({image: '123'});
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  };

  keyboardWillHide = () => {
    if (this.mounted) this.setState({height: 0});
  };
  render() {
    const textLength = this.state.text.trim().length;
    return (
      <View
        style={{position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, backgroundColor: this.state.focused ? 'rgba(0,0,0,0.40)' : 'transparent'}}
        pointerEvents='box-none'
      >
        <View style={{position: 'absolute', bottom: this.state.height, left: 0, right: 0, height: Math.min(115, 30 + this.state.inputHeight)}}>
          <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
            <Button hitSlop={{top: 15, left: 15, right: 15, bottom: 15}} containerStyle={styles.sendButton} onPress={this.onAttach} disabled={!!this.state.image}>
              <Image style={{width: 25, height: 21}} source={this.state.image ? require('../../../images/attachPhotoGray.png') : require('../../../images/attachPhoto.png')} />
            </Button>
            <TextInput
              ref={text => (this.textInput = text)}
              onChangeText={text => this.setState({text})}
              onContentSizeChange={({nativeEvent}) => this.setState({inputHeight: nativeEvent.contentSize.height})}
              style={[styles.textInput, styles.textInputDay, {height: 'auto'}]}
              placeholder='Add a post'
              placeholderTextColor={colors.DARK_GREY}
              onFocus={() => this.setState({focused: true})}
              onBlur={() => this.setState({focused: false})}
              multiline
              returnKeyType='default'
              onSubmitEditing={this.onSend}
              enablesReturnKeyAutomatically
              value={this.state.text}
              maxLength={5000}
              blurOnSubmit
            />
            <TouchableOpacity
              hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
              disabled={(textLength === 0 && !this.image) || !model.connected}
              style={styles.sendButton}
              onPress={this.onSend}
            >
              <RText size={16} color={(textLength || this.image) && model.connected ? colors.PINK : colors.GREY}>Post</RText>
            </TouchableOpacity>
          </View>
          <View style={{height: this.state.height}} />
        </View>
      </View>
    );
  }
}

export default observer(AddBotPost);

const styles = StyleSheet.create({
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
