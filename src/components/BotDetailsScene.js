import React from 'react';
import BotDetails from './BotDetails';
import bot from '../store/botStore';
import {observer} from 'mobx-react/native';

@observer
export default class extends React.Component {
    render() {
        return <BotDetails {...this.props}/>
    }
}