import React from 'react';
import BotNote from './BotNote';
import autobind from 'autobind-decorator';
import { Actions } from 'react-native-router-native';
import { View } from 'react-native';
import SaveButton from './SaveButton';
import bot from '../store/botStore';

@autobind
export default class extends React.Component {
    async save(data) {
        const oldDescription = bot.bot.description;
        bot.bot.description = data;
        Actions.pop();
        if (!bot.bot.isNew) {
            bot.bot.noteSaving = true;
            try {
                await bot.save();
            } catch (e) {
                bot.bot.description = oldDescription;
                alert(e);
            } finally {
                bot.bot.noteSaving = false;
            }
        }
    }

    render() {
        return <BotNote onSave={this.save} />;
    }
}
