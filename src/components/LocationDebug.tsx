import React from 'react'
import {TouchableOpacity} from 'react-native'
import {inject, observer} from 'mobx-react'

import {ILocationStore} from '../store/LocationStore'
import Screen from './Screen'
import _ from 'lodash'
import {IWocky} from 'wocky-client'
import {RText} from './common'
import {colors} from '../constants'

type Props = {
  locationStore?: ILocationStore
  wocky?: IWocky
}

@inject('locationStore', 'wocky')
@observer
export default class LocationDebug extends React.Component<Props> {
  render() {
    return (
      <Screen style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
        <TouchableOpacity
          // Calling emailLog with empty string seems to work
          onPress={() => {
            this.props.locationStore!.emailLog('')
          }}
          style={{
            backgroundColor: colors.PINK,
            padding: 5,
            borderRadius: 2,
            marginTop: 20,
            width: 120,
            alignItems: 'center',
          }}
        >
          <RText size={20} color={colors.WHITE}>
            Email log
          </RText>
        </TouchableOpacity>
      </Screen>
    )
  }
}
