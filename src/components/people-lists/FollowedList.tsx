// @flow

import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import PeopleList from './PeopleList'
import SectionHeader from './SectionHeader'
import {FollowableProfileItem} from './customProfileItems'
import {followingSectionIndex} from '../../utils/friendUtils'
import ListFooter from '../ListFooter'
import PeopleSearchWrapper from './PeopleSearchWrapper'
import InviteFriendsRow from './InviteFriendsRow'

type Props = {
  userId: string
  wocky: any
}

@inject('wocky')
@observer
class FollowedList extends React.Component<Props> {
  @observable searchText: string
  @observable profile: any
  disposer: any

  async componentDidMount() {
    this.profile = await this.props.wocky.getProfile(this.props.userId)
    if (!this.profile) {
      // console.error(`Cannot load profile for user:${this.props.userId}`)
    }
    await this.profile.followed.load()
  }

  render() {
    const {wocky} = this.props
    if (!this.profile) return null
    const following = this.profile.isOwn ? this.props.wocky.followed : this.profile.followed.list
    const followedCount = this.profile.isOwn ? wocky.followed.length : this.profile.followedSize
    const {connected} = wocky
    const {finished, loading} = this.profile.isOwn
      ? {finished: true, loading: false}
      : this.profile.followed
    return (
      <PeopleSearchWrapper>
        <PeopleList
          ListHeaderComponent={<InviteFriendsRow />}
          ListFooterComponent={connected && loading ? <ListFooter finished={finished} /> : null}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          renderSectionHeader={({section}) => (
            <SectionHeader section={section} title="Following" count={followedCount} />
          )}
          sections={followingSectionIndex(this.searchText, following)}
          loadMore={this.profile.followed.load}
        />
      </PeopleSearchWrapper>
    )
  }
}

export default FollowedList
