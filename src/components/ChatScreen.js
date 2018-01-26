// @flow

import React from 'react';
import {View, Keyboard, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

import moment from 'moment';
import Button from 'apsl-react-native-button';
import {autorun, observable} from 'mobx';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';

import Screen from './Screen';
import Avatar from './common/Avatar';
import {showImagePicker} from './ImagePicker';
import ChatBubble from './ChatBubble';
import ChatMessage from './ChatMessage';
import {AutoExpandingTextInput} from './common';
import {colors} from '../constants';

type Props = {
  item: string,
};

type State = {
  text: string,
  height: number,
};

const ChatTitle = inject('wocky')(observer(({item, wocky}) => {
  return wocky.chats.get(item)
    ? wocky.chats.get(item).participants.map((profile, ind) => (
      <TouchableOpacity
            key={`${ind}${profile.id}touch`} // eslint-disable-line
        onPress={() => {
          Actions.profileDetail({item: profile, title: profile.displayName});
        }}
      >
        <Avatar size={40} profile={profile} />
      </TouchableOpacity>
    ))
    : null;
}));

@inject('wocky')
@observer
class ChatScreen extends React.Component<Props, State> {
  state: State = {
    text: '',
    height: 0,
  };

  @observable messages: Array<any> = [];
  @observable chat: Chat;
  mounted: boolean;
  handler: Function;
  list: any;

  static renderTitle = ({item}) => <ChatTitle item={item} />;

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentDidMount() {
    this.mounted = true;
    const {item} = this.props;
    this.chat = this.props.wocky.chats.get(item);
    if (!this.chat) {
      console.warn(`Chat ${item} does not exist`);
      Actions.pop();
      return;
    }
    this.chat.setActive(true);
    this.handler = autorun(() => {
      this.chat && this.createDatasource();
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.chat) {
      this.chat.setActive(false);
    }
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
    if (this.handler) {
      this.handler();
      this.handler = null;
    }
  }

  onSend = () => {
    if (this.state.text.trim()) {
      this.props.wocky.sendMessage({to: this.chat.id, body: this.state.text.trim()});
      this.setState({text: ''});
    }
  };

  keyboardWillShow = (e) => {
    if (this.mounted) this.setState({height: e.endCoordinates.height});
  };

  keyboardWillHide = (e) => {
    if (this.mounted) this.setState({height: 0});
  };

  // TODO: rework this so it's included in row render...inefficient this way
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
      .map(el => ({
        uniqueId: el.id,
        text: el.body || '',
        isDay: true,
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
    const {wocky} = this.props;
    if (!this.props.item) {
      return <Screen isDay />;
    }
    return (
      <Screen isDay>
        <View style={styles.container}>
          <FlatList
            inverted
            data={this.messages}
            // data={[]}
            ref={l => (this.list = l)}
            renderItem={({item}) => (
              <View>
                {this.renderDate(item)}
                <ChatMessage rowData={item} diffMessage={this.getPreviousMessage(item)} position={item.position} />
              </View>
            )}
            keyExtractor={item => item.uniqueId}
            onEndReached={() => this.chat.load()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={observer(() => (this.chat && this.chat.loading ? <ActivityIndicator style={{marginVertical: 20}} /> : null))}
          />
          <View style={[styles.textInputContainer, styles.textInputContainerDay]}>
            <AttachButton item={this.chat} wocky={wocky} />
            <AutoExpandingTextInput
              style={[styles.textInput, styles.textInputDay]}
              placeholder='Write a message'
              placeholderTextColor={colors.DARK_GREY}
              multiline
              autoFocus
              returnKeyType='default'
              enablesReturnKeyAutomatically
              onChangeText={text => this.setState({text})}
              value={this.state.text}
              blurOnSubmit={false}
              maxHeight={100}
              maxLength={500}
            />
            <TouchableOpacity style={styles.sendButton} onPress={this.onSend}>
              <Image source={this.state.text.trim() && wocky.connected ? require('../../images/iconSendActive.png') : require('../../images/iconSendInactive.png')} />
            </TouchableOpacity>
          </View>
          <View style={{height: this.state.height}} />
        </View>
      </Screen>
    );
  }
}

const onAttach = (item, wocky) => {
  const chat: Chat = item || console.error('No Chat is defined');
  showImagePicker('Select Image', (source, response) => {
    wocky.sendMedia({
      file: source,
      width: response.width,
      height: response.height,
      size: response.size,
      to: chat.id,
    });
  });
};

const AttachButton = ({item, wocky}) => (
  <Button style={{borderWidth: 0, borderColor: 'transparent', paddingTop: 4}} onPress={() => onAttach(item, wocky)}>
    <Image source={require('../../images/iconAttach.png')} />
  </Button>
);

export default ChatScreen;

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
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
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
