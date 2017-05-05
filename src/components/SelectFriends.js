import React, {Component} from 'react';
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text, InteractionManager} from 'react-native';
import assert from 'assert';
import Profile from '../model/Profile';
import SelectableProfile from '../model/SelectableProfile';
import Screen from './Screen';
import File from '../model/File';
import Card from './Card';
import Header from './Header';
import Separator from './Separator';
import {k} from './Global';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import SearchStore from '../store/searchStore';
import SelectableProfileList from '../model/SelectableProfileList';
import ProfileList from './ProfileList';
import ProfileItem from './ProfileItem';
import Button from 'react-native-button';
import location from '../store/locationStore';
import search from '../store/searchStore';
import message from '../store/messageStore';
import statem from '../../gen/state';
import {Actions} from 'react-native-router-native';
import {observer} from 'mobx-react/native';
import SaveButton from './SaveButton';

@observer
export default class SelectFriends extends Component {
    static backButton = ({state, style, textButtonStyle}) => (
        <TouchableOpacity onPress={() => InteractionManager.runAfterInteractions(state.parent.pop)} style={style}>
            <Text style={textButtonStyle}>Cancel</Text>
        </TouchableOpacity>
    );

    render() {
        const selection = this.props.selection;
        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 44 * k,
                        backgroundColor: 'white',
                        shadowOpacity: 0.12,
                        shadowRadius: 5,
                        shadowOffset: {height: 1, width: 0},
                    }}
                >
                    <View style={{paddingLeft: 19 * k, paddingRight: 10 * k}}>
                        <Image source={require('../../images/iconSearch.png')} />
                    </View>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={text => (selection.filter = text)}
                        value={selection.filter}
                        placeholder='Search name or username'
                        placeholderColor='rgb(155,155,155)'
                        style={{
                            fontSize: 15 * k,
                            fontFamily: 'Roboto-Regular',
                            height: 44 * k,
                            flex: 1,
                        }}
                        clearButtonMode='while-editing'
                    />
                </View>
                <ProfileList selection={selection} isDay={location.isDay} />
            </View>
        );
        //    Send Message to {selection.selected.length} Friend{selection.selected.length > 1 ? 's' : ''}
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        height: 60 * k,
        backgroundColor: 'rgb(254,92,108)',
        shadowOpacity: 0.09,
        shadowRadius: 6,
        shadowOffset: {height: -2, width: 0},
    },
});
/*
 ProfileList.defaultProps = {
 selection: [
 new SelectableProfile(Profile.mock("user1", {firstName: "Pavel", lastName: "Aksonov", avatar: File.mock(require('../../images/test1.png'))}), true),
 new SelectableProfile(Profile.mock("user2", {firstName: "Olena", lastName: "Aksonova", avatar: File.mock(require('../../images/test2.png'))}), false)
 ],
 isDay: true,
 }
 */
