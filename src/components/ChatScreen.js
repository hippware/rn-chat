import React, {Component} from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
    Keyboard,
    Text,
    ListView,
    ScrollView,
    DeviceEventEmitter,
    InteractionManager,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native';
import Screen from './Screen';
import Avatar from './Avatar';
import Chat from '../model/Chat';
import Message from '../model/Message';
import Button from 'react-native-button';
import assert from 'assert';
import NavBar from './NavBar';
import showImagePicker from './ImagePicker';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import ChatBubble from './ChatBubble';
import ChatMessage from './ChatMessage';
import location from '../store/locationStore';
import message from '../store/messageStore';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import moment from 'moment';
import {autorun, observable} from 'mobx';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import model from '../model/model';
import statem from '../../gen/state';
import Notification from './Notification';
import AutoExpandingTextInput from './AutoExpandingTextInput';
import {colors} from '../constants';

@autobind class AttachButton extends Component {
    onAttach() {
        const chat: Chat = this.props.item || console.error('No Chat is defined');
        showImagePicker('Select Image', (source, response) => {
            message.sendMedia({
                file: source,
                width: response.width,
                height: response.height,
                size: response.fileSize,
                to: chat.id,
            });
        });
    }

    render() {
        return (
            <Button containerStyle={styles.sendButton} onPress={this.onAttach}>
                <Image source={require('../../images/iconAttach.png')} />
            </Button>
        );
    }
}

function ProfileNavBar({item}) {
    return (
        <NavBar style={{paddingTop: 20, flexDirection: 'row'}}>
            {item.participants.map((profile, ind) => (
                <TouchableOpacity
                    key={ind + profile.user + 'touch'}
                    onPress={() => {
                        Actions.profileDetail({item: profile, title: profile.displayName});
                    }}
                >
                    <Avatar
                        size={40}
                        profile={profile}
                        key={ind + profile.user + 'avatart'}
                        source={profile.avatar && profile.avatar.source}
                        title={profile.displayName}
                        isDay={location.isDay}
                    />
                </TouchableOpacity>
            ))}
        </NavBar>
    );
}

