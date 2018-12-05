import React from 'react'
import {observer, inject} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import Bubble from '../../map/Bubble'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'
import BotIcon from 'src/components/common/BotIcon'
import {IBotCard, IHomeStore} from '../../../store/HomeStore'

type Props = {
  card: IBotCard
  homeStore?: IHomeStore
}

const BotMarker = inject('homeStore')(
  observer(({homeStore, card}: Props) => {
    const {isSelected} = card
    let bot: IBot
    // dirty workaround for #3013 (until we will not found the real case)
    try {
      bot = card.bot
    } catch {
      return null
    }
    if (!bot || !isAlive(bot) || !bot.location) {
      return null
    }
    // don't show marker for 'details' mode (when bot details page is shown)
    if (homeStore!.detailsMode && !isSelected) {
      return null
    }
    const {latitude, longitude} = bot.location
    return (
      <HackMarker
        coordinate={{latitude, longitude}}
        zIndex={isSelected ? 2000 : 1} // selected marker should be on top #2696
        onPress={card.select}
        key={card.bot.id}
        stopPropagation
      >
        <Bubble
          style={{
            backgroundColor: 'white',
          }}
          outerStyle={{
            shadowOffset: {height: 2, width: 0},
            shadowRadius: 3,
            shadowOpacity: 0.12,
          }}
          size={isSelected ? 48 : 35}
          radius={isSelected ? 8 : 5}
          textSize={isSelected ? 16 : 13}
          borderWidth={1.5}
        >
          <BotIcon icon={bot.icon} size={isSelected ? 30 : 20} />
        </Bubble>
      </HackMarker>
    )
  })
)

export default BotMarker
