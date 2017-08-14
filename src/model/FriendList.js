// @flow

import {createModelSchema, list, child} from 'serializr';
import {action, observable, computed} from 'mobx';
import type {IObservableArray} from 'mobx';
import Profile from './Profile';
import assert from 'assert';
import _ from 'lodash';

export default class FriendList {
  @observable _list: IObservableArray<Profile> = [];

  @computed
  get list(): Profile[] {
    return this._list.filter(x => x.handle).sort((a: Profile, b: Profile) => {
      if (a.isMutual && !b.isMutual) {
        return -1;
      }
      if (b.isMutual && !a.isMutual) {
        return 1;
      }
      return a.displayName.toLocaleLowerCase().localeCompare(b.displayName.toLocaleLowerCase());
    });
  }

  @computed
  get length(): number {
    return this._list.length;
  }

  @computed
  get all(): Profile[] {
    return this.list.filter(x => !x.isBlocked && x.isFollowed);
  }

  @computed
  get friends(): Profile[] {
    return this.list.filter(x => !x.isBlocked && x.isFollowed && x.isFollower);
  }

  @computed
  get following(): Profile[] {
    return this.list.filter(x => !x.isBlocked && x.isFollowed);
  }

  @computed
  get nearby(): Profile[] {
    // @TODO
    return this.all;
  }

  @computed
  get followers(): Profile[] {
    return this.list.filter(x => !x.isBlocked && x.isFollower);
  }

  @computed
  get blocked(): Profile[] {
    return this.list.filter(x => x.isBlocked);
  }

  @computed
  get newFollowers(): Profile[] {
    return this.followers.filter(x => x.isNew);
  }

  _searchFilter = (p: Profile, searchFilter: string) => {
    const s = searchFilter && searchFilter.toLowerCase().trim();
    return s && s.length ? p.handle.toLowerCase().startsWith(s) || p.firstName.toLowerCase().startsWith(s) || p.lastName.toLowerCase().startsWith(s) : true;
  };

  alphaSectionIndex = (searchFilter: string): Object[] => {
    const theList = this.all.filter(f => this._searchFilter(f, searchFilter));
    const dict = _.groupBy(theList, p => p.handle.charAt(0).toLocaleLowerCase());
    return Object.keys(dict).sort().map(key => ({key: key.toUpperCase(), data: dict[key]}));
  };

  followersSectionIndex = (searchFilter: string, isOwn: boolean = false): Object[] => {
    const news = this.newFollowers.filter(f => this._searchFilter(f, searchFilter));
    const followers = this.followers.filter(f => this._searchFilter(f, searchFilter)).filter(f => !f.isNew);
    const sections = [];
    if (isOwn && news.length > 0) sections.push({key: 'new', data: _.sortBy(news, ['handle'])});
    sections.push({key: 'followers', data: _.sortBy(followers, ['handle'])});
    return sections;
  };

  followingSectionIndex = (searchFilter: string): Object[] => {
    const following = this.following.filter(f => this._searchFilter(f, searchFilter));
    return [{key: 'following', data: _.sortBy(following, ['handle'])}];
  };

  @action
  add = (profile: Profile): Profile => {
    assert(profile, 'profile should be defined');
    if (!this.get(profile.user)) {
      this._list.push(profile);
    }
    return profile;
  };

  get = (user: string): Profile => {
    const res = this._list.find(el => el.user === user);
    return res;
  };

  @action
  clear = (): void => {
    this._list.forEach(profile => profile.dispose());
    this._list.splice(0);
  };

  @action
  remove = (profile: Profile): void => {
    assert(profile, 'profile is not defined');
    this._list.replace(this._list.filter(el => el.user != profile.user));
  };

  @action
  filter = (profiles: Profile[]) => {
    const map = {};
    profiles.forEach(p => (map[p.user] = 1));
    return this.list.filter(el => map[el.user]);
  };
}

createModelSchema(FriendList, {
  _list: list(child(Profile)),
});
