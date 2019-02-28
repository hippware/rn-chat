import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {RText, Separator} from '../common'
import {minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import {observer, inject} from 'mobx-react/native'
import {ISearchStore} from '../../store/SearchStore'
import {ILocationStore} from '../../store/LocationStore'
import {IWocky} from 'wocky-client'
import moment from 'moment'

type Props = {
  wocky?: IWocky
  searchStore?: ISearchStore
  locationStore?: ILocationStore
}

type State = {
  option: number
  duration: number
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

@inject('wocky', 'searchStore', 'locationStore')
@observer
export default class LiveLocationCompose extends React.Component<Props, State> {
  Checkbox = ({value, children}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => this.setState({option: value})}
    >
      <Image style={{marginRight: 13}} source={this.state.option === value ? select : unselect} />
      <View>{children}</View>
    </TouchableOpacity>
  )
  state = {
    option: 0,
    duration: 2,
  }
  share = async () => {
    const {locationStore, searchStore, wocky} = this.props
    const selection = searchStore!.localResult
    const expireAt = new Date(
      this.state.option ? UNTIL_OFF : Date.now() + CHOICES[this.state.duration].value
    )
    // TODO modify server-side API to pass array of usr_ids ?
    for (const profile of selection.selected) {
      await profile.shareLocation(expireAt)
    }
    // send location
    if (locationStore!.location) {
      await wocky!.setLocation(locationStore!.location!)
    }
    Actions.popTo('home')
  }
  render() {
    const selection = this.props.searchStore!.localResult
    const selected = selection.selected.length
    if (!selected) {
      throw new Error('No profile is selected') // it should never happen
    }
    const untilDate =
      moment(Date.now()).format('L') ===
      moment(Date.now() + CHOICES[this.state.duration].value).format('L')
        ? moment(Date.now() + CHOICES[this.state.duration].value).format('LT')
        : moment(Date.now() + CHOICES[this.state.duration].value).format('MMM D, LT')
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
              Share your live location with @{selection.selected[0].handle}
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
            <this.Checkbox value={0}>
              <RText size={16}>For {CHOICES[this.state.duration].text}</RText>
              <RText size={14} color={'#9b9b9b'}>
                Until {untilDate}
              </RText>
            </this.Checkbox>
            <View style={{position: 'absolute', flexDirection: 'row', right: 0}}>
              <TouchableOpacity
                onPress={() => this.setState({duration: Math.max(0, this.state.duration - 1)})}
              >
                <Image
                  style={{marginHorizontal: 10}}
                  source={require('../../../images/decrease.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({duration: Math.min(this.state.duration + 1, CHOICES.length - 1)})
                }
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
            <this.Checkbox value={1}>
              <RText size={16}>Until you turn this off</RText>
            </this.Checkbox>
          </View>
        </View>
        <TouchableOpacity style={{width: '100%', height: 50 * minHeight}} onPress={this.share}>
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
              {this.state.option ? '' : ' For ' + CHOICES[this.state.duration].text}
            </RText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
}
