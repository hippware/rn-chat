import React from 'react'
import Card from '../Card'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'
import EventBotCard from './EventBotCard'
import EventBotShareCard from './EventBotShareCard'
import EventBotNoteCard from './EventBotNoteCard'
import EventBotPostCard from './EventBotPostCard'
import {getType, isAlive} from 'mobx-state-tree'
import {IEventBot} from 'wocky-client'

type Props = {
  item: IEventBot
}

const eventCardMap = {
  EventBotCreate: EventBotCard,
  EventBotPost: EventBotPostCard,
  EventBotShare: EventBotShareCard,
  EventBotNote: EventBotNoteCard,
}
@inject('log')
@observer
class EventCard extends React.Component<Props> {
  card: any

  onCardPress = () => {
    if (this.card.onPress) this.card.onPress()
  }

  setCardRef = (r: any) => (this.card = r)

  render() {
    const row = this.props.item
    let profile
    let CardClass
    try {
      if (!row || !isAlive(row)) return null
      CardClass = eventCardMap[getType(row).name]
      // TODO: deleted bot throws an error here trying to generate a profile from a bad id
      profile = row.target
      if (!profile || !profile.id) {
        return null
      }
    } catch (err) {
      this.props.log('TODO: fix bot delete after server-side changes', err)
      return null
    }

    return (
      CardClass && (
        <Card
          key={row.id}
          onPress={this.onCardPress}
          style={{
            paddingTop: 10 * k,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
          }}
        >
          <CardClass ref={this.setCardRef} item={row} />
        </Card>
      )
    )
  }
}

export default EventCard
