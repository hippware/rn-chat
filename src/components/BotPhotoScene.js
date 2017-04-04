import React from 'react';
import BotPhoto from './BotPhoto';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-native';
import {View} from 'react-native';
import SaveButton from './SaveButton';
import bot from '../store/botStore';

@autobind
export default class extends React.Component {
    save() {
        Actions.pop();
    }

    render() {
        return <BotPhoto {...this.props} onSave={this.save}/>;
    }
}