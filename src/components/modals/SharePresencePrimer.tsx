import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText, GradientButton} from '../common'
import {Actions} from 'react-native-router-flux'
import ModalContainer from './ModalContainer'
import {useWocky} from 'src/utils/injectors'

const icon = require('../../../images/footOpaqueGradient.png')

const SharePresencePrimer = () => {
  const {profile} = useWocky()
  const dismiss = () => {
    profile!.clientData.flip('sharePresencePrimed')
    Actions.pop()
  }

  return (
    <ModalContainer onPress={dismiss}>
      <View style={styles.inner} pointerEvents="box-none">
        <Image source={icon} style={{alignSelf: 'center', marginBottom: 10}} />
        <RText style={styles.title} weight="Light" size={28} color={colors.PINK}>
          {'Know when friends arrive and depart'}
        </RText>
        <RText style={styles.muted} color={colors.WARM_GREY_2} size={15} weight="Light">
          {"Invite to share each other's\r\npresence at this location!"}
        </RText>
        <View style={{marginTop: 15 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
          <GradientButton style={styles.button} isPink onPress={dismiss}>
            <RText color="white" size={17.5}>
              OK
            </RText>
          </GradientButton>
        </View>
      </View>
    </ModalContainer>
  )
}

export default SharePresencePrimer

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 30 * k,
    borderRadius: 4,
  },
  title: {
    marginVertical: 15 * k,
    lineHeight: 36,
    textAlign: 'center',
  },
  muted: {
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    alignItems: 'center',
    margin: 10 * k,
    justifyContent: 'center',
  },
})
