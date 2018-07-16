import React from 'react'
import {View, StyleSheet} from 'react-native'
import {RText, Avatar} from '../common'
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
  observer(
    ({wocky}: Props) =>
      wocky.profile &&
      wocky.profile.handle && (
        <Card onPress={() => Actions.profileDetails({item: wocky.profile.id})}>
          <View style={styles.imageContainer}>
            <Avatar
              profile={wocky.profile}
              size={47}
              hideDot
              borderColor={colors.PINK}
              fontSize="large"
              tappable={false}
              style={styles.avatar}
            />
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
      )
  )
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
