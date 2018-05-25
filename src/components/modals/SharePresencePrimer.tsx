// @flow

import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText} from '../common'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import ModalContainer from './ModalContainer'

type Props = {
  store?: any
}

@inject('store')
@observer
class SharePresencePrimer extends React.Component<Props> {
  handler: any

  dismiss = () => {
    this.props.store.dismissSharePresencePrimer()
    Actions.pop()
  }

  render() {
    return (
      <ModalContainer onPress={this.dismiss}>
        <View style={styles.inner} pointerEvents="box-none">
          <RText style={styles.title} weight="Light" size={30} color={colors.PINK}>
            {'Who do you\r\nwant to share\r\npresence with?'}
          </RText>
          <RText style={styles.muted} color={colors.WARM_GREY_2} size={15}>
            Once they tap the
            <Image source={footprint} style={styles.footIcon} resizeMode="contain" />
            {"button, we'll let you know when they are here."}
          </RText>
          <View style={{marginTop: 25 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
            <TouchableOpacity style={styles.button} onPress={this.dismiss}>
              <RText color="white" size={17.5}>
                OK
              </RText>
            </TouchableOpacity>
          </View>
        </View>
      </ModalContainer>
    )
  }
}

export default SharePresencePrimer

const footprint = require('../../../images/footOpaquePink.png')

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 40 * k,
  },
  title: {
    marginVertical: 15 * k,
    lineHeight: 32 * k,
    textAlign: 'center',
  },
  muted: {
    marginTop: 10 * k,
    textAlign: 'center',
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
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
