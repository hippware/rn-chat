import React from 'react'
import {observer, inject} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import Bubble from '../../map/Bubble'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'
import BotIcon from 'src/components/common/BotIcon'
import {BotCard, IHomeStore} from '../../../store/HomeStore'
import {colors} from 'src/constants'

type Props = {
  card: BotCard
  homeStore?: IHomeStore
}

const BotMarker = inject('homeStore')(
  observer(({homeStore, card}: Props) => {
    const isSelected = card.id === homeStore!.selectedId
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
        onPress={() => homeStore!.select(card.id)}
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
          size={48}
          radius={8}
          textSize={16}
          borderWidth={1.5}
          triangleColor={isSelected ? colors.YELLOW : colors.PINK}
        >
          <BotIcon icon={bot.icon} size={30} />
        </Bubble>
      </HackMarker>
    )
  })
)

export default BotMarker
