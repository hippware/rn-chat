import React from 'react'
import Card from '../Card'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'
// import EventBotCard from './EventBotCard'
import EventBotShareCard from './EventBotShareCard'
// import EventBotNoteCard from './EventBotNoteCard'
import EventBotPostCard from './EventBotPostCard'
import {getType, isAlive} from 'mobx-state-tree'
import {IEvent} from 'wocky-client'
import EventBotGeofenceCard from './EventBotGeofenceCard'
import EventUserFollowCard from './EventUserFollowCard'

type Props = {
  item: IEvent
  log?: any
}

const eventCardMap: {[key: string]: any} = {
  // EventBotCreate: EventBotCard,
  EventBotPost: EventBotPostCard,
  EventBotShare: EventBotShareCard,
  // EventBotNote: EventBotNoteCard,
  EventBotGeofence: EventBotGeofenceCard,
  EventUserFollow: EventUserFollowCard,
}

@inject('log')
@observer
class EventCard extends React.Component<Props> {
  card: any
  CardClass: any

  constructor(props: Props) {
    super(props)
    this.CardClass = eventCardMap[getType(this.props.item).name]
    // console.log('& name', getType(this.props.item).name, this.CardClass)
  }

  onCardPress = () => {
    if (this.card.onPress) this.card.onPress()
  }

  setCardRef = (r: any) => (this.card = r)

  render() {
    // const row = this.props.item
    const {CardClass} = this
    // let profile
    // try {
    //   if (!row || !isAlive(row)) return null
    //   // TODO: deleted bot throws an error here trying to generate a profile from a bad id
    //   profile = row.target
    //   if (!profile || !profile.id) {
    //     return null
    //   }
    // } catch (err) {
    //   this.props.log('TODO: fix bot delete after server-side changes', err)
    //   return null
    // }

    return (
      <Card
        key={this.props.item.id}
        onPress={this.onCardPress}
        style={{
          paddingTop: 10 * k,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}
      >
        <CardClass ref={this.setCardRef} item={this.props.item} />
      </Card>
    )
  }
}

export default EventCard
