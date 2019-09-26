import React from 'react'
import Screen from '../Screen'
import _ from 'lodash'
import PeopleList from './PeopleList'
import {BlockableProfileItem} from './customProfileItems'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const BlockedList = observer(() => {
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
})

export default BlockedList
