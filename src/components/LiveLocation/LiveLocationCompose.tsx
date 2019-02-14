import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {RText, Separator} from '../common'
import {minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'

export default class LiveLocationCompose extends React.Component {
  render() {
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
        <View style={{height: 305 * minHeight}}>
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
              }}
            >
              Share your live location with @matt and 6 others.
            </RText>
          </View>
          <Separator style={{width: '84%', left: '8%'}} />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 13 * minHeight,
              marginTop: 20 * minHeight,
              marginHorizontal: '8%',
            }}
          >
            {/* Checkmark */}
            <Image
              style={{marginRight: 13, marginTop: 5}}
              source={require('../../../images/contactSelect.png')}
            />
            <TouchableOpacity style={{width: '60%'}}>
              <RText size={16}>For 1 hour</RText>
              <RText size={14} color={'#9b9b9b'}>
                Until 10:41 AM
              </RText>
            </TouchableOpacity>
            <View style={{position: 'absolute', flexDirection: 'row', right: 0}}>
              <TouchableOpacity>
                <Image
                  style={{marginHorizontal: 10}}
                  source={require('../../../images/decrease.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{marginHorizontal: 10}}
                  source={require('../../../images/increase.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Separator style={{width: '74%', left: 70}} />
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 13 * minHeight,
              marginHorizontal: '8%',
            }}
          >
            {/* Checkmark */}
            <Image
              style={{marginRight: 13}}
              source={require('../../../images/contactSelect.png')}
            />
            <TouchableOpacity style={{width: '80%', height: 40}}>
              <RText size={16}>Until you turn this off</RText>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{width: '100%', height: 50 * minHeight}}
          onPress={Actions.liveLocationSettings}
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
              Share Live Location For 1 Hour
            </RText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
}
