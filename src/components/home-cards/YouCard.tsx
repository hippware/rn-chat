import React from 'react'
import {View, StyleSheet} from 'react-native'
import {RText, Avatar} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'
import {inject, observer} from 'mobx-react/native'
import {IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

const YouCard = inject('wocky')(
  observer(({wocky}: Props) => (
    <Card>
      <View style={styles.imageContainer}>
        <Avatar profile={wocky.profile} size={47} hideDot />
      </View>
      <View style={styles.textContainer}>
        <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={1}>
          {`@${wocky.profile.handle}`}
        </RText>
        <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
          {`${wocky.profile.ownBots.length} spots • ${wocky.profile.followersSize} followers`}
        </RText>
      </View>
    </Card>
  ))
)

export default YouCard

const styles = StyleSheet.create({
  icon: {
    // flex: 1,
    height: 44 * k,
    width: 44 * k,
  },
  textContainer: {
    flex: 2,
    padding: 18 * k,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
