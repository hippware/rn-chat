import React from 'react'
import {Image, View, Linking} from 'react-native'
import {Separator, RText, GradientButton} from './common'
import {PINK, WHITE} from '../constants/colors'

const poweredBy = require('../../images/poweredByGoogleOnWhite.png')
const rating = require('../../images/rating.png')

const Attribution = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgb(250,250,250)',
      borderTopColor: 'rgb(222,222,222)',
      borderTopWidth: 1,
      padding: 15,
    }}
  >
    <Image source={poweredBy} style={{marginLeft: 8, marginTop: 5}} />
    <Separator style={{width: '100%', backgroundColor: 'rgb(224,224,224)', marginTop: 12}} />
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <RText size={30} weight="Light" color={PINK}>
        Like the app?
      </RText>
      <Image source={rating} style={{marginVertical: 20}} />
      <GradientButton
        isPink
        style={{height: 50, width: '70%', borderRadius: 4, marginTop: 20}}
        onPress={() => {
          // Note: this won't work in a simulator
          Linking.openURL(
            'itms-apps://itunes.apple.com/us/app/id1295678402?mt=8&action=write-review'
          )
        }}
      >
        <RText color={WHITE} size={17.5}>
          Give us a rating!
        </RText>
      </GradientButton>
    </View>
  </View>
)

export default Attribution
