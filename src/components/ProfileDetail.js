import React, {Component} from 'react';
import {TouchableOpacity, Image, ScrollView, Alert, View, Text} from 'react-native';
import Screen from './Screen';
import ProfileInfo from './ProfileInfo';
import ProfileAvatar from './ProfileAvatar';
import Card from './Card';
import CellWithText from './CellWithText';
import Separator from './Separator';
import friendStore from '../store/friendStore';
import Profile from '../model/Profile';
import model from '../model/model';
import message from '../store/messageStore';
import location from '../store/locationStore';
import profileStore from '../store/profileStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import Bots from '../model/Bots';
import {k} from './Global';
import {navBarTextColorDay, navBarTextColorNight} from '../constants/colors';
import botStore from '../store/botStore';
import NavBar from './NavBar';
import NavTitle from './NavTitle';
import NavBarRightButton from './NavBarRightButton';
import BotListView from './BotListView';
import autobind from 'autobind-decorator';

@autobind
@observer
export default class ProfileDetail extends Component {
    @observable bots = new Bots();
    // static onRight({item, title}) {
    //   Actions.profileOptions({item, title});
    // }
    static title({item}) {
        return <Text>{item.firstName} {item.lastName}</Text>;
    }

    async componentDidMount() {
        if (this.props.item) {
            await botStore.list(this.bots, this.props.item);
        }
    }

    render() {
        const isDay = location.isDay;
        const profile: Profile = profileStore.create(this.props.item);
        return (
            <Screen isDay={isDay}>
                <View style={{paddingTop: 70 * k}}>
                    <BotListView
                        ref='list'
                        list={this.bots}
                        user={this.props.item}
                        header={() => (
                            <Card
                                isDay={isDay}
                                style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 0,
                                }}
                            >
                                <ProfileAvatar size={100} isDay={isDay} profile={profile} tappable={false} />
                                <Text
                                    style={{
                                        padding: 10 * k,
                                        fontFamily: 'Roboto-Regular',
                                        fontSize: 16 * k,
                                        color: navBarTextColorDay,
                                        textAlign: 'center',
                                    }}
                                >
                                    {profile.displayName}
                                </Text>
                            </Card>
                        )}
                    />
                </View>
                <NavBar>
                    <NavTitle onPress={() => this.refs.list.scrollToTop()}>@{profile.handle}</NavTitle>
                    {profile.isOwn && <NavBarRightButton active><Image source={require('../../images/settings.png')} /></NavBarRightButton>}
                </NavBar>
            </Screen>
        );
    }
}

ProfileDetail.propTypes = {
    item: React.PropTypes.any.isRequired,
};
