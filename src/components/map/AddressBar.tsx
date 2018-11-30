import React from 'react'
import {View, Image, TextInput, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import UseCurrentLocation from './UseCurrentLocation'
import {RText, Separator} from '../common'
import {observable, reaction, computed} from 'mobx'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// import {Actions} from 'react-native-router-flux'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {IHomeStore} from '../../store/HomeStore'
import {formatText} from '../../utils/maps'
import {IBot} from 'wocky-client'

// import {getSnapshot} from 'mobx-state-tree'

type Props = {
  bot: IBot
  edit?: boolean
  geocodingStore?: any
  analytics?: any
  homeStore?: IHomeStore
}

@inject('geocodingStore', 'analytics', 'homeStore')
@observer
class AddressBar extends React.Component<Props> {
  input: any
  @observable text: string = ''
  readonly suggestions = observable.array([])
  @observable searchEnabled: boolean = false
  handler?: () => void
  handler2?: () => void
  wrappedInstance: any // mobx-react property for use by ancestors

  componentDidMount() {
    this.handler = reaction(
      () => ({
        searchEnabled: this.searchEnabled,
        text: this.text,
        loc: this.props.homeStore!.mapCenterLocation,
      }),
      ({searchEnabled, text, loc}) => {
        if (searchEnabled) {
          if (!text) {
            this.suggestions.clear()
          } else if (loc) {
            // log.log('GQUERY:', text, JSON.stringify(loc))
            this.props.geocodingStore.query(text, loc).then(data => {
              this.suggestions.replace(data)
            })
          }
        } else if (loc) {
          this.props.geocodingStore.reverse(loc).then(data => {
            this.text = data.address
          })
        }
      },
      {delay: 500, name: 'AddressBar: update address suggestions on search view'}
    )
  }

  componentWillUnmount() {
    if (this.handler) this.handler()
  }

  onSuggestionSelect = async placeId => {
    const data = await this.props.geocodingStore.details(placeId)
    this.onLocationSelect({...data, isCurrent: false})
  }

  onLocationSelect = async data => {
    const {location} = data
    const {analytics, bot, homeStore} = this.props
    this.searchEnabled = false
    this.text = data.address
    this.input.blur()
    homeStore!.setFocusedLocation(location)
    Actions.botCompose({botId: bot.id})
    analytics.track('botcreate_chooselocation', getSnapshot(bot))
  }

  suggestion = ({item}) => {
    const wrapBold = (text: string, key: string) => (
      <RText key={key} weight="Bold" size={16}>
        {text}
      </RText>
    )

    // have to add unique place id to the key to avoid warning (text could be the same)
    const formatSuggestion = row =>
      formatText(row.main_text, row.main_text_matched_substrings, wrapBold, `${item.place_id}main`)
        .concat(['\n'])
        .concat(
          formatText(
            row.secondary_text,
            row.secondary_text_matched_substrings,
            wrapBold,
            `${item.place_id}second`
          )
        )

    return (
      <TouchableOpacity
        key={`${item.place_id}vjew`}
        onPress={() => this.onSuggestionSelect(item.place_id)}
        hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
      >
        <View style={styles.suggestionRow}>
          <Image
            style={{width: 14, marginRight: 20 * k, marginLeft: 8 * k}}
            source={require('../../../images/iconBotLocationPink.png')}
          />
          <RText
            color={colors.DARK_PURPLE}
            style={{flex: 1, paddingLeft: 5 * k}}
            size={16}
            numberOfLines={2}
          >
            {formatSuggestion(item)}
          </RText>
        </View>
      </TouchableOpacity>
    )
  }

  searchToggleBtn = () =>
    this.searchEnabled && this.text.trim() !== '' ? (
      <TouchableOpacity
        onPress={() => {
          // this.text = botStore.bot.address;
          this.searchEnabled = false
        }}
      >
        <Image
          style={styles.searchToggleButton}
          source={require('../../../images/leftChevronGray.png')}
        />
      </TouchableOpacity>
    ) : (
      <Image
        style={styles.searchToggleButton}
        source={require('../../../images/iconBotLocationPink.png')}
      />
    )

  blur = () => (this.searchEnabled = false)

  @computed
  get showList() {
    return this.searchEnabled && this.text.trim() !== ''
  }

  @computed
  get showCurrentLocation() {
    return this.searchEnabled && this.text.trim() === ''
  }

  render() {
    return (
      <View pointerEvents="box-none" style={{flex: 1, overflow: 'hidden'}}>
        <View style={[this.showList && {flex: 1}]}>
          <View style={styles.searchContainer}>
            {this.searchToggleBtn()}
            <TextInput
              // autoFocus={this.searchEnabled}
              style={styles.textInput}
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="Enter a place or address"
              onChangeText={text => (this.text = text)}
              value={this.text}
              onFocus={() => (this.searchEnabled = true)}
              returnKeyType="search"
              ref={r => (this.input = r)}
            />
          </View>
          <UseCurrentLocation enabled={this.showCurrentLocation} onPress={this.onLocationSelect} />
          {this.searchEnabled && (
            <KeyboardAwareScrollView
              style={{flex: 1, backgroundColor: colors.WHITE}}
              keyboardShouldPersistTaps="always"
            >
              <FlatList
                keyboardShouldPersistTaps="always"
                data={this.suggestions.slice()}
                renderItem={this.suggestion}
                keyExtractor={(item: any) => item.place_id}
                ItemSeparatorComponent={Separator}
              />
            </KeyboardAwareScrollView>
          )}
        </View>
      </View>
    )
  }
}

export default AddressBar

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 44 * minHeight,
    backgroundColor: 'white',
    paddingTop: 11 * k,
    paddingBottom: 13 * k,
    paddingLeft: 14 * k,
    paddingRight: 9 * k,
    borderTopWidth: 1,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.12)',
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5 * k,
    shadowOpacity: 0.12,
    zIndex: 2,
  },
  textInput: {
    flex: 1,
    paddingLeft: 8.4 * k,
    height: 20 * minHeight,
    fontFamily: 'Roboto-Regular',
    color: colors.DARK_PURPLE,
    fontSize: 16,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14 * k,
    paddingTop: 13 * k,
    paddingBottom: 13 * k,
    paddingRight: 16 * k,
    backgroundColor: 'white',
  },
  searchToggleButton: {
    marginLeft: 8 * k,
    marginRight: 5 * k,
  },
})
