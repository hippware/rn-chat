import React from 'react';
import Button from 'react-native-button';
import {View, Modal, Keyboard, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react/native';
import AutoExpandingTextInput from '../AutoExpandingTextInput';
import {colors} from '../../constants';
import model from '../../model/model';

const onAttach = (item) => {
  alert("onAttach");
};

const AttachButton = ({item}) =>
  (<Button containerStyle={styles.sendButton} onPress={() => onAttach(item)}>
    <Image source={require('../../../images/attachPhoto.png')} />
  </Button>);

class AddBotPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    if (this.state.text.trim() && model.connected) {
//      messageStore.sendMessage({to: this.chat.id, body: this.state.text.trim()});
      this.setState({text: ''});
    }
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  };

  keyboardWillHide = (e) => {
    if (this.mounted) this.setState({height: 0});
  };
  render() {
    return (
      <View style={{position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, backgroundColor: this.state.focused ? 'rgba(0,0,0,0.40)' : 'transparent'}}
            pointerEvents='box-none'>
        <View style={{position: 'absolute', bottom: this.state.height, left: 0, right: 0, height: Math.min(115, 15 + Math.max(35, this.state.inputHeight))}}>
          <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
            <AttachButton item={this.chat} />
            <TextInput
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
              blurOnSubmit
            />
            <TouchableOpacity style={styles.sendButton} onPress={this.onSend}>
              <Text>Post</Text>
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
