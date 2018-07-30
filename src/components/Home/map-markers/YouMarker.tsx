import React from 'react'
import {View, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../../store/LocationStore'
import {IHomeStore, ISelectableCard} from '../../../store/HomeStore'
import {Avatar} from '../../common'
import {colors} from '../../../constants'
import Triangle from '../../map/Triangle'

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

interface ICardProps extends IProps {
  card: ISelectableCard
}

const YouMarker = observer(({wocky, locationStore, homeStore, card}: ICardProps) => {
  const {location} = locationStore
  const {latitude, longitude} = location
  const {profile} = wocky
  return (
    profile && (
      <HackMarker
        zIndex={1000}
        coordinate={{latitude, longitude}}
        onPress={() => {
          card.select()
          homeStore.setFocusedBotLocation(location)
        }}
        stopPropagation
      >
        {!profile.avatar && !profile.hidden.enabled ? (
          <Image source={require('../../../../images/you.png')} />
        ) : (
          <View style={{alignItems: 'center'}}>
            <Avatar size={52} profile={profile} hideDot borderColor={colors.PINK} />
            <Triangle
              width={10}
              height={4}
              color={profile.hidden.enabled ? colors.DARK_GREY : colors.PINK}
              direction="down"
            />
          </View>
        )}
      </HackMarker>
    )
  )
})

export default YouMarker
