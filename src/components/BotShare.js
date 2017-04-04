import React from "react";
import {
    View,
    Alert,
    TouchableWithoutFeedback,
    Slider,
    Image,
    StyleSheet,
    TextInput,
    ListView,
    InteractionManager,
    Animated,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions
}
    from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/botStore';
import Bot, {
    SHARE_FOLLOWERS,
    SHARE_FRIENDS,
    SHARE_SELECT,
    VISIBILITY_WHITELIST,
    VISIBILITY_PUBLIC,
    VISIBILITY_FOLLOWERS,
    VISIBILITY_FRIENDS
} from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/botFactory';
import botStore from '../store/botStore';
import {k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import NavTitle from './NavTitle';
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import model from '../model/model';
import location from '../store/locationStore';
import Separator from './Separator';
import notification from '../store/notificationStore';
import Notification from '../model/Notification';
import ShowNotification from './Notification';
import {Actions} from 'react-native-router-native';
import RadioButtonList from './RadioButtonList';

@autobind
@observer
export default class BotShare extends React.Component {
    text = '';
    @observable message: string;

    share() {
        if (botStore.bot.shareMode === SHARE_SELECT) {
            this.text = botStore.bot.shareSelect.map(profile => profile.firstName || profile.handle).join(', ');
        }
        try {
            botStore.share(this.message, 'headline');
            Actions.pop({animated: false});
            Actions.botShareCompleted({text: this.text});
        } catch (e) {
            alert(e);
        }
    }

    componentWillMount() {
        if (!botStore.bot) {
            botStore.bot = botFactory.createLocation();
        }
        botStore.bot.shareMode = undefined;
        botStore.bot.shareSelect = [];
    }

    onSelect(selectedValue, option) {
        this.text = option;
        botStore.bot.shareMode = selectedValue;
        if (botStore.bot.shareMode === SHARE_SELECT) {
            statem.botShare.selectFriends();
        }
    }

    render() {
        const selectFriends = botStore.bot.shareSelect.length ?
            'People: ' + botStore.bot.shareSelect.map(profile => profile.firstName || profile.handle).join(', ') :
            'Select People';
        const options = [selectFriends], values = [SHARE_SELECT];
        if (botStore.bot.visibility === VISIBILITY_FRIENDS || botStore.bot.visibility === VISIBILITY_FOLLOWERS || botStore.bot.visibility === VISIBILITY_PUBLIC) {
            if (botStore.bot.visibility !== VISIBILITY_FRIENDS) {
                options.splice(0, 0, 'All Followers');
                values.splice(0, 0, SHARE_FOLLOWERS);
            }
            options.splice(0, 0, 'All Friends');
            values.splice(0, 0, SHARE_FRIENDS);
        }
        return <Screen>
            <View style={{paddingTop: 70 * k}}>
                <RadioButtonList options={options}
                                 values={values}
                                 selectedValue={botStore.bot.shareMode}
                                 onSelect={this.onSelect}/>

                <Card isDay={location.isDay}>
                    <Cell>
                        <View style={{flex: 1, paddingRight: 10 * k, alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput placeholder="Optional message" ref="title"
                                       placeholderTextColor='rgb(211,211,211)' value={this.message}
                                       onChangeText={text => this.message = text}
                                       maxLength={140}
                                       style={{
                                           height: 25 * k, fontFamily: 'Roboto-Regular', fontSize: 15,
                                           color: location.isDay ? navBarTextColorDay : navBarTextColorNight
                                       }}/>
                        </View></Cell>
                </Card>
            </View>
            <SaveButton
                active={(selectFriends !== 'Select People') || (!!botStore.bot.shareMode && (botStore.bot.shareMode !== SHARE_SELECT))}
                onSave={this.share} title="Share"/>
        </Screen>;

    }
}