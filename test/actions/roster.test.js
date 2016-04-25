import * as actions from '../../src/actions';
import createTestUser, {testData} from '../support/testuser';
import Promise from 'promise';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import {SUCCESS, ERROR, REQUEST_ROSTER} from '../../src/actions';

let authData = [testData(8), testData(9), testData(10)];
let userData = [null, null, null];
let profileData = [null, null, null];
describe("Test XMPP actions actions", function() {
    after(function (done){
        Promise.all(userData.map(a=>UserService.logout(a))).then(res=>{
            done();
        });
    });
    for (let i=0;i<3;i++){
        step("create user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN, ...authData[i] }, { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[i]=data.data},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
                { type: actions.PROFILE+actions.SUCCESS, ignoreothers:true, compare:data=> profileData[i]=data.data},
            ], done);
        });
        step("disconnect user"+i, function(done){
            verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }],done);
        });
    }
    //step("connect user0, #1", function(done) {
    //    verifyAction(actions.login(authData[0]), [{ type: actions.LOGIN, ...authData[0] }, { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
    //        { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
    //    ], done);
    //});
    //step("subscribe user1", function(done) {
    //    verifyAction(actions.subscribe(userData[1].uuid), [{ type: actions.SUBSCRIBE, user: userData[1].uuid}], done);
    //});
    //step("subscribe user2", function(done) {
    //    verifyAction(actions.subscribe(userData[2].uuid), [{ type: actions.SUBSCRIBE, user: userData[2].uuid}], done);
    //});
    //step("logout user0", function(done){
    //    verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }], done);
    //});
    //for (let i=1;i<3;i++){
    //    step("connect user"+i, function(done) {
    //        verifyAction(actions.login(authData[i]),
    //            [
    //                { type: actions.LOGIN, ...authData[i] },
    //                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[i]=data.data},
    //                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
    //
    //            ], done);
    //    });
    //    step("authorize user0", function(done) {
    //        verifyAction(actions.authorize(userData[0].uuid), [{ type: actions.AUTHORIZE, user: userData[0].uuid}], done);
    //    });
    //    step("logout", function(done){
    //        verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }], done);
    //    });
    //}
    step("connect user0, #2", function(done) {
        verifyAction(actions.login(authData[0]), [
            { type: actions.LOGIN, ...authData[0] },
            { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
            { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
            { type: actions.REQUEST_ROSTER+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.length).to.be.equal(0)},
        ], done);
    });

    step("add to roster #1", function(done) {
        verifyAction({type: actions.ADD_ROSTER_ITEM, user:userData[1].uuid, data:profileData[1]}, [
            { type: actions.ADD_ROSTER_ITEM+SUCCESS, ignoreothers:true, dontcompare:true},
        ], done);
    });
    step("add to roster #2", function(done) {
        verifyAction({type: actions.ADD_ROSTER_ITEM, user:userData[2].uuid, data:profileData[2]}, [
            { type: actions.ADD_ROSTER_ITEM+SUCCESS, ignoreothers:true, dontcompare:true},
        ], done);
    });
    step("verify roster", function(done) {
        verifyAction({type: actions.REQUEST_ROSTER}, [
            { type: actions.REQUEST_ROSTER+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.length).to.be.equal(2)},
        ], done);
    });
    step("remove from roster", function(done) {
        verifyAction({type: actions.REMOVE_ROSTER_ITEM, user:userData[2].uuid}, [
            { type: actions.REMOVE_ROSTER_ITEM+SUCCESS, ignoreothers:true, dontcompare:true},
        ], done);
    });
    step("verify roster", function(done) {
        verifyAction({type: actions.REQUEST_ROSTER}, [
            { type: actions.REQUEST_ROSTER+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.length).to.be.equal(1)},
        ], done);
    });
    step("add item to favorites", function(done) {
        verifyAction({type: actions.ADD_ROSTER_TO_FAVORITES, user:userData[1].uuid}, [
            { type: actions.ADD_ROSTER_TO_FAVORITES+SUCCESS, ignoreothers:true, dontcompare:true},
        ], done);
    });
    step("verify roster", function(done) {
        verifyAction({type: actions.REQUEST_ROSTER}, [
            { type: actions.REQUEST_ROSTER+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.length).to.be.equal(1) && expect(data.data[0].isFavorite).to.be.true},
        ], done);
    });
    step("remove item from favorites", function(done) {
        verifyAction({type: actions.REMOVE_ROSTER_FROM_FAVORITES, user:userData[1].uuid}, [
            { type: actions.REMOVE_ROSTER_FROM_FAVORITES+SUCCESS, ignoreothers:true, dontcompare:true},
        ], done);
    });
    step("verify roster", function(done) {
        verifyAction({type: actions.REQUEST_ROSTER}, [
            { type: actions.REQUEST_ROSTER+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.length).to.be.equal(1) && expect(data.data[0].isFavorite).to.be.false},
        ], done);
    });
});

