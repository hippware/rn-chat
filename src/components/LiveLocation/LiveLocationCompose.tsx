import React, {useState} from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {RText, Separator} from '../common'
import {minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {ISearchStore} from '../../store/SearchStore'
import {ILocationStore} from '../../store/LocationStore'
import {IWocky, IProfile} from 'wocky-client'
import moment from 'moment'

type Props = {
  wocky?: IWocky
  searchStore?: ISearchStore
  locationStore?: ILocationStore
  profile?: IProfile
}

const select = require('../../../images/contactSelect.png')
const unselect = require('../../../images/contactUnselect.png')
const MIN = 60 * 1000
const HOUR = 60 * MIN
const CHOICES = [
  {text: '15 minutes', value: 15 * MIN},
  {text: '30 minutes', value: 30 * MIN},
  {text: '1 hour', value: HOUR},
  {text: '2 hours', value: 2 * HOUR},
  {text: '3 hours', value: 3 * HOUR},
  {text: '4 hours', value: 4 * HOUR},
  {text: '5 hours', value: 5 * HOUR},
  {text: '6 hours', value: 6 * HOUR},
  {text: '7 hours', value: 7 * HOUR},
  {text: '8 hours', value: 8 * HOUR},
  {text: '9 hours', value: 9 * HOUR},
  {text: '10 hours', value: 10 * HOUR},
  {text: '11 hours', value: 11 * HOUR},
  {text: '12 hours', value: 12 * HOUR},
  {text: '1 day', value: 24 * HOUR},
  {text: '2 days', value: 48 * HOUR},
  {text: '3 days', value: 72 * HOUR},
]
const UNTIL_OFF = Date.now() + 24 * HOUR * 365

const LiveLocationCompose = inject('wocky', 'searchStore', 'locationStore')(
  observer(({wocky, searchStore, locationStore, profile}: Props) => {
    const [option, setOption] = useState(1)
    const [duration, setDuration] = useState(2)
    const selection = profile ? {selected: [profile]} : searchStore!.localResult

    const Checkbox = ({value, children}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => setOption(value)}
      >
        <Image style={{marginRight: 13}} source={option === value ? select : unselect} />
        <View>{children}</View>
      </TouchableOpacity>
    )

    const share = async () => {
      const expireAt = new Date(option ? UNTIL_OFF : Date.now() + CHOICES[duration].value)
      // disable invisible mode
      if (wocky!.profile!.hidden.enabled) {
        await wocky!.profile!.hide(false, undefined)
      }
      // TODO modify server-side API to pass array of usr_ids ?
      for (const el of selection.selected) {
        await el.shareLocation(expireAt)
      }
      // send location
      if (locationStore!.location) {
        await wocky!.setLocation(locationStore!.location!)
      }
      Actions.popTo('home')
    }

    const selected = selection.selected.length

    if (!selected) {
      // Abort
      Actions.popTo('home')
    }

    const untilDate =
      moment(Date.now()).format('L') === moment(Date.now() + CHOICES[duration].value).format('L')
        ? moment(Date.now() + CHOICES[duration].value).format('LT')
        : moment(Date.now() + CHOICES[duration].value).format('MMM D, LT')

    return (
      <View
        style={{
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
        <View>
          <View
            style={{alignItems: 'center', justifyContent: 'center', marginVertical: 23 * minHeight}}
          >
            <Image source={require('../../../images/LiveLocationIcon.png')} />
            <RText
              style={{
                width: '70%',
                fontFamily: 'Roboto',
                fontSize: 17,
                fontWeight: '500',
                textAlign: 'center',
                marginTop: 11,
              }}
            >
              Share your live location with @{selected > 0 ? selection.selected[0].handle : ''}
              {selected > 1 && ` and ${selected - 1} others.`}
            </RText>
          </View>
          <Separator style={{width: '84%', left: '8%'}} />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 13 * minHeight,
              marginTop: 20 * minHeight,
              marginHorizontal: '8%',
              alignItems: 'center',
            }}
          >
            <Checkbox value={0}>
              <RText size={16}>For {CHOICES[duration].text}</RText>
              <RText size={14} color={'#9b9b9b'}>
                Until {untilDate}
              </RText>
            </Checkbox>
            <View style={{position: 'absolute', flexDirection: 'row', right: 0}}>
              <TouchableOpacity
                onPress={() => {
                  setOption(0)
                  setDuration(Math.max(0, duration - 1))
                }}
              >
                <Image
                  style={{marginHorizontal: 10}}
                  source={require('../../../images/decrease.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOption(0)
                  setDuration(Math.min(duration + 1, CHOICES.length - 1))
                }}
              >
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
              marginVertical: 18 * minHeight,
              marginBottom: 30,
              marginHorizontal: '8%',
            }}
          >
            <Checkbox value={1}>
              <RText size={16}>Until you turn this off</RText>
            </Checkbox>
          </View>
        </View>
        <TouchableOpacity style={{width: '100%', height: 50 * minHeight}} onPress={share}>
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
              Share Live Location
              {option ? '' : ' For ' + CHOICES[duration].text}
            </RText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  })
)

export default LiveLocationCompose
