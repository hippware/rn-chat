import React from 'react'
import Screen from '../Screen'
import {observer, inject} from 'mobx-react'
import _ from 'lodash'
import PeopleList from './PeopleList'
import {BlockableProfileItem} from './customProfileItems'

const BlockedList = inject('wocky')(
  observer(({wocky}) => (
    <Screen>
      <PeopleList
        renderItem={({item}) => <BlockableProfileItem profile={item} />}
        sections={[{key: 'blocked', data: wocky.profile.sortedBlocked}]}
        loadMore={() => {
          /**/
        }}
      />
    </Screen>
  ))
)

export default BlockedList
