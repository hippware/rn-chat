import React from 'react'
import {View, StyleSheet} from 'react-native'
import {RText, Avatar, Pill} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'
import {inject, observer} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'

type Props = {
  wocky?: IWocky
}

const YouCard = inject('wocky')(
  observer(({wocky}: Props) => {
    if (!wocky!.profile || !wocky!.profile!.handle) {
      return null
    }
    return (
      <Card onPress={() => Actions.profileDetails({item: wocky!.profile!.id})}>
        <View style={styles.imageContainer}>
          <Avatar
            profile={wocky!.profile!}
            size={47}
            hideDot
            borderColor={colors.PINK}
            fontSize="large"
            fontFamily="regular"
            tappable={false}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textContainer}>
          <RText
            size={17}
            weight="Bold"
            color={colors.DARK_PURPLE}
            numberOfLines={1}
            style={{paddingBottom: 3}}
          >
            {`@${wocky!.profile!.handle}`}
          </RText>
          <Pill>
            {wocky!.profile!.botsSize} Location{wocky!.profile!.botsSize !== 1 && 's'}
          </Pill>
        </View>
      </Card>
    )
  })
)
export default YouCard

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingVertical: 18 * k,
    justifyContent: 'center',
  },
  avatar: {
    marginLeft: 22 * k,
    marginRight: 15 * k,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
