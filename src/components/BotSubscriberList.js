import React, {Component} from 'react';

import {View, ListView, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import CardList from './CardList';
import ProfileItem from './ProfileItem';
import Separator from './Separator';
import location from '../store/locationStore';
import botStore from '../store/botStore';
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import botFactory from '../factory/botFactory';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

@autobind
@observer
export default class extends Component {
  componentWillMount() {
    const bot = botFactory.create({id: this.props.item});
    botStore.loadSubscribers(bot);
  }

  render() {
    const bot = botFactory.create({id: this.props.item});
    const subscribers = bot.subscribers.map(x => x).filter(x => x);
    const dataSource = ds.cloneWithRows(subscribers);
    return (
      <Screen style={{paddingTop: 70 * k}}>
        <CardList
            isDay={location.isDay}
            keyboardShouldPersistTaps='always'
            enableEmptySections
            dataSource={dataSource}
            renderSeparator={(s, r) => <Separator key={r} width={1} />}
            renderRow={row => (
            <TouchableOpacity onPress={() => Actions.profileDetails({item: row.user})}>
              <ProfileItem key={row.user + 'row'} isDay={location.isDay} profile={row} />
            </TouchableOpacity>
          )}
        />
      </Screen>
    );
  }
}
