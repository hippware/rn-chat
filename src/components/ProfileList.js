import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import assert from 'assert';
import Profile from '../model/Profile';
import SelectableProfile from '../model/SelectableProfile';
import Screen from './Screen';
import File from '../model/File';
import CardList from './CardList';
import Separator from './Separator';
import {k} from '../globals';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import ProfileItem from './ProfileItem';
import {observer} from "mobx-react/native";

@observer
class SelectableProfileItem extends Component {
  render(){
    const {row, isDay, selection, onSelect} = this.props;
    assert(selection, "selection should be defined");
    return <TouchableOpacity onPress={()=>onSelect ? onSelect(row.profile) : selection.switch(row)}>
      <ProfileItem key={row.profile.user} isDay={isDay} profile={row.profile} selected={onSelect ? undefined : row.selected}/>
    </TouchableOpacity>;


  }
}

@observer
export default class ProfileList extends Component {
  render() {
    const {selection, isDay, onSelect} = this.props;
    assert(selection, "selection should be defined");
    const dataSource = ds.cloneWithRows(selection.list.map(x=>x));
    return <View style={{flex:1}}>
      {!selection.list.length && <Text
        style={{fontSize:15, textAlign:'center', backgroundColor:'transparent', paddingTop: 200*k, color:'rgb(185,185,185)', fontFamily:'Roboto-Regular'}}>No search results</Text>}
      {!!selection.list.length && <CardList isDay={isDay} keyboardShouldPersistTaps
                  enableEmptySections={true}
                  dataSource={dataSource}
                  renderSeparator={(s,r) => <Separator key={r} width={1}/>}
                  renderRow={row =>
                    <SelectableProfileItem key={row.profile.user+"row"} row={row} selection={selection}  isDay={isDay} onSelect={onSelect}
                    />}
        />}
    </View>;
  }
}

ProfileList.propTypes = {
  selection: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  isDay: React.PropTypes.bool.isRequired,
};


/*
ProfileList.defaultProps = {
  selection: [
    new SelectableProfile(Profile.mock("user1", {firstName: "Pavel", lastName: "Aksonov", avatar: File.mock(require('../../images/test1.png'))}), true),
    new SelectableProfile(Profile.mock("user2", {firstName: "Olena", lastName: "Aksonova", avatar: File.mock(require('../../images/test2.png'))}), false)
  ],
  isDay: true,
}
*/
