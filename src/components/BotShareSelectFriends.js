import React from 'react';
import SelectFriends from './SelectFriends';
import Screen from './Screen';
import {
    TextInput,
    TouchableOpacity,
    Text,
    View,
    Keyboard
} from 'react-native';
import SaveButton from './SaveButton';
import location from '../store/locationStore';
import { k } from './Global';
import search from '../store/searchStore';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import SelectableProfileList from '../model/SelectableProfileList';
import SelectableProfile from '../model/SelectableProfile';
import botStore from '../store/botStore';
import model from '../model/model';
import autobind from 'autobind-decorator';
import { Actions } from 'react-native-router-native';
import AutoExpandingTextInput from './AutoExpandingTextInput';
import { SHARE_SELECT } from '../model/Bot';
@autobind
@observer
export default class extends React.Component {
    @observable selection: SelectableProfileList;

    constructor(props) {
        super(props);
        this.state = { height: 0, message: '' };
    }

    share() {
        botStore.bot.shareMode = SHARE_SELECT;
        botStore.bot.shareSelect = this.selection.list
            .filter(
                (selectableProfile: SelectableProfile) =>
                    selectableProfile.selected
            )
            .map(
                (selectableProfile: SelectableProfile) =>
                    selectableProfile.profile
            );
        try {
            botStore.share(this.state.message, 'headline');
            Actions.pop({ animated: false });
            Actions.botShareCompleted({
                user: botStore.bot.shareSelect[0].user,
                number: botStore.bot.shareSelect.length
            });
        } catch (e) {
            alert(e);
        }
    }

    componentWillMount() {
        this.selection = new SelectableProfileList(model.friends.friends);
        botStore.bot.shareSelect = [];
        this.selection.multiSelect = true;
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        Keyboard.removeListener('keyboardWillShow');
        Keyboard.removeListener('keyboardWillHide');
    }

    keyboardWillShow(e) {
        if (this.mounted) this.setState({ height: e.endCoordinates.height });
    }

    keyboardWillHide(e) {
        if (this.mounted) this.setState({ height: 0 });
    }

    render() {
        return (
            <Screen
                isDay={location.isDay}
                style={{ paddingTop: 70 * k, flex: 1 }}
            >
                <SelectFriends selection={this.selection} />
                {!!this.selection.selected.length &&
                    <View
                        style={{
                            bottom: 0,
                            right: 0,
                            left: 0,
                            position: 'relative',
                            shadowOffset: { height: -1, width: 0 },
                            shadowRadius: 4,
                            shadowOpacity: 0.11
                        }}
                    >
                        <View
                            style={{
                                padding: 20 * k,
                                paddingTop: 15 * k,
                                paddingBottom: 10 * k
                            }}
                        >
                            <AutoExpandingTextInput
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 15 * k,
                                    color: 'rgb(63,50,77)'
                                }}
                                placeholderTextColor="rgb(155,155,155)"
                                maxLength={140}
                                value={this.state.message}
                                onChangeText={text =>
                                    this.setState({ message: text })}
                                placeholder="Write an optional message..."
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                height: 50 * k,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 0,
                                backgroundColor: 'rgb(254,92,108)'
                            }}
                            onPress={this.share}
                        >
                            <Text
                                style={{
                                    fontSize: 15 * k,
                                    fontFamily: 'Roboto-Regular',
                                    color: 'white',
                                    letterSpacing: 0.8
                                }}
                            >
                                Share
                            </Text>
                        </TouchableOpacity>
                    </View>}
                <View style={{ height: this.state.height }} />
            </Screen>
        );
    }
}
