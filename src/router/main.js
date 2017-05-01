import React from 'react';

import Promo from '../components/Promo';
import SideMenu from '../components/SideMenu';
import CreateMessage from '../components/CreateMessage';
import Launch from '../components/Launch';
import SignUp from '../components/SignUp';
import SignUpIntro from '../components/SignUpIntro';
import TermsOfService from '../components/TermsOfService';
import PrivacyPolicy from '../components/PrivacyPolicy';
import BotAddressScene from '../components/BotAddressScene';
import BotNoteScene from '../components/BotNoteScene';
import BotPhotoScene from '../components/BotPhotoScene';
import BotInfo from '../components/BotInfo';
import BotCreate from '../components/BotCreate';
import BotDetails from '../components/BotDetails';
import BotMap from '../components/BotMap';
import {settings} from '../globals';
import BotPhotoList from '../components/BotPhotoList';
import BotShareSelectFriends from '../components/BotShareSelectFriends';
import BotShareCompleted from '../components/BotShareCompleted';
import BotSubscriberList from '../components/BotSubscriberList';
import BotPhotoGridScene from '../components/BotPhotoGridScene';
import ProfileDetail from '../components/ProfileDetail';

import {Actions, Scene} from 'react-native-router-native';

import statem from '../../gen/state';

// import SocketSCXMLListener from './SocketSCXMLListener';
// statem.listeners.push(new SocketSCXMLListener());
statem.start();

const dayNavBar = {
    navBarTextColor: 'rgb(63,50,77)',
    navBarRightButtonColor: 'rgb(254,92,108)',
    navBarLeftButtonColor: 'rgb(155,155,155)',
    navBarCancelColor: 'rgb(155,155,155)',
    navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)',
    navBarBackgroundColor: 'white',
    navBarButtonFontSize: 15,
    backgroundColor: 'white',
    navBarFontFamily: 'Roboto-Regular',
};

const menuButton = {
    icon: require('../../images/iconMenu.png'),
    badgeMinSize: 2,
    badgeFontSize: 2,
    badgeFontFamily: 'Roboto-Medium',
    testID: 'leftNavButton',
    badgeOriginX: 27,
    badgeOriginY: 1,
    badgeBGColor: 'rgb(254,92,108)',
    onPress: () => Actions.get('drawer').ref.toggle({side: 'left', animated: true}),
};

import cubeScene from './cube';

export default (
    <Scene
        key='nav'
        hideNavBar
        style={{
            ...dayNavBar,
            backButtonImage: require('../../images/iconBackGrayNew.png'),
            navBarNoBorder: true,
            disableIconTint: true,
            navBarFontFamily: 'Roboto-Regular',
            navBarFontSize: 18,
        }}
    >
        <Scene key='root' tabs hideTabBar>
            <Scene key='launch' component={Launch} default hideNavBar />
            <Scene key='promo' component={Promo} state={statem.promoScene} hideNavBar />
            <Scene key='signUp' component={SignUp} state={statem.signUpScene} hideNavBar />
            <Scene key='signUpIntro' component={SignUpIntro} state={statem.signUpIntro} hideNavBar />
            <Scene
                key='drawer'
                hideNavBar
                leftButton={menuButton}
                state={statem.logged}
                drawer
                componentLeft={SideMenu}
                style={{contentOverlayColor: '#162D3D55'}}
            >
                {cubeScene}
            </Scene>
        </Scene>
        <Scene
            key='botContainer'
            modal
            navTransparent
            state={statem.createBot}
            style={{backgroundColor: 'transparent'}}
            leftButton={{
                icon: require('../../images/iconClose.png'),
                onPress: Actions.pop,
            }}
        >
            <Scene key='botCreate' component={BotCreate} />
            <Scene key='botInfo' component={BotInfo} state={statem.botInfo} navTransparent />
        </Scene>

        <Scene key='botEdit' component={BotInfo} edit state={statem.botEdit} clone navTransparent />
        <Scene key='botPhotos' clone state={statem.botPhotos} component={BotPhotoGridScene} title='Photos' />
        <Scene
            key='botSubscriberList'
            component={BotSubscriberList}
            edit
            state={statem.botSubscriberList}
            clone
            navTransparent
            title='Subscribers'
        />
        <Scene key='botAddress' clone navTransparent component={BotAddressScene} state={statem.botAddress} />
        <Scene key='botNote' clone navTransparent component={BotNoteScene} state={statem.botNote} modal />
        <Scene
            key='botShareSelectFriends'
            clone
            navTransparent
            state={statem.botShareSelectFriends}
            component={BotShareSelectFriends}
            title='Select Friends'
        />
        <Scene key='botShareCompleted' lightbox component={BotShareCompleted} style={{backgroundBlur: 'none'}} />
        <Scene key='botPhoto' clone navTransparent component={BotPhotoScene} state={statem.botPhoto} />
        <Scene key='botPhotoList' clone navTransparent state={statem.botPhotoList} component={BotPhotoList} />

        <Scene
            key='createMessage'
            modal
            component={CreateMessage}
            title='Select Friend'
            state={statem.selectFriends}
            leftButton={{
                icon: require('../../images/iconClose.png'),
                onPress: Actions.pop,
            }}
        />
        <Scene key='privacyPolicy' lightbox component={PrivacyPolicy} />
        <Scene key='termsOfService' lightbox component={TermsOfService} />
        <Scene
            key='profileDetail'
            state={statem.profileDetailsContainer}
            component={ProfileDetail}
            rightButtonImage={require('../../images/iconOptions.png')}
            clone
            navTransparent
        />
        <Scene key='botDetails' state={statem.botDetails} hideNavBar clone component={BotDetails} />

        <Scene key='botMap' state={statem.botMap} hideNavBar component={BotMap} clone />

    </Scene>
);
