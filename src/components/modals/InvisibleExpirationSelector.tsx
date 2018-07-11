import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText} from '../common'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import ModalContainer from './ModalContainer'
import {IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

type ButtonProps = {
  onPress: any
  style?: any
  text: string
}
const ExpireButton = ({onPress, text, style}: ButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <RText color={colors.PINK} size={17.5}>
      {text}
    </RText>
  </TouchableOpacity>
)

@inject('wocky')
@observer
export default class InvisibleExpirationSelector extends React.Component<Props> {
  dismiss = () => {
    Actions.pop()
  }

  // closure that returns onPress function to hide user and set expire date
  expire = (hours?: number) => () => {
    const date = hours ? new Date(Date.now() + hours * 3600 * 1000) : null
    const {profile} = this.props.wocky
    profile.hide(true, date)
    this.dismiss()
  }

  render() {
    return (
      <ModalContainer onPress={this.dismiss}>
        <View style={styles.inner} pointerEvents="box-none">
          <Image
            source={require('../../../images/invisibleIcon.png')}
            style={{width: 52, height: 52, marginBottom: 25 * k}}
            resizeMode="contain"
          />
          <RText style={styles.text} weight="Light" size={15} color={colors.DARK_GREY}>
            {'Are you sure you want to go '}
            <Text style={styles.bold}>{'invisible'}</Text>
            {'?\r\nYou will stop seeing visits to your favorite locations.'}
          </RText>
          <ExpireButton onPress={this.expire(3)} text="3 hours" />
          <ExpireButton onPress={this.expire(24)} text="24 hours" />
          <ExpireButton onPress={this.expire()} text="Stay Invisible" />
          <ExpireButton onPress={this.dismiss} style={{borderWidth: 0}} text="Cancel" />
        </View>
      </ModalContainer>
    )
  }
}

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 25 * k,
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Roboto-Medium',
  },
  button: {
    height: 50 * k,
    borderWidth: 1,
    borderRadius: 5 * k,
    backgroundColor: colors.WHITE,
    borderColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 10 * k,
    marginTop: 20 * k,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
})
