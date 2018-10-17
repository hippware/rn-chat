import React from 'react'
import {View, Image, TouchableOpacity, Linking} from 'react-native'
import codePush from 'react-native-code-push'
import RText from './common/RText'
import {PINK, DARK_GREY, WHITE} from '../constants/colors'

const background = require('../../images/codepushBackground.png')
const icon = require('../../images/codePushIcon.png')

export default class UpdateBrick extends React.Component<{}> {
  componentWillMount() {
    codePush.notifyAppReady()
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={background}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          resizeMode="cover"
        />

        <Image source={icon} />

        <RText
          style={{marginVertical: 30, textAlign: 'center'}}
          color={PINK}
          size={30}
          weight="Light"
        >{`New Update\r\nAvailable!`}</RText>

        <RText
          color={DARK_GREY}
          size={18}
          weight="Light"
          style={{textAlign: 'center'}}
        >{`Please visit the app store to\r\nupdate the app.`}</RText>

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
      </View>
    )
  }
}
