import {IFriend} from 'wocky-client'

const _searchFilter = (p: IFriend, searchFilter: string) => {
  const s = searchFilter && searchFilter.toLowerCase().trim()
  return s && s.length
    ? (p.user.handle && p.user.handle.toLowerCase().startsWith(s)) ||
        (p.user.firstName && p.user.firstName.toLowerCase().startsWith(s)) ||
        (p.user.lastName && p.user.lastName.toLowerCase().startsWith(s))
    : true
}

export const followingSectionIndex = (searchFilter: string, following: IFriend[]): object[] => {
  const followFilter = following.filter(f => _searchFilter(f, searchFilter))
  return [{key: 'following', data: followFilter}]
}
