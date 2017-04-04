import React from 'react'
import SelectFriends from './SelectFriends'
import Screen from './Screen'
import { TextInput, View } from 'react-native'
import SaveButton from './SaveButton'
import location from '../store/locationStore'
import { k } from './Global'
import search from '../store/searchStore'
import { observer } from 'mobx-react/native'
import { observable } from 'mobx'
import SelectableProfileList from '../model/SelectableProfileList'
import SelectableProfile from '../model/SelectableProfile'
import botStore from '../store/botStore'
import model from '../model/model'
import autobind from 'autobind-decorator'
import { Actions } from 'react-native-router-native'
import Bot, { VISIBILITY_PUBLIC, VISIBILITY_OWNER, VISIBILITY_WHITELIST } from '../model/Bot'

@autobind
@observer
export default class extends React.Component {
    @observable selection: SelectableProfileList

    save () {
        botStore.bot.shareSelect = this.selection.list.filter((selectableProfile: SelectableProfile) => selectableProfile.selected)
            .map((selectableProfile: SelectableProfile) => selectableProfile.profile)
        Actions.pop()
    }

    componentWillMount () {
        this.selection = new SelectableProfileList(
            botStore.bot.visibility === VISIBILITY_WHITELIST ? model.friends.filter(botStore.bot.affiliates) : model.friends.friends)
        this.selection.multiSelect = true
        const isAffiliate = {}
        botStore.bot.shareSelect.forEach(profile => {
            isAffiliate[profile.user] = true
        })

        this.selection.list.forEach((selectableProfile: SelectableProfile) => {
            if (isAffiliate[selectableProfile.profile.user]) {
                selectableProfile.selected = true
            } else {
                selectableProfile.selected = false
            }
        })

    }

    render () {

        return <Screen isDay={location.isDay}>
            <View style={{paddingTop: 70 * k, flex: 1}}>
                <SelectFriends selection={this.selection}/>
            </View>
            <SaveButton active={!!this.selection.selected.length} onSave={this.save}/>
        </Screen>
    }
}