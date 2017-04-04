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
    VISIBILITY_FRIENDS,
    VISIBILITY_FOLLOWERS,
    VISIBILITY_OWNER,
    VISIBILITY_PUBLIC,
    VISIBILITY_WHITELIST
} from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/botFactory';
import botStore from '../store/botStore';
import {k} from './Global';
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
export default class BotVisibility extends React.Component {
    options = ['Only Me', 'Select Friends', 'All Friends', 'All Friends & Followers', 'Everyone'];
    values = [VISIBILITY_OWNER, VISIBILITY_WHITELIST, VISIBILITY_FRIENDS, VISIBILITY_FOLLOWERS, VISIBILITY_PUBLIC];

    async save() {
        botStore.bot.visibilityShown = true;
        Actions.pop();
    }

    onSelect(selectedValue) {
        botStore.bot.visibility = selectedValue;
        if (botStore.bot.visibility === VISIBILITY_WHITELIST) {
            statem.botVisibility.selectFriends();
        }
    }

    render() {
        if (!botStore.bot) {
            return null;
        }
        const selectFriends = botStore.bot.affiliates.length ?
            'Friends: ' + botStore.bot.affiliates.map(profile => profile.firstName || profile.handle).join(', ') :
            'Select Friends';
        this.options[1] = selectFriends;
        return <Screen>
            <View style={{paddingTop: 70 * k}}>
                <RadioButtonList options={this.options}
                                 values={this.values}
                                 selectedValue={botStore.bot.visibility}
                                 onSelect={this.onSelect}/>
            </View>
            <SaveButton onSave={this.save}/>
        </Screen>;

    }
}