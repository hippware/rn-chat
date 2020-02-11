import React from 'react'
import HackMarker from '../../map/HackMarker'
import Bubble from '../../map/Bubble'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'
import BotIcon from 'src/components/common/BotIcon'
import {colors} from 'src/constants'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'

type Props = {
  bot: IBot
}

const BotMarker = observer(({bot}: Props) => {
  const {selectedId, detailsMode, select} = useHomeStore()
  if (!bot || !isAlive(bot) || !bot.location) {
    return null
  }
  const isSelected = bot.id === selectedId
  // don't show marker for 'details' mode (when bot details page is shown)
  if (detailsMode && !isSelected) {
    return null
  }
  const {latitude, longitude} = bot.location
  return (
    <HackMarker
      coordinate={{latitude, longitude}}
      zIndex={isSelected ? 2000 : 1} // selected marker should be on top #2696
      onPress={() => {
        select(bot.id)
        Actions.botDetails({botId: bot.id, preview: true})
      }}
      key={bot.id}
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

export default BotMarker
