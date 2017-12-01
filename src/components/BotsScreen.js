// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {Text, StyleSheet} from 'react-native';
import {k} from './Global';
import Screen from './Screen';
import BotButton from './BotButton';
import Bots from './BotListView';
import location from '../store/locationStore';

import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {colors} from '../constants';

type Props = {
  filter: string,
};

const routes = [{key: 'all', title: 'Saved Bots'}, {key: 'own', title: 'My Bots'}];

@observer
class BotScreen extends React.Component<Props> {
  @observable index: number = 0;

  _handleChangeTab = i => (this.index = i);

  _renderHeader = props => (
    <TabBar
      style={{backgroundColor: 'white'}}
      tabStyle={{height: 54 * k}}
      renderLabel={({route}) => {
        const selected = routes[this.index].key === route.key;
        return <Text style={selected ? styles.selectedText : styles.text}>{route.title}</Text>;
      }}
      indicatorStyle={styles.indicator}
      {...props}
    />
  );

  _renderScene = props => <Bots key={props.route.key} filter={props.route.key} />;

  render() {
    return (
      <Screen isDay={location.isDay}>
        <TabViewAnimated navigationState={{index: this.index, routes}} renderScene={this._renderScene} renderHeader={this._renderHeader} onIndexChange={this._handleChangeTab} />
        <BotButton />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
  selectedText: {
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Medium',
    fontSize: 16 * k,
    letterSpacing: 0.5,
  },
  indicator: {
    backgroundColor: colors.PINK,
    position: 'absolute',
    left: 15 * k,
    bottom: 0,
    width: 155 * k,
    height: 3 * k,
  },
});

export default BotScreen;
