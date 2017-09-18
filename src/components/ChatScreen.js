// @flow

import React, {Component} from 'react';
import {View, Keyboard, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';

// @NOTE: Future versions of RN FlatList will probably be invertible and we can remove this dependency
import {InvertibleFlatList} from 'react-native-invertible-flat-list';

import moment from 'moment';
import Button from 'react-native-button';
import {autorun, observable, when, toJS} from 'mobx';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';

import Screen from './Screen';
import Avatar from './common/Avatar';
import Chat from '../model/Chat';
import Message from '../model/Message';
import {showImagePicker} from './ImagePicker';
import ChatBubble from './ChatBubble';
import ChatMessage from './ChatMessage';
import location from '../store/locationStore';
import messageStore from '../store/messageStore';
import model from '../model/model';
import Notification from './Notification';
import AutoExpandingTextInput from './common/AutoExpandingTextInput';
import {colors} from '../constants';

const onAttach = (item) => {
  const chat: Chat = item || console.error('No Chat is defined');
  showImagePicker('Select Image', (source, response) => {
    messageStore.sendMedia({
      file: source,
      width: response.width,
      height: response.height,
      size: response.size,
      to: chat.id,
    });
  });
};

const AttachButton = ({item}) => (
  <Button containerStyle={styles.sendButton} onPress={() => onAttach(item)}>
    <Image source={require('../../images/iconAttach.png')} />
  </Button>
);

type Props = {
  item: Object,
};

type State = {
  text: string,
  height: number,
};

class ChatScreen extends Component {
  props: Props;
  state: State;
  @observable messages: Array<any> = [];
  @observable chat: Chat;
  mounted: boolean;
  handler: Function;
  list: Object;

  static renderTitle = ({item}) => (
    <View>
      {model.chats.get(item).participants.map((profile, ind) => (
        <TouchableOpacity
          key={`${ind}${profile.user}touch`}
          onPress={() => {
            Actions.profileDetail({item: profile, title: profile.displayName});
          }}
        >
          <Avatar size={40} profile={profile} isDay={location.isDay} />
        </TouchableOpacity>
      ))}
    </View>
  );

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
    };
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentDidMount() {
    this.mounted = true;
    const {item} = this.props;
    if (item && !this.chat && !this.handler) {
      this.chat = model.chats.get(item);
      this.chat.active = true;
      this.handler = autorun(() => {
        this.chat && this.createDatasource();
      });
    }
    messageStore.readAll(this.chat);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.chat.active = false;
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
    if (this.handler) {
      this.handler();
      this.handler = null;
    }
  }

  onSend = () => {
    if (this.state.text.trim() && model.connected) {
      messageStore.sendMessage({to: this.chat.id, body: this.state.text.trim()});
      this.setState({text: ''});
    }
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
    if (rowData.date instanceof Date) {
      if (diffMessage === null) {
        return <Text style={[styles.date]}>{moment(rowData.date).calendar()}</Text>;
      } else if (diffMessage.date instanceof Date) {
        const diff = moment(rowData.date).diff(diffMessage.date, 'minutes');
        if (diff > 5) {
          return <Text style={[styles.date]}>{moment(rowData.date).calendar()}</Text>;
        }
      }
    }
    return null;
  };

  getPreviousMessage = (message) => {
    const i = this.messages.findIndex(m => m.uniqueId === message.uniqueId);
    return this.messages.length > i + 1 ? this.messages[i + 1] : null;
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
    if (!this.props.item) {
      return <Screen isDay={location.isDay} />;
    }
    return (
      <Screen isDay={location.isDay}>
        <View style={styles.container}>
          <InvertibleFlatList
            data={this.messages}
            ref={l => (this.list = l)}
            renderItem={({item}) => (
              <View>
                {this.renderDate(item)}
                <ChatMessage rowData={item} diffMessage={this.getPreviousMessage(item)} position={item.position} />
              </View>
            )}
            keyExtractor={item => item.uniqueId}
            inverted
            onEndReached={() => messageStore.loadMore(this.chat)}
            onEndReachedThreshold={200}
            ListFooterComponent={observer(() => (this.chat && this.chat.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null))}
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
              <Image source={this.state.text.trim() && model.connected ? require('../../images/iconSendActive.png') : require('../../images/iconSendInactive.png')} />
            </TouchableOpacity>
          </View>
          <View style={{height: this.state.height}} />
        </View>
        <Notification style={{position: 'absolute', top: 0}} />
      </Screen>
    );
  }
}

export default observer(ChatScreen);

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
