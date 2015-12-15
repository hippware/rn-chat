import expect from 'expect'
import reducer from '../../src/reducers/roster';
import * as roster from '../../src/actions/xmpp/roster';
import * as xmpp from '../../src/actions/xmpp/xmpp';

describe('roster reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({roster:[]})
    });

    it('should return roster list', () => {
        let list = [{username:'user1'}, {username:'user2'}];
        expect(
            reducer(undefined, roster.rosterReceived(list))
        ).toEqual({roster:list})
    });

    it('presenceUpdateReceived should update status for presence and sort the list', () => {
        let list = [{username:'user1'}, {username:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        expect(
            reducer(state, roster.presenceUpdateReceived('user3'))
        ).toEqual({roster:[{username:'user3', status:'online'},{username:'user1'}, {username:'user2'}]})
    });

    it('presenceUpdateReceived should update status for presence because user is in roster', () => {
        let list = [{username:'user1'}, {username:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        let list2 = [{username:'user1'}, {username:'user2', status:'available'}];
        expect(
            reducer(state, roster.presenceUpdateReceived('user2', 'available'))
        ).toEqual({roster:list2})
    });

    it('removeRoster should not update roster for non-exist user', () => {
        let list = [{username:'user1'}, {username:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        expect(
            reducer(state, roster.removeRosterItemRequest('user3'))
        ).toEqual({roster:list})
    });

    it('removeRoster should update roster for existing users', () => {
        let list = [{username:'user1'}, {username:'user2'}, {username:'user3'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        let list2 = [{username:'user1'}, {username:'user3'}];
        expect(
            reducer(state, roster.removeRosterItemRequest('user2'))
        ).toEqual({roster:list2})
    });

    it('subscriptionRequest should update roster for non-exist user', () => {
        let list = [{username:'user1'}, {username:'user3'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        expect(
            reducer(state, roster.requestSubscribe('user2'))
        ).toEqual({roster:[{username:'user1'}, {username:'user2'}, {username:'user3'}]})
    });

    it('subscriptionRequest  should not update roster for existing users', () => {
        let list = [{username:'user1'}, {username:'user2'}, {username:'user3'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        expect(
            reducer(state, roster.requestSubscribe('user2'))
        ).toEqual({roster:list})
    });

});