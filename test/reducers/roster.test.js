import expect from 'expect'
import genreducer from '../../src/reducers/roster';
import * as roster from '../../src/actions';

function reducer(state, action){
    const iterable = genreducer(state, action);
    let done = false;
    let value;
    while (!done){
        const next = iterable.next();
        done = next.done;
        value = next.value;
    }
    return value;
}

describe('roster reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({roster:[],filter: 'SET_ROSTER_FILTER_ALL',list:[]})
    });

    it('should return roster list', () => {
        let list = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2'}];
        expect(
            reducer(undefined, roster.rosterReceived(list))
        ).toEqual({filter: 'SET_ROSTER_FILTER_ALL',roster:list, list})
    });

    it('presenceUpdateReceived should update status for presence because user is in roster', () => {
        let list = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        let list2 = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2', status:'available'}];
        expect(
            reducer(state, roster.presenceUpdateReceived('user2', 'available'))
        ).toEqual({filter: 'SET_ROSTER_FILTER_ALL',roster:list2, list:list2})
    });

    it('removeRoster should not update roster for non-exist user', () => {
        let list = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        expect(
            reducer(state, roster.removeRosterItem('user3'))
        ).toEqual({filter: 'SET_ROSTER_FILTER_ALL',roster:list, list})
    });

    it('removeRoster should update roster for existing users', () => {
        let list = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2'}];
        let state = reducer(undefined, roster.rosterReceived(list));
        let list2 = [{username:'user2', displayName:'user2'}];
        expect(
            reducer(state, roster.removeRosterItem('user1'))
        ).toEqual({filter: 'SET_ROSTER_FILTER_ALL',roster:list2, list:list2})
    });

    it('change filter', () => {
        let list = [{username:'user1'}, {username:'user2', isFavorite:true}];
        let listFull = [{username:'user1', displayName:'user1'}, {username:'user2', displayName:'user2', isFavorite:true}];
        let state = reducer(undefined, roster.rosterReceived(list));
        let list2 = [{username:'user2', displayName:'user2', isFavorite:true}];
        expect(
            reducer(state, {type: roster.SET_ROSTER_FILTER_FAVS})
        ).toEqual({filter: 'SET_ROSTER_FILTER_FAVS',roster:listFull, list:list2})
    });

    //it('subscriptionRequest should update roster for non-exist user', () => {
    //    let list = [{username:'user1'}, {username:'user3'}];
    //    let state = reducer(undefined, roster.rosterReceived(list));
    //    expect(
    //        reducer(state, roster.subscribe('user2'))
    //    ).toEqual({roster:[{username:'user1'}, {username:'user2'}, {username:'user3'}]})
    //});
    //
    //it('subscriptionRequest  should not update roster for existing users', () => {
    //    let list = [{username:'user1'}, {username:'user2'}, {username:'user3'}];
    //    let state = reducer(undefined, roster.rosterReceived(list));
    //    expect(
    //        reducer(state, roster.subscribe('user2'))
    //    ).toEqual({roster:list})
    //});

});