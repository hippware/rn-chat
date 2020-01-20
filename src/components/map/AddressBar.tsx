import React, {useRef, useState} from 'react'
import {View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {inject} from 'mobx-react'
import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import UseCurrentLocation from './UseCurrentLocation'
import {RText, RTextInput, Separator} from '../common'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {IHomeStore} from '../../store/HomeStore'
import {formatText} from '../../utils/maps'
import {IBot} from 'wocky-client'
import {observer} from 'mobx-react'
import _ from 'lodash'

type Props = {
  bot: IBot
  geocodingStore?: any
  analytics?: any
  homeStore?: IHomeStore
  isActive?: boolean
}

const getSuggestions = _.debounce(
  (text, loc, query, after) => {
    query(text, loc).then(data => {
      after(data)
    })
  },
  500,
  {maxWait: 600}
)

const AddressBar = inject(
  'geocodingStore',
  'analytics',
  'homeStore'
)(
  observer(({geocodingStore, analytics, homeStore, bot, isActive}: Props) => {
    const input = useRef<TextInput>(null)
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchEnabled, setSearchEnabled] = useState<boolean>(isActive!)

    async function onSuggestionSelect(placeId) {
      const data = await geocodingStore.details(placeId)
      onLocationSelect({...data, isCurrent: false})
    }

    async function onLocationSelect({location, address, placeName}) {
      setSearchEnabled(false)
      setText(address)
      input.current!.blur()
      homeStore!.setFocusedLocation(location)

      // leave time for the map animate to the location
      if (bot) {
        setTimeout(() => {
          Actions.botCompose({botId: bot.id, title: placeName})
          analytics.track('botcreate_chooselocation', getSnapshot(bot))
        }, 1000)
      }
    }

    function suggestion({item}) {
      const wrapBold = (t: string, key: string) => (
        <RText key={key} weight="Bold" size={16}>
          {t}
        </RText>
      )

      // have to add unique place id to the key to avoid warning (text could be the same)
      const formatSuggestion = row =>
        formatText(
          row.main_text,
          row.main_text_matched_substrings,
          wrapBold,
          `${item.place_id}main`
        )
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
          onPress={() => onSuggestionSelect(item.place_id)}
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

    const searchToggleBtn = () =>
      searchEnabled && text.trim() !== '' ? (
        <TouchableOpacity
          onPress={() => {
            // text = botStore.bot.address;
            setSearchEnabled(false)
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

    return (
      <View pointerEvents="box-none" style={{flex: 1, overflow: 'hidden'}}>
        <View style={[searchEnabled && text.trim() !== '' && {flex: 1}]}>
          <View style={styles.searchContainer}>
            {searchToggleBtn()}
            <RTextInput
              autoFocus={searchEnabled}
              style={styles.textInput}
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="Enter a place or address"
              onChangeText={t => {
                setText(t)
                getSuggestions(
                  t,
                  homeStore!.mapCenterLocation,
                  geocodingStore!.query,
                  setSuggestions
                )
              }}
              value={text}
              onFocus={() => setSearchEnabled(true)}
              returnKeyType="search"
              ref={input}
              selectionColor={colors.COVER_BLUE}
            />
          </View>
          <UseCurrentLocation
            enabled={searchEnabled && text.trim() === ''}
            onPress={onLocationSelect}
          />
          {searchEnabled && (
            <KeyboardAwareScrollView
              style={{flex: 1, backgroundColor: colors.WHITE}}
              keyboardShouldPersistTaps="always"
            >
              <FlatList
                keyboardShouldPersistTaps="always"
                data={suggestions}
                renderItem={suggestion}
                keyExtractor={(item: any) => item.place_id}
                ItemSeparatorComponent={Separator}
              />
            </KeyboardAwareScrollView>
          )}
        </View>
      </View>
    )
  })
)
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
    paddingTop: 0,
    paddingBottom: 0,
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