@autobind
export default class ChatScreen extends Component {
    @observable chat;
    @observable drawed;

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isLoadingEarlierMessages: false,
            datasource: ds.cloneWithRows([]),
        };
    }

    async onLoadEarlierMessages(target) {
        const chat: Chat = target || model.chats.get(this.props.item);
        if (!this.state.isLoadingEarlierMessages && !chat.loaded && !chat.loading) {
            console.log('LOADING MORE MESSAGES');
            this.setState({isLoadingEarlierMessages: true});
            await message.loadMore(chat);
            this.setState({isLoadingEarlierMessages: false});
        }
    }

    onSend() {
        if (!this.state.text.trim() || !model.connected) {
            return;
        }
        message.sendMessage({to: this.chat.id, body: this.state.text.trim()});
        this.setState({text: ''});
    }

    componentWillMount() {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
        this.mounted = true;
    }

    componentWillReceiveProps(props) {
        console.log('ChatScreen RECEIVE PROPS', props);
        if (props.item && !this.chat && !this.handler) {
            this.chat = model.chats.get(props.item);
            this.handler = autorun(() => {
                if (this.chat) {
                    this.createDatasource();
                }
            });
            InteractionManager.runAfterInteractions(() => {
                this.onLoadEarlierMessages(this.chat);
            });
        }
    }

    componentWillUnmount() {
        console.log('ChatScreen unmount');
        this.mounted = false;
        Keyboard.removeListener('keyboardWillShow');
        Keyboard.removeListener('keyboardWillHide');
        if (this.handler) {
            this.handler();
            this.handler = null;
        }
    }

    keyboardWillShow(e) {
        if (this.mounted) this.setState({height: e.endCoordinates.height});
    }

    keyboardWillHide(e) {
        if (this.mounted) this.setState({height: 0});
    }

    renderRow(rowData = {}) {
        const diffMessage = this.getPreviousMessage(rowData);

        return (
            <View>
                {this.renderDate(rowData)}
                <ChatMessage
                    rowData={rowData}
                    onErrorButtonPress={this.props.onErrorButtonPress}
                    displayNames={this.props.displayNames}
                    displayNamesInsideBubble={this.props.displayNamesInsideBubble}
                    diffMessage={diffMessage}
                    position={rowData.position}
                    forceRenderImage={this.props.forceRenderImage}
                    onImagePress={this.props.onImagePress}
                    onMessageLongPress={this.props.onMessageLongPress}
                    renderCustomText={this.props.renderCustomText}
                    parseText={this.props.parseText}
                    handlePhonePress={this.props.handlePhonePress}
                    handleUrlPress={this.props.handleUrlPress}
                    handleEmailPress={this.props.handleEmailPress}
                />
            </View>
        );
    }

    renderRow(rowData = {}) {
        let diffMessage = null;
        diffMessage = this.getPreviousMessage(rowData);

        return (
            <View>
                {this.renderDate(rowData)}
                <ChatMessage
                    rowData={rowData}
                    onErrorButtonPress={this.props.onErrorButtonPress}
                    displayNames={this.props.displayNames}
                    displayNamesInsideBubble={this.props.displayNamesInsideBubble}
                    diffMessage={diffMessage}
                    position={rowData.position}
                    forceRenderImage={this.props.forceRenderImage}
                    onImagePress={this.props.onImagePress}
                    onMessageLongPress={this.props.onMessageLongPress}
                    renderCustomText={this.props.renderCustomText}
                    parseText={this.props.parseText}
                    handlePhonePress={this.props.handlePhonePress}
                    handleUrlPress={this.props.handleUrlPress}
                    handleEmailPress={this.props.handleEmailPress}
                />
            </View>
        );
    }

    renderDate(rowData = {}) {
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
    }

    getPreviousMessage(message) {
        for (let i = 0; i < this.messages.length; i++) {
            if (message.uniqueId === this.messages[i].uniqueId) {
                if (this.messages[i + 1]) {
                    return this.messages[i + 1];
                }
            }
        }
        return null;
    }

    getNextMessage(message) {
        for (let i = 0; i < this.messages.length; i++) {
            if (message.uniqueId === this.messages[i].uniqueId) {
                if (this.messages[i - 1]) {
                    return this.messages[i - 1];
                }
            }
        }
        return null;
    }

    createDatasource() {
        // console.log("CREATE MESSAGE DATASOURCE", JSON.stringify(this.chat.messages));
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

        const datasource = ds.cloneWithRows(this.messages);
        this.setState({datasource});
    }

    render() {
        console.log('CHATSCREEN RENDER');
        if (!this.props.item || !this.state.datasource) {
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
                    <ListView
                        dataSource={this.state.datasource}
                        renderRow={this.renderRow}
                        canLoadMore
                        enableEmptySections
                        onLoadMoreAsync={this.onLoadEarlierMessages}
                        renderLoadingIndicator={() => <View style={styles.spiner}><ActivityIndicator /></View>}
                        renderScrollComponent={props => (
                            <InfiniteScrollView {...props} renderScrollComponent={props => <InvertibleScrollView {...props} inverted />} />
                        )}
                    />
                    <View style={[styles.textInputContainer, location.isDay ? styles.textInputContainerDay : styles.textInputContainerNight]}>
                        <AttachButton item={this.chat} />
                        <AutoExpandingTextInput
                            style={[styles.textInput, location.isDay ? styles.textInputDay : styles.textInputNight]}
                            placeholder='Write a message'
                            placeholderTextColor='rgb(155,155,155)'
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
                            <Image
                                source={
                                    !this.state.text.trim() || !model.connected
                                        ? require('../../images/iconSendInactive.png')
                                        : require('../../images/iconSendActive.png')
                                }
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{height: this.state.height}} />

                </View>
                {this.chat && <ProfileNavBar item={this.chat} />}
                <Notification style={{position: 'absolute', top: 70}} />

            </Screen>
        );
    }
}

const styles = {
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
};
