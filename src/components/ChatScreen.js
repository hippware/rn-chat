// @flow

import React, {Component} from 'react';
import {View, ActivityIndicator, Keyboard, Text, InteractionManager, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import Button from 'react-native-button';
import {autorun, observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';

import Screen from './Screen';
import Avatar from './Avatar';
import Chat from '../model/Chat';
import Message from '../model/Message';
import {showImagePicker} from './ImagePicker';
import ChatBubble from './ChatBubble';
import ChatMessage from './ChatMessage';
import location from '../store/locationStore';
import message from '../store/messageStore';
import model from '../model/model';
import Notification from './Notification';
import AutoExpandingTextInput from './AutoExpandingTextInput';
import {colors} from '../constants';

const onAttach = (item) => {
  const chat: Chat = item || console.error('No Chat is defined');
  showImagePicker('Select Image', (source, response) => {
    message.sendMedia({
      file: source,
      width: response.width,
      height: response.height,
      size: response.size,
      to: chat.id,
    });
  });
};

const AttachButton = ({item}) =>
  (<Button containerStyle={styles.sendButton} onPress={() => onAttach(item)}>
    <Image source={require('../../images/iconAttach.png')} />
  </Button>);

type Props = {
  item: Object,
};

type State = {
  text: string,
  isLoadingEarlierMessages: boolean,
};

class ChatScreen extends Component {
  props: Props;
  state: State;
  @observable messages: Array<any> = [];
  @observable chat: Chat;
  mounted: boolean;
  handler: Function;

  static renderTitle = ({item}) =>
    (<View>
      {model.chats.get(item).participants.map((profile, ind) =>
        (<TouchableOpacity
          key={`${ind}${profile.user}touch`}
          onPress={() => {
            Actions.profileDetail({item: profile, title: profile.displayName});
          }}
        >
          <Avatar size={40} profile={profile} isDay={location.isDay} />
        </TouchableOpacity>),
      )}
    </View>);

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoadingEarlierMessages: false,
    };
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentDidMount() {
    this.mounted = true;

    // console.log('& cdm', this.props, this.chat, this.handler);
    const {props} = this;
    if (props.item && !this.chat && !this.handler) {
      this.chat = model.chats.get(props.item);
      // console.log('& this.chat', this.chat);
      this.handler = autorun(() => {
        if (this.chat) {
          this.createDatasource();
        }
      });
      this.chat &&
        InteractionManager.runAfterInteractions(() => {
          this.onLoadEarlierMessages(this.chat);
        });
    }
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

  onLoadEarlierMessages = async (target) => {
    const chat: Chat = target || model.chats.get(this.props.item);
    if (!this.state.isLoadingEarlierMessages && !chat.loaded && !chat.loading) {
      this.setState({isLoadingEarlierMessages: true});
      await message.loadMore(chat);
      this.setState({isLoadingEarlierMessages: false});
    }
  };

  onSend = () => {
    console.log('& onSend');
    if (!this.state.text.trim() || !model.connected) {
      return;
    }
    message.sendMessage({to: this.chat.id, body: this.state.text.trim()});
    this.setState({text: ''});
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  };

  keyboardWillHide = (e) => {
    if (this.mounted) this.setState({height: 0});
  };

  renderDate = (rowData = {}) => {
    let diffMessage = null;
    diffMessage = this.getPreviousMessage(rowData);

    if (this.props.renderCustomDate) {
      return this.props.renderCustomDate(rowData, diffMessage);
    }

    if (rowData.date instanceof Date) {
      if (diffMessage === null) {
        return (
          <Text style={[styles.date]}>
            {moment(rowData.date).calendar()}
          </Text>
        );
      } else if (diffMessage.date instanceof Date) {
        const diff = moment(rowData.date).diff(moment(diffMessage.date), 'minutes');
        if (diff > 5) {
          return (
            <Text style={[styles.date]}>
              {moment(rowData.date).calendar()}
            </Text>
          );
        }
      }
    }
    return null;
  };

  getPreviousMessage = (message) => {
    for (let i = 0; i < this.messages.length; i++) {
      if (message.uniqueId === this.messages[i].uniqueId) {
        if (this.messages.length > i + 1) {
          return this.messages[i + 1];
        }
      }
    }
    return null;
  };

  getNextMessage = (message) => {
    for (let i = 0; i < this.messages.length; i++) {
      if (message.uniqueId === this.messages[i].uniqueId) {
        if (this.messages[i - 1]) {
          return this.messages[i - 1];
        }
      }
    }
    return null;
  };

  createDatasource = () => {
    this.messages = this.chat.messages
      .map((el: Message) => ({
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
        profile: el.from,
        imageView: Avatar,
        view: ChatBubble,
        date: new Date(el.time),
      }))
      .reverse();
  };

  render() {
    if (!this.props.item || !this.messages.length) {
      return <Screen isDay={location.isDay} />;
    }
    if (this.chat) {
      InteractionManager.runAfterInteractions(() => {
        message.readAll(this.chat);
      });
    }
    return (
      <Screen isDay={location.isDay}>
        <View style={styles.container}>
          <FlatList
            data={this.messages.map(x => x)}
            renderItem={({item}) =>
              (<View>
                {this.renderDate(item)}
                <ChatMessage
                  rowData={item}
                  onErrorButtonPress={this.props.onErrorButtonPress}
                  displayNames={this.props.displayNames}
                  displayNamesInsideBubble={this.props.displayNamesInsideBubble}
                  diffMessage={this.getPreviousMessage(item)}
                  position={item.position}
                  forceRenderImage={this.props.forceRenderImage}
                  onImagePress={this.props.onImagePress}
                  onMessageLongPress={this.props.onMessageLongPress}
                  renderCustomText={this.props.renderCustomText}
                  parseText={this.props.parseText}
                  handlePhonePress={this.props.handlePhonePress}
                  handleUrlPress={this.props.handleUrlPress}
                  handleEmailPress={this.props.handleEmailPress}
                />
              </View>)}
            keyExtractor={item => item.uniqueId}
            onEndReached={this.onLoadEarlierMessages}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={}
            // ListEmptyComponent={}
          />
          <View style={[styles.textInputContainer, location.isDay ? styles.textInputContainerDay : styles.textInputContainerNight]}>
            <AttachButton item={this.chat} />
            <AutoExpandingTextInput
              style={[styles.textInput, location.isDay ? styles.textInputDay : styles.textInputNight]}
              placeholder='Write a message'
              placeholderTextColor={colors.DARK_GREY}
              multiline
              autoFocus
              returnKeyType='default'
              onSubmitEditing={this.onSend}
              enablesReturnKeyAutomatically
              onChangeText={text => this.setState({text})}
              value={this.state.text}
              blurOnSubmit={false}
            />
            <TouchableOpacity style={styles.sendButton} onPress={this.onSend}>
              <Image source={!this.state.text.trim() || !model.connected ? require('../../images/iconSendInactive.png') : require('../../images/iconSendActive.png')} />
            </TouchableOpacity>
          </View>
          <View style={{height: this.state.height}} />
        </View>
        <Notification style={{position: 'absolute', top: 70}} />
      </Screen>
    );
  }
}

export default observer(ChatScreen);

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 70,
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
  },
  textInput: {
    alignSelf: 'center',
    width: 100,
    fontFamily: 'Roboto-Regular',
    flex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
  },
  textInputDay: {
    color: colors.DARK_PURPLE,
  },
  textInputNight: {
    color: 'white',
  },
  sendButton: {
    alignSelf: 'flex-end',
    paddingBottom: 5,
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
