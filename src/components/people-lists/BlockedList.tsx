// @flow

import React from 'react'
import Screen from '../Screen'
import {observer, inject} from 'mobx-react/native'
import _ from 'lodash'
import PeopleList from './PeopleList'
import {BlockableProfileItem} from './customProfileItems'

const BlockedList = inject('wocky')(
  observer(({wocky}) => (
    <Screen>
      <PeopleList
        renderItem={({item}) => <BlockableProfileItem profile={item} />}
        sections={[{key: 'blocked', data: _.sortBy(wocky.blocked, 'handle')}]}
        loadMore={() => {
          /**/
        }}
      />
    </Screen>
  ))
)

export default BlockedList
