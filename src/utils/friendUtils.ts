import {IProfile} from 'wocky-client'

const _searchFilter = (p: IProfile, searchFilter: string) => {
  const s = searchFilter && searchFilter.toLowerCase().trim()
  return s && s.length
    ? (p.handle && p.handle.toLowerCase().startsWith(s)) ||
        (p.firstName && p.firstName.toLowerCase().startsWith(s)) ||
        (p.lastName && p.lastName.toLowerCase().startsWith(s))
    : true
}

export const followersSectionIndex = (
  searchFilter: string,
  followers: IProfile[],
  newFollowers: IProfile[] = []
): object[] => {
  const newFilter = newFollowers.filter(f => _searchFilter(f, searchFilter))
  const followFilter = followers.filter(f => _searchFilter(f, searchFilter)).filter(f => !f.isNew)
  const sections: any[] = []
  if (newFilter.length > 0) sections.push({key: 'new', data: newFilter})
  sections.push({key: 'followers', data: followFilter})
  return sections
}

export const followingSectionIndex = (searchFilter: string, following: IProfile[]): object[] => {
  const followFilter = following.filter(f => _searchFilter(f, searchFilter))
  return [{key: 'following', data: followFilter}]
}
