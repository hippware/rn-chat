// @flow

import React from 'react';
import Card from '../Card';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import location from '../../store/locationStore';
import Event from '../../model/Event';

type Props = {
  item: any,
};

@observer
export default class EventCard extends React.Component {
  props: Props;
  card: any;

  render() {
    const isDay = location.isDay;
    const row = this.props.item;
    const event: Event = row.event;
    const CardClass = event.presenterClass();
    const profile = row.event.target;
    if (!profile || !profile.id) {
      return null;
    }
    return (
      <Card
        key={row.event.id}
        isDay={isDay}
        onPress={() => !event.isPendingDelete && this.card.onPress && this.card.onPress()}
        style={{
          paddingTop: 10 * k,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}
      >
        <CardClass ref={r => (this.card = r)} item={event} />
      </Card>
    );
  }
}
