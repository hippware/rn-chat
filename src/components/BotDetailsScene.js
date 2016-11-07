import React from 'react';
import BotDetails from './BotDetails';
import bot from '../store/bot';
import {observer} from 'mobx-react/native';

@observer
export default class extends React.Component {
  componentWillMount(){
    if (!bot.bot){
      bot.createImage();
      bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '1');
      bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '2');
      bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '3');
      setTimeout(()=>bot.bot.addImage('tros:d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com/file/36d93122-a1ae-11e6-b428-0e600a8611a9', '4'), 2000);
    }
  }
  render(){
    return <BotDetails {...this.props}/>
  }
}