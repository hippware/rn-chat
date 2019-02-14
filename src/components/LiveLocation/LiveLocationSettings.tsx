import React from 'react'
import {StyleSheet, Keyboard, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import {RText, Spinner, Separator, Switch} from '../common'
import {colors} from '../../constants'
import {k, height, minHeight} from '../Global'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import EmojiSelector from 'react-native-emoji-selector'
import LinearGradient from 'react-native-linear-gradient'
import {BlurView} from 'react-native-blur'

export default class LiveLocationCompose extends React.Component<Props> {
  render() {
    let switchOn = false
    return (
      <View
        style={{
          postion: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
          shadowColor: '#0000001d',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 5,
          shadowOpacity: 1,
        }}
      >
        <View style={{height: 400 * minHeight}}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', marginVertical: 23 * minHeight}}
          >
            <Image source={require('../../../images/LiveLocationIcon.png')} />
            <RText
              style={{
                width: 255,
                fontFamily: 'Roboto',
                fontSize: 17,
                fontWeight: '500',
                textAlign: 'center',
                marginTop: 11,
                marginBottom: 11,
              }}
            >
              Sharing your live location
            </RText>
            <Switch
              isOn={switchOn}
              onColor="#FE5C6C"
              offColor="#D3D3D3"
              size="regular"
              onToggle={() => {
                switchOn = true
              }}
            />
          </View>
          <Separator />
          <View style={{marginBottom: 50}} />
          <TouchableOpacity
            style={{width: '100%', height: 50 * minHeight, bottom: 0, position: 'absolute'}}
            onPress={() => Actions.popTo('home')}
          >
            <LinearGradient
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              colors={['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                paddingVertical: 15 * minHeight,
                alignItems: 'center',
              }}
            >
              <RText color="white" size={15}>
                Select Friends
              </RText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
