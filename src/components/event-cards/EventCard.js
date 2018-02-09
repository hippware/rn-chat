// @flow

import React from 'react';
import Card from '../Card';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import EventBotCard from './EventBotCard';
import EventBotShareCard from './EventBotShareCard';
import EventBotNoteCard from './EventBotNoteCard';
import EventBotPostCard from './EventBotPostCard';
import {getType, isAlive} from 'mobx-state-tree';

type Props = {
  item: any,
};

const eventCardMap = {
  EventBotCreate: EventBotCard,
  EventBotPost: EventBotPostCard,
  EventBotShare: EventBotShareCard,
  EventBotNote: EventBotNoteCard,
};
@observer
export default class EventCard extends React.Component {
  props: Props;
  card: any;

  render() {
    const row = this.props.item;
    if (!isAlive(row)) {
      return null;
    }
    const CardClass = eventCardMap[getType(row).name];
    let profile;
    try {
      // TODO: deleted bot throws an error here trying to generate a profile from a bad id
      profile = row.target;
      if (!profile || !profile.id) {
        return null;
      }
    } catch (err) {
      console.log('TODO: fix bot delete', err);
      return null;
    }

    return (
      <Card
        key={row.id}
        onPress={() => this.card.onPress && this.card.onPress()}
        style={{
          paddingTop: 10 * k,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}
      >
        <CardClass ref={r => (this.card = r)} item={row} />
      </Card>
    );
  }
}
