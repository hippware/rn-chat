import React from 'react'
import {TouchableOpacity} from 'react-native'
import assert from 'assert'
import ProfileItem from './ProfileItem'
import {observer} from 'mobx-react/native'

type Props = {
  row: any
  selection: any
  onSelect?: any
}

const SelectableProfileItem = observer((props: Props) => {
  const {row, selection, onSelect} = props
  assert(selection, 'selection should be defined')
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switch(row))}>
      <ProfileItem
        key={row.profile.id}
        profile={row.profile}
        selected={onSelect ? undefined : row.selected}
      />
    </TouchableOpacity>
  )
})

export default SelectableProfileItem
