import React from 'react';
import {StyleSheet} from 'react-native';
import Card from './Card';
import {k} from '../globals';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import BotCardInner from './BotCardInner';

type Props = {
  item: Bot,
  hideAvatar: ?boolean,
  onPress: Function
};

const BotCard = (props: Props) => {
  const {item, onPress} = props;
  const isDay = location.isDay;
  return (
    <Card style={styles.card} isDay={isDay} onPress={() => onPress(item)} innerStyle={styles.inner}>
      <BotCardInner {...props} />
    </Card>
  );
};

export default observer(BotCard);

const styles = StyleSheet.create({
  card: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 1,
    paddingBottom: 5 * k,
  },
  inner: {
    paddingTop: 0 * k,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0 * k,
    height: 120 * k,
  },
});
