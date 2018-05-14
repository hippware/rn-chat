import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText} from '../common'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import ModalContainer from './ModalContainer'
import {IWocky} from 'wocky-client'

const footprint = require('../../../images/footprintWarning.png')

type Props = {
  store?: any
  wocky?: IWocky
}

@inject('store')
@observer
class FirstTimeGuestPrimer extends React.Component<Props> {
  dismiss = () => {
    this.props.store.dismissFirstTimeGuestPrimer()
    Actions.pop()
  }

  render() {
    return (
      <ModalContainer>
        <View style={styles.inner} pointerEvents="box-none">
          <Image
            source={footprint}
            style={{width: 77 * k, height: 77 * k, marginBottom: 25 * k}}
            resizeMode="contain"
          />
          <RText style={styles.text} weight="Light" size={15} color={colors.DARK_GREY}>
            {"Awesome! We'll let you know when\r\n"}
            <Text style={styles.bold}>{'you '}</Text>
            {'or'}
            <Text style={styles.bold}>{' other visitors '}</Text>
            {'are here'}
          </RText>
          <TouchableOpacity style={[styles.button]} onPress={this.dismiss}>
            <RText color="white" size={17.5}>
              OK
            </RText>
          </TouchableOpacity>
        </View>
      </ModalContainer>
    )
  }
}

export default FirstTimeGuestPrimer

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 40 * k,
    alignItems: 'center',
    borderRadius: 4
  },
  text: {
    textAlign: 'center'
  },
  bold: {
    fontFamily: 'Roboto-Medium'
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 10 * k,
    marginTop: 20 * k,
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})
