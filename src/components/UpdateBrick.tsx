import React, {useEffect} from 'react'
import {View, Image, TouchableOpacity, Linking} from 'react-native'
import codePush from 'react-native-code-push'
import RText from './common/RText'
import {PINK, DARK_GREY, WHITE} from '../constants/colors'

const background = require('../../images/codepushBackground.png')
const icon = require('../../images/codePushIcon.png')

const UpdateBrick = ({waiting}: {waiting?: boolean}) => {
  useEffect(() => {
    codePush.notifyAppReady()
  }, [])

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={background}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />

      <Image source={icon} />

      <RText
        style={{marginVertical: 30, textAlign: 'center'}}
        color={PINK}
        size={30}
        weight="Light"
      >
        {waiting ? 'Just a moment.' : `New Update\r\nAvailable!`}
      </RText>

      <RText color={DARK_GREY} size={18} weight="Light" style={{textAlign: 'center'}}>
        {waiting
          ? `We’re busy improving things,\r\nback soon!!`
          : `Please visit the app store to\r\nupdate the app.`}
      </RText>

      {!waiting && (
        <TouchableOpacity
          style={{
            height: 46,
            width: '90%',
            backgroundColor: PINK,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            borderRadius: 4,
          }}
          onPress={() =>
            Linking.openURL(
              'itms-apps://itunes.apple.com/us/app/id1295678402?mt=8&action=write-review'
            )
          }
        >
          <RText size={18} color={WHITE}>
            Update
          </RText>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default UpdateBrick
