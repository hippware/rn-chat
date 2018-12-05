import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText, GradientButton} from '../common'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import ModalContainer from './ModalContainer'
import {IOnceStore} from 'src/store/OnceStore'

type Props = {
  onceStore?: IOnceStore
}

const icon = require('../../../images/footOpaqueGradient.png')

@inject('onceStore')
@observer
class SharePresencePrimer extends React.Component<Props> {
  handler: any

  dismiss = () => {
    this.props.onceStore!.flip('sharePresencePrimed')
    Actions.pop()
  }

  render() {
    return (
      <ModalContainer onPress={this.dismiss}>
        <View style={styles.inner} pointerEvents="box-none">
          <Image source={icon} style={{alignSelf: 'center', marginBottom: 10}} />
          <RText style={styles.title} weight="Light" size={28} color={colors.PINK}>
            {'Know when friends\r\narrive and depart'}
          </RText>
          <RText style={styles.muted} color={colors.WARM_GREY_2} size={15} weight="Light">
            {"Invite to share each other's\r\npresence at this location!"}
          </RText>
          <View style={{marginTop: 15 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
            <GradientButton style={styles.button} isPink onPress={this.dismiss}>
              <RText color="white" size={17.5}>
                OK
              </RText>
            </GradientButton>
          </View>
        </View>
      </ModalContainer>
    )
  }
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
    lineHeight: 32 * k,
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
  buttonCancel: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  footIcon: {
    width: 23,
    height: 18,
  },
})
