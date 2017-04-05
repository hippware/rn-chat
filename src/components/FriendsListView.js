import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import FilterBar from './FilterBar';
import model from '../model/model';
import assert from 'assert';
import BotButton from './BotButton';
import FriendCard from './FriendCard';
import Button from 'react-native-button';
import Separator from './Separator';
import location from '../store/locationStore';
import Card from './Card';
import Header from './Header';
import {observer} from "mobx-react/native";

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

@observer
export default class FriendsList extends Component {
    renderSectionHeader(sectionData, sectionID) {
        const isDay = location.isDay;
        return (
            <Card isDay={isDay} innerStyle={{shadowOffset: {height: 0, width: 0}, shadowRadius: 0, shadowOpacity: 0}}
                  style={{
                      paddingRight: 0,
                      paddingLeft: 0,
                      paddingTop: sectionID === 'Following' ? 12 : 0,
                      paddingBottom: 0,
                  }}>
                <Header>{sectionID}</Header>
                <Separator width={1}/>
            </Card>
        )
    }

    render() {

        const isDay = location.isDay;
        const list = this.props.filter === "all" ? model.friends.friends.map(x => x) : model.friends.nearby.map(x => x);
        const following = model.friends.following.map(x => x);
        this.dataSource = ds.cloneWithRowsAndSections({Friends: list, Following: following}, ['Friends', 'Following']);
        return <Screen isDay={isDay} style={{paddingTop: 70 * k}}>
            <FilterBar isDay={isDay} style={{paddingLeft: 15 * k, paddingRight: 15 * k}}
                       onSelect={data => Actions.refresh({filter: data.key})}
                       selected={this.props.filter}>
                <Text key="all">All</Text>
                <Image key="add" onSelect={() => Actions.addFriends()}
                       source={require("../../images/iconAddFriend.png")}></Image>
            </FilterBar>
            {!!model.friends.followers.length &&
            <View>
                {!!model.friends.newFollowers.length && <TouchableOpacity style={styles.newButton}
                                                                          onPress={() => Actions.followers({filter: 'newFollowers'})}>
                    <Text style={styles.text}>You have {model.friends.newFollowers.length} new
                        follower{model.friends.newFollowers.length > 1 ? 's' : ''}</Text>
                    <Text style={styles.italicText}>Follow back so you can message them</Text>
                </TouchableOpacity>}
                {!model.friends.newFollowers.length &&
                <Button containerStyle={styles.button} onPress={() => Actions.followers()} style={styles.text}>
                    You have {model.friends.followers.length} Follower{model.friends.followers.length > 1 ? 's' : ''}
                </Button>}
                <Separator/>
            </View>}
            {!model.friends.followers.length && !!model.friends.blocked.length &&
            <View>
                <Button containerStyle={styles.button} onPress={Actions.blocked} style={styles.text}>
                    {model.friends.blocked.length} Blocked
                </Button>
                <Separator/>
            </View>}
            {list.length + following.length > 0 &&
            <Card style={{flex: 1}} isDay={isDay} innerStyle={{flex: 1, backgroundColor: 'transparent'}}>
                <ListView ref="list" scrollEventThrottle={1} {...this.props}
                          dataSource={this.dataSource}
                          enableEmptySections={true}
                          renderSectionHeader={this.renderSectionHeader}
                          renderSeparator={(s, r) => <Separator key={s + r + 'sep'} width={1}/>}
                          renderFooter={ () => <View style={{height: 40}}/>}
                          renderRow={(row, s) => <FriendCard key={row.user + s} isDay={isDay} profile={row}/>}>
                </ListView>
            </Card>}
            <BotButton/>
        </Screen>;
    }
}

FriendsList.defaultProps = {
    filter: 'all',
};

const styles = StyleSheet.create({
    button: {
        right: 0, left: 0, alignItems: 'center', justifyContent: 'center', marginTop: 8 * k, marginBottom: 8 * k,
        height: 40 * k, backgroundColor: 'rgb(155,155,155)', shadowOpacity: 0.12, shadowRadius: 5,
        shadowOffset: {height: 1, width: 0}
    },
    newButton: {
        right: 0, left: 0, alignItems: 'center', justifyContent: 'center', marginTop: 8 * k, marginBottom: 8 * k,
        height: 66 * k, backgroundColor: 'rgba(254,92,108,0.9)', shadowOpacity: 0.12, shadowRadius: 5,
        shadowOffset: {height: 1, width: 0}
    },
    text: {color: 'white', letterSpacing: 0.7, fontSize: 15, fontFamily: 'Roboto-Regular', textAlign: 'center'},
    italicText: {color: 'white', letterSpacing: 0.7, fontSize: 15, fontFamily: 'Roboto-Italic', textAlign: 'center'}
});


