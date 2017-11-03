// @flow

import SelectableProfile from './SelectableProfile';
import Profile from './Profile';
import {action, reaction, computed, observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class SelectableProfileList {
  original: IObservableArray<Profile> = [];
  @observable list: IObservableArray<SelectableProfile> = [];
  @observable filter: string = '';
  multiSelect: boolean = true;
  selection = {};

  @computed
  get selected(): Profile[] {
    return this.list.filter(el => el.selected).map(el => el.profile);
  }

  @computed
  get allSelected(): boolean {
    return this.list.filter(el => el.selected).length === this.list.length;
  }

  @computed
  get filteredList(): SelectableProfile[] {
    return this.list.length ? this.list.filter(this._filterFn) : [];
  }

  constructor(list?: ?(Profile[]), multiSelect?: boolean = true) {
    if (list) {
      this.replace(list);
      this.original = list;
    }
    this.multiSelect = multiSelect;
  }

  _filterFn = (el) => {
    const {isOwn, firstName, lastName, handle} = el.profile;
    return (
      !isOwn &&
      (!this.filter ||
        (firstName && firstName.toLocaleLowerCase().startsWith(this.filter.toLocaleLowerCase())) ||
        (lastName && lastName.toLocaleLowerCase().startsWith(this.filter.toLocaleLowerCase())) ||
        (handle && handle.toLocaleLowerCase().startsWith(this.filter.toLocaleLowerCase())))
    );
  };

  @action
  replace = (list: Profile[]): void => {
    this.list.forEach(p => (this.selection[p.profile.user] = p.selected));
    this.list.replace(list.map(el => new SelectableProfile(el, this.selection[el.user])));
  };

  @action
  clear = (): void => {
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
  switchRowSelected = (row: SelectableProfile) => {
    !this.multiSelect && this.deselectAll();
    row.selected = !row.selected;
  };
}
