// @flow

import {types} from 'mobx-state-tree';
import {Profile} from 'wocky-client';

const SelectableProfile = types.model({
  profile: types.reference(Profile),
  selected: false,
});

const SelectableProfileList = types
  .model('SelectableProfileList', {
    list: types.optional(types.array(SelectableProfile), []),
    filter: '',
    multiSelect: true,
    selection: types.optional(types.array(SelectableProfile), []),
  })
  .views(self => ({
    get selected(): Profile[] {
      return self.list.filter(el => el.selected).map(el => el.profile);
    },

    get allSelected(): boolean {
      return self.list.filter(el => el.selected).length === self.list.length;
    },

    get filteredList(): SelectableProfile[] {
      return self.list.length ? self.list.filter(self._filterFn) : [];
    },
  }))
  .actions((self) => {
    function _filterFn(el) {
      const {isOwn, firstName, lastName, handle} = el.profile;
      return (
        !isOwn &&
        (!self.filter ||
          (firstName && firstName.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())) ||
          (lastName && lastName.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())) ||
          (handle && handle.toLocaleLowerCase().startsWith(self.filter.toLocaleLowerCase())))
      );
    }

    function setList(list: Array<any>) {
      self.list.replace(list);
    }

    function setFilter(text: string) {
      self.filter = text;
    }

    function replace(list: Profile[]): void {
      self.list.forEach(p => (self.selection[p.profile.id] = p.selected));
      self.list.replace(list.map(el => SelectableProfile.create({profile: el, selected: self.selection[el.id]})));
    }

    function clear(): void {
      self.list.splice(0);
      // self.selection = {};
    }

    function deselectAll() {
      self.list.forEach((el) => {
        el.selected = false;
      });
    }

    function selectAll() {
      self.list.forEach((el) => {
        el.selected = true;
      });
    }

    function switchRowSelected(row: SelectableProfile) {
      !self.multiSelect && self.deselectAll();
      row.selected = !row.selected;
    }

    return {selectAll, deselectAll, switchRowSelected, replace, clear, _filterFn, setFilter, setList};
  });

export default SelectableProfileList;
