// @flow

import React from 'react'
import {TouchableOpacity} from 'react-native'
import assert from 'assert'
import ProfileItem from './ProfileItem'
import {observer} from 'mobx-react/native'

type Props = {
  row: Object
  isDay: boolean
  selection: any
  onSelect?: Function
}

const SelectableProfileItem = observer((props: Props) => {
  const {row, isDay, selection, onSelect} = props
  assert(selection, 'selection should be defined')
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switch(row))}>
      <ProfileItem
        key={row.profile.id}
        isDay={isDay}
        profile={row.profile}
        selected={onSelect ? undefined : row.selected}
      />
    </TouchableOpacity>
  )
})

export default SelectableProfileItem
