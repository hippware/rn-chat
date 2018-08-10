import React from 'react'
import {View} from 'react-native'
import {isAlive} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {k} from './Global'
import {IWocky} from 'wocky-client'
import {RText, DraggablePopupList} from './common'

type Props = {
  wocky?: IWocky
}

const data = [1, 2, 3, 4, 5, 6, 7, 8]

const Notifications = inject('wocky')(
  observer(({wocky}: Props) => {
    const {profile} = wocky
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <DraggablePopupList
        headerInner={
          <RText size={16} style={{marginBottom: 20 * k}}>
            Updates
          </RText>
        }
        data={data}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white', height: 100, paddingHorizontal: 20 * k}}>
            <RText size={20}>{item.toString()}</RText>
          </View>
        )}
        keyExtractor={item => item.toString()}
      />
    )
  })
)

export default Notifications
