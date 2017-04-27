require('./xmpp/strophe');
const Strophe = global.Strophe;
const NS = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__block__';

import { observable, when, action, autorunAsync } from 'mobx';
import profileStore from './profileStore';
import Profile from '../model/Profile';
import model from '../model/model';
import * as xmpp from './xmpp/xmpp';
import assert from 'assert';
import autobind from 'autobind-decorator';
import Utils from './xmpp/utils';
import EventFriend from '../model/EventFriend';

@autobind
export class FriendStore {
    start = () => {
        this.requestRoster();
        if (!this.presenceHandler) {
            //console.log("SUBSCRIBE TO PRESENCE");
            this.presenceHandler = xmpp.presence.onValue(this.onPresence);
        }
    };

    finish = () => {};

    @action onPresence = stanza => {
        //console.log("FriendStore.onPresence");
        const user = Utils.getNodeJid(stanza.from);
        if (stanza.type === 'subscribe') {
            // new follower
            const profile: Profile = profileStore.create(user);
            if (profile.isBlocked) {
                console.log('IGNORE BLOCKED USER:', profile.user);
                return;
            }
            profile.isFollower = true;
            profile.isNew = true;
            // add to new group
            this.addToRoster(profile); //, NEW_GROUP);
            // authorize
            this.authorize(profile.user);
            // add to the model
            model.friends.add(profile);
        } else if (stanza.type === 'subscribed') {
            // new followed
            const profile: Profile = profileStore.create(user, {
                isFollowed: true,
                isNew: true
            });
            // add to roster
            this.addToRoster(profile); //, NEW_GROUP);
            // add to the model
            model.friends.add(profile);
        } else if (stanza.type == 'unavailable' || stanza.type === 'available' || !stanza.type) {
            const profile: Profile = profileStore.create(user);
            //console.log("UPDATE STATUS", stanza.type)
            profile.status = stanza.type || 'available';
        }
    };

    @action requestRoster = async () => {
        assert(model.user, 'Model user should not be null');
        assert(model.server, 'Model server should not be null');
        const iq = $iq({
            type: 'get',
            to: model.user + '@' + model.server
        }).c('query', { xmlns: NS });
        //console.log("AWAIT ROSTER REQUEST");
        try {
            const stanza = await xmpp.sendIQ(iq);
            //console.log("RECEIVE ROSTER:", stanza);
            let children = stanza.query.item;
            if (children && !Array.isArray(children)) {
                children = [children];
            }
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    const {
                        first_name,
                        handle,
                        last_name,
                        avatar,
                        jid,
                        group,
                        subscription,
                        ask
                    } = children[i];
                    // ignore other domains
                    if (Strophe.getDomainFromJid(jid) != model.server) {
                        continue;
                    }
                    const user = Strophe.getNodeFromJid(jid);
                    const profile: Profile = profileStore.create(user, {
                        first_name,
                        last_name,
                        handle,
                        avatar,
                        isNew: group === NEW_GROUP,
                        isBlocked: group === BLOCKED_GROUP,
                        isFollowed: subscription === 'to' ||
                            subscription === 'both' ||
                            ask === 'subscribe',
                        isFollower: subscription === 'from' || subscription === 'both'
                    });
                    //console.log("ADD PROFILE:", JSON.stringify(profile));
                    model.friends.add(profile);
                }
            }
        } catch (error) {
            console.log('ROSTER ERROR:', error);
        }
    };

    /**
     * Send 'subscribe' request for given user
     * @param username username to subscribe
     */
    subscribe(username) {
        console.log('SUBSCRIBE::::', username);
        xmpp.sendPresence({
            to: username + '@' + model.server,
            type: 'subscribe'
        });
    }

    /**
     * Send 'subscribed' request for given user
     * @param username user to send subscribed
     */
    authorize(username) {
        xmpp.sendPresence({
            to: username + '@' + model.server,
            type: 'subscribed'
        });
    }

    /**
     * unsubscribe from the user's with username presence
     * @param username username to unsubscribe
     */
    unsubscribe(username) {
        xmpp.sendPresence({
            to: username + '@' + model.server,
            type: 'unsubscribe'
        });
    }

    /**
     * Unauthorize the user with username to subscribe to the authenticated user's presence
     * @param username username to unauthorize
     */
    unauthorize(username) {
        xmpp.sendPresence({
            to: username + '@' + model.server,
            type: 'unsubscribed'
        });
    }

    addToRoster(profile: Profile, group = '') {
        const iq = $iq({ type: 'set', to: model.user + '@' + model.server })
            .c('query', { xmlns: NS })
            .c('item', { jid: profile.user + '@' + model.server })
            .c('group')
            .t(group);
        xmpp.sendIQ(iq);
    }

    @action add = (profile: Profile) => {
        this.addToRoster(profile);
        this.subscribe(profile.user);
        profile.isFollowed = true;
        model.friends.add(profile);
    };

    @action addAll = (profiles: [Profile]) => {
        for (let profile of profiles.map(x => x)) {
            this.add(profile);
        }
    };

    async addByHandle(handle) {
        const profile: Profile = await profileStore.lookup(handle);
        this.add(profile);
    }

    @action unfollow = (profile: Profile) => {
        assert(profile, 'Profile is not defined to remove');
        this.addToRoster(profile);
        const user = profile.user;
        this.unsubscribe(user);
        profile.isFollowed = false;
    };

    @action block = (profile: Profile) => {
        profile.isBlocked = true;
        profile.isNew = false;
        this.addToRoster(profile, BLOCKED_GROUP);
    };

    @action unblock = (profile: Profile) => {
        profile.isBlocked = false;
        profile.isNew = false;
        this.addToRoster(profile);
    };

    @action follow = (profile: Profile) => {
        profile.isBlocked = false;
        profile.isFollowed = true;
        this.subscribe(profile.user);
        this.addToRoster(profile);
    };

    removeFromRoster(profile: Profile) {
        const user = profile.user;
        const iq = $iq({ type: 'set', to: model.user + '@' + model.server })
            .c('query', { xmlns: NS })
            .c('item', {
                jid: user + '@' + model.server,
                subscription: 'remove'
            });
        xmpp.sendIQ(iq);
    }
}

export default new FriendStore();
