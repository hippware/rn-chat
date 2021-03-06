import {types} from 'mobx-state-tree'
import {Profile, IProfile} from 'src/wocky'

const SelectableProfile = types.model({
  profile: types.reference(Profile),
  selected: false,
})

type ISelectableProfile = typeof SelectableProfile.Type

const SelectableProfileList = types
  .model('SelectableProfileList', {
    list: types.optional(types.array(SelectableProfile), []),
    filter: '',
    multiSelect: true,
    selection: types.optional(types.map(types.boolean), {}),
  })
  .views(self => ({
    get selected(): IProfile[] {
      return self.list.filter(el => el.selected).map(el => el.profile)
    },

    get allSelected(): boolean {
      return self.list.filter(el => el.selected).length === self.list.length
    },

    get filteredList(): ISelectableProfile[] {
      return self.list.filter(el => {
        const {isOwn, firstName, lastName, handle} = el.profile
        return (
          !isOwn &&
          (!self.filter ||
            (firstName &&
              firstName.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())) ||
            (lastName &&
              lastName.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())) ||
            (handle && handle.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())))
        )
      })
    },
  }))
  .actions(self => ({
    deselectAll: () => {
      self.list.forEach(el => {
        el.selected = false
      })
    },
  }))
  .actions(self => {
    function setList(list: any[]) {
      self.list.replace(list)
    }

    function setFilter(text: string) {
      self.filter = text
    }

    function replace(list: IProfile[]): void {
      self.list.forEach(p => self.selection.set(p.profile.id, p.selected))
      self.list.replace(
        list.map(el =>
          SelectableProfile.create({profile: el.id, selected: self.selection.has(el.id)})
        )
      )
    }

    function clear(): void {
      self.list.splice(0)
      self.selection.clear()
    }

    function selectAll() {
      self.list.forEach(el => {
        el.selected = true
      })
    }

    function switchRowSelected(row: ISelectableProfile) {
      if (!self.multiSelect) {
        self.deselectAll()
      }
      row.selected = !row.selected
    }

    return {selectAll, switchRowSelected, replace, clear, setFilter, setList}
  })

export default SelectableProfileList
export type ISelectableProfileList = typeof SelectableProfile.Type
