import {Profile} from 'wocky-client'
import * as log from '../utils/log'
import _ from 'lodash'

const _searchFilter = (p: Profile, searchFilter: string) => {
  const s = searchFilter && searchFilter.toLowerCase().trim()
  return s && s.length
    ? (p.handle && p.handle.toLowerCase().startsWith(s)) ||
        (p.firstName && p.firstName.toLowerCase().startsWith(s)) ||
        (p.lastName && p.lastName.toLowerCase().startsWith(s))
    : true
}

export const alphaSectionIndex = (searchFilter: string, list: Profile[]): Object[] => {
  const theList = list.filter(f => _searchFilter(f, searchFilter))
  const dict = _.groupBy(theList, p => p.handle.charAt(0).toLocaleLowerCase())
  return Object.keys(dict)
    .sort()
    .map(key => ({key: key.toUpperCase(), data: dict[key]}))
}

export const followersSectionIndex = (
  searchFilter: string,
  followers: Profile[],
  newFollowers: Profile[] = []
): Object[] => {
  const newFilter = newFollowers.filter(f => _searchFilter(f, searchFilter))
  const followFilter = followers.filter(f => _searchFilter(f, searchFilter)).filter(f => !f.isNew)
  const sections = []
  if (newFilter.length > 0) sections.push({key: 'new', data: newFilter})
  sections.push({key: 'followers', data: followFilter})
  return sections
}

export const followingSectionIndex = (searchFilter: string, following: Profile[]): Object[] => {
  const followFilter = following.filter(f => _searchFilter(f, searchFilter))
  return [{key: 'following', data: followFilter}]
}
