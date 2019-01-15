import {IContact} from 'wocky-client'

const _searchFilter = (p: IContact, searchFilter: string) => {
  const s = searchFilter && searchFilter.toLowerCase().trim()
  return s && s.length
    ? (p.user.handle && p.user.handle.toLowerCase().startsWith(s)) ||
        (p.user.firstName && p.user.firstName.toLowerCase().startsWith(s)) ||
        (p.user.lastName && p.user.lastName.toLowerCase().startsWith(s))
    : true
}

export const followersSectionIndex = (
  searchFilter: string,
  followers: IContact[],
  newFollowers: IContact[] = []
): object[] => {
  const newFilter = newFollowers.filter(f => _searchFilter(f, searchFilter))
  const followFilter = followers.filter(f => _searchFilter(f, searchFilter)).filter(f => !f.isNew)
  const sections: any[] = []
  if (newFilter.length > 0) sections.push({key: 'new', data: newFilter})
  sections.push({key: 'followers', data: followFilter})
  return sections
}

export const followingSectionIndex = (searchFilter: string, following: IContact[]): object[] => {
  const followFilter = following.filter(f => _searchFilter(f, searchFilter))
  return [{key: 'following', data: followFilter}]
}
