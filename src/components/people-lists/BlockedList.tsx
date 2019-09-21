import React from 'react'
import Screen from '../Screen'
import _ from 'lodash'
import PeopleList from './PeopleList'
import {BlockableProfileItem} from './customProfileItems'
import {useWocky} from 'src/utils/injectors'

const BlockedList = () => {
  const {profile} = useWocky()
  return (
    <Screen>
      <PeopleList
        renderItem={({item}) => <BlockableProfileItem profile={item} />}
        sections={[{key: 'blocked', data: profile!.sortedBlocked}]}
        loadMore={() => {
          /**/
        }}
      />
    </Screen>
  )
}

export default BlockedList
