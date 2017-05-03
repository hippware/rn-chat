import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {compose, withHandlers} from 'recompose';

import * as colors from '../constants/colors';

import {observer} from 'mobx-react/native';
import Card from './Card';
import location from '../store/locationStore';
import Bot from '../model/Bot';
import statem from '../../gen/state';
import showImagePicker from './ImagePicker';
import botStore from '../store/botStore';

const MenuButton = props => (
    <TouchableOpacity style={styles.menuButton} {...props}>
        <Image source={props.icon} style={props.imageStyle} />
        <Text style={[styles.menuText, {color: props.color}, props.textStyle]}>
            {props.children}
        </Text>
        {props.saving &&
            <Text style={[styles.menuText, {color: DARK_GREY}, props.textStyle]}>Saving...</Text>}
    </TouchableOpacity>
);

const Separator = () => <View style={{width: 1, backgroundColor: 'rgba(155,155,155,0.15)'}} />;

type Props = {
    bot: any,
    addPhoto: Function
};

const TRANS_PINK = colors.hexToRgba(colors.PINK, 0.3);

const BotInfoEditMenu = (props: Props) => {
    const bot: Bot = props.bot;
    const {PINK, DARK_GREY} = colors;
    const color = location.isDay ? PINK : 'white';
    return (
        <Card isDay={location.isDay} style={styles.card}>
            <View style={{flexDirection: 'row', height: 100}}>
                {!!bot.description
                    ? <MenuButton
                        color={DARK_GREY}
                        icon={require('../../images/iconAddnoteGray.png')}
                          // @NOTE: bot: bot.bot is confusing
                        onPress={statem.logged.botNote}
                        saving={bot.noteSaving}
                    >
                          Note
                      </MenuButton>
                    : <MenuButton
                        color={color}
                        icon={require('../../images/iconAddnote.png')}
                        onPress={statem.logged.botNote}
                        saving={bot.noteSaving}
                    >
                          Add Note
                      </MenuButton>}
                <Separator />
                {bot.imagesCount > 0
                    ? <MenuButton
                        color={DARK_GREY}
                        icon={require('../../images/iconAddphotoGrey.png')}
                        onPress={statem.logged.botPhotos}
                        saving={bot.imageSaving}
                    >
                          Photos ({bot.imagesCount})
                      </MenuButton>
                    : <MenuButton
                        color={color}
                        icon={require('../../images/iconAddphoto.png')}
                        onPress={props.addPhoto}
                        saving={bot.imageSaving}
                    >
                          Add Photo
                      </MenuButton>}
                <Separator />
                <MenuButton
                    color={TRANS_PINK}
                    imageStyle={{opacity: 0.3}}
                    icon={require('../../images/iconAddtag.png')}
                >
                    Add Tags
                </MenuButton>
            </View>
        </Card>
    );
};

const enhance = compose(
    observer,
    withHandlers({
        addPhoto: () => () => {
            showImagePicker(null, (source, response) => {
                botStore.publishImage({...response, source});
            });
        },
    })
);

export default enhance(BotInfoEditMenu);

const styles = StyleSheet.create({
    card: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
    },
    menuButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
    },
});
