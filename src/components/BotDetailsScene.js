import React from 'react';
import BotDetails from './BotDetails';
import bot from '../store/bot';
import {observer} from 'mobx-react/native';

@observer
export default class extends React.Component {
  componentWillMount(){
    if (!bot.bot){
      bot.createLocation();
      bot.bot.title = "Hello World! fdslj sd;lgjflk dfjglkjdflkgj lkdfjglkd flkgj";
      bot.bot.description = "svjk lfjsdlkj fkljdslk fjlksdj fklskdl lkj svjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkjsvjk lfjsdlkj fkljdslk fjlksdj fklskdl lkj";
    }
  }
  render(){
    return <BotDetails {...this.props}/>
  }
}