import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {IWocky, IProfile} from 'wocky-client'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'
import {RText, Pill} from '../common'
import {colors} from 'src/constants'
import {View, StyleSheet} from 'react-native'
import {observable} from 'mobx'
import ConnectButton from './ConnectButton'
import ProfileAvatar from '../ProfileAvatar'
import {minHeight} from '../Global'
import BlockReport from './BlockReport'

type Props = {
  item: string
  refresh?: boolean
  wocky?: IWocky
}

@inject('wocky')
@observer
export default class ProfileDetail extends React.Component<Props> {
  handler: any
  list: any
  @observable profile?: IProfile

  componentWillMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps && nextProps.refresh) {
      this.load()
    }
  }

  load = async () => {
    this.profile = await this.props.wocky!.profiles.get(this.props.item)
    this.props.wocky!.loadProfile(this.props.item)
  }

  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    if (!this.profile || !isAlive(this.profile)) {
      return null
    }
    return (
      <BottomPopup>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            paddingBottom: 46 * minHeight,
            paddingTop: 20,
          }}
        >
          <BlockReport profile={this.profile} />
          <ProfileAvatar
            size={74}
            style={{borderWidth: 0}}
            borderColor={colors.PINK}
            profile={this.profile}
            tappable={false}
            fontFamily="regular"
            fontSize="large"
            hideDot
          />
          <RText
            color={colors.PINK}
            weight="Bold"
            size={20}
            style={styles.displayName}
            numberOfLines={1}
          >
            @{this.profile.handle}
          </RText>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Pill>{this.profile.botsSize} Locations</Pill>
          </View>
          <ConnectButton profile={this.profile!} myProfile={profile!} />
        </View>
      </BottomPopup>
    )
  }
}

const styles = StyleSheet.create({
  displayName: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
})
