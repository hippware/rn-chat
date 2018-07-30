import React from 'react'
import {observer} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import Bubble from '../../map/Bubble'

// interface ICardProps extends IProps {
//   card: ISelectableCard
// }

const defaultIcon = require('../../../../images/mapIcons/question.png')

const BotMarker = observer(({card}) => {
  const {bot, isSelected} = card
  const {latitude, longitude} = bot.location
  return (
    <HackMarker
      coordinate={{latitude, longitude}}
      zIndex={isSelected ? 500 : 1}
      onPress={card.select}
      key={card.bot.id}
      stopPropagation
    >
      <Bubble
        image={defaultIcon}
        style={{
          backgroundColor: 'white',
        }}
        outerStyle={{
          shadowOffset: {height: 2, width: 0},
          shadowRadius: 3,
          shadowOpacity: 0.12,
        }}
        imageStyle={{width: 20, height: 20}}
        size={isSelected ? 48 : 35}
      />
    </HackMarker>
  )
})

export default BotMarker
