// @flow

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import assert from 'assert'
import CardList from '../CardList'
import {k} from '../Global'
import ProfileItem from './ProfileItem'
import {observer} from 'mobx-react/native'
import {RText, Separator} from '../common'

type Props = {
  selection: any // TODO change to ISelectableProfileList
  onSelect?: (profile: any) => void
  renderItem?: (obj: any) => React.ReactElement<any>
}

@observer
class ProfileList extends React.Component<Props> {
  keyExtractor = (item: any) => item.profile.id

  renderI = ({item}: {item: any}) => <SelectableProfileItem row={item} {...this.props} />

  separator = () => <Separator />

  render() {
    const {selection, renderItem} = this.props
    return selection.filteredList.length ? (
      <View style={{flex: 1}}>
        <CardList
          keyboardShouldPersistTaps="handled"
          data={selection.filteredList}
          ItemSeparatorComponent={this.separator}
          renderItem={renderItem || this.renderI}
          keyExtractor={this.keyExtractor}
          {...this.props}
        />
      </View>
    ) : (
      <RText
        size={15}
        color="rgb(185,185,185)"
        style={{paddingTop: 200 * k, textAlign: 'center', backgroundColor: 'transparent'}}
      >
        No search results
      </RText>
    )
  }
}

export default ProfileList

const SelectableProfileItem = observer(props => {
  const {row, selection, onSelect} = props
  assert(selection, 'selection should be defined')
  return (
    <TouchableOpacity
      // tslint:disable-next-line
      onPress={() => (onSelect ? onSelect(row.profile) : selection.switchRowSelected(row))}
    >
      <ProfileItem
        key={row.profile.id}
        profile={row.profile}
        selected={onSelect ? undefined : row.selected}
      />
    </TouchableOpacity>
  )
})
