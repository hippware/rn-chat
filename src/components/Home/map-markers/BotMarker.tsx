import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import Bubble from '../../map/Bubble'
import {colors} from '../../../constants'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'

// interface ICardProps extends IProps {
//   card: ISelectableCard
// }

const defaultIcon = require('../../../../images/mapIcons/question.png')

const BotMarker = inject('homeStore')(
  observer(({homeStore, card}) => {
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
    if (homeStore.detailsMode && !isSelected) {
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
          image={!bot.icon && defaultIcon}
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
        >
          {bot.icon && <Text style={styles.icon}>{bot.icon}</Text>}
        </Bubble>
      </HackMarker>
    )
  })
)

export default BotMarker

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'fontello',
    fontSize: 20,
    color: colors.PINK,
  },
})
