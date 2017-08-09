// @flow

import SelectableProfile from './SelectableProfile';
import Profile from './Profile';
import {action, autorun, reaction, computed, observable} from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class SelectableProfileList {
  original: Profile[] = [];
  @observable list: SelectableProfile[] = [];
  @observable filter: string = '';
  multiSelect: boolean = true;
  selection = {};

  @computed
  get selected() {
    return this.list.filter(el => el.selected).map(el => el.profile);
  }

  @computed
  get allSelected() {
    return this.list.filter(el => el.selected).length === this.list.length;
  }

  constructor(list: [Profile], multiSelect: boolean = true) {
    if (list) {
      this.replace(list);
      this.original = list;
    }
    this.multiSelect = multiSelect;

    reaction(
      () => this.filter,
      (text) => {
        this.replace(
          this.original.filter((el) => {
            return (
              !el.isOwn &&
              (!text ||
                (el.firstName && el.firstName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())) ||
                (el.lastName && el.lastName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())) ||
                (el.handle && el.handle.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())))
            );
          }),
        );
      },
    );
  }

  @action
  replace = (list: [Profile]) => {
    this.list.forEach(p => (this.selection[p.profile.user] = p.selected));
    this.list.replace(list.map(el => new SelectableProfile(el, this.selection[el.user])));
  };

  @action
  clear = () => {
    this.list.splice(0);
    this.selection = {};
  };

  @action
  deselectAll = () => {
    this.list.forEach((el) => {
      el.selected = false;
    });
  };

  @action
  selectAll = () => {
    this.list.forEach((el) => {
      el.selected = true;
    });
  };

  @action
  switch = (row: SelectableProfile) => {
    if (!this.multiSelect) {
      this.deselectAll();
    }
    row.selected = !row.selected;
  };
}
