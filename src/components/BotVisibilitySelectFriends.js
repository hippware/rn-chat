import React from 'react';
import SelectFriends from './SelectFriends';
import Screen from './Screen';
import {TextInput, View} from 'react-native';
import SaveButton from './SaveButton';
import location from '../store/location';
import {k} from './Global';
import search from '../store/search';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import SelectableProfileList from '../model/SelectableProfileList';
import SelectableProfile from '../model/SelectableProfile';
import botStore from '../store/bot';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-native';

@autobind
@observer
export default class extends React.Component {
  @observable selection: SelectableProfileList = search.localResult;
  
  save(){
    botStore.bot.setAffiliates(this.selection.list.filter((selectableProfile: SelectableProfile) => selectableProfile.selected)
      .map((selectableProfile: SelectableProfile) => selectableProfile.profile));
    Actions.pop();
  }
  
  componentWillMount(){
    this.selection.multiSelect = true;
    const isAffiliate = {};
    botStore.bot.affiliates.forEach(profile=>{
      isAffiliate[profile.user] = true;
    });
  
    this.selection.list.forEach((selectableProfile: SelectableProfile) => {
      if (isAffiliate[selectableProfile.profile.user]){
        selectableProfile.selected = true;
      } else {
        selectableProfile.selected = false;
      }
    })
  
  }
  
  render(){
    
    return <Screen isDay={location.isDay}>
      <View style={{paddingTop:70*k, }}>
        <SelectFriends selection={this.selection}/>
        <SaveButton active={!!this.selection.selected.length} onSave={this.save}/>
      </View>
    </Screen>;
  }
}