import { expect } from 'chai'
import { when, spy } from 'mobx'
import { testDataNew } from './support/testuser'
import * as xmpp from '../src/store/xmpp/xmpp'
import profile from '../src/store/profileStore'
import model from '../src/model/model'
import Profile from '../src/model/Profile'

let user1, user2
describe('xmpp', function () {
    // step("register/login user2", async function(done){
    //   const data = testDataNew(9);
    //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    //   const logged = await xmpp.connect(user, password, server);
    //   user2 = logged.user;
    //   done();
    // });
    // step("logout", async function (done){
    //   await xmpp.disconnect(null);
    //   done();
    // });
    step('register/login user1', async function (done) {
        const data = testDataNew(8)
        const {user, password, server} = await xmpp.register(data.resource, data.provider_data)
        const logged = await profile.connect(user, password, server)
        user1 = logged.user
        done()
    })
    step('update profile', async function (done) {
        model.user = user1
        model.profile = profile.create(user1)
        try {
            await profile.update({handle: 'test8'})
        } catch (e) {
            console.error(e)
        }
        when(() => model.profile && model.profile.handle == 'test8', done)
    })
    // step("upload avatar", async function(done){
    //   let fileName = __dirname + "/img/test.jpg";
    //   try {
    //     let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream(fileName), type: 'image/jpeg'};
    //     let data = {height:300, width:300, size:3801, file};
    //     model.profile.avatar = null;
    //     await profile.uploadAvatar(data);
    //   } catch (e){
    //     console.error(e);
    //   }
    //   when(()=>model.profile && model.profile.avatar && model.profile.avatar.source, ()=>{
    //     try {
    //       console.log("FILE:", model.profile.avatar.source.uri);
    //       var expectBuf = fs.readFileSync(fileName);
    //       var testBuf = fs.readFileSync(model.profile.avatar.source.uri);
    //       expect(expectBuf.toString()).to.be.equal(testBuf.toString());
    //      done();
    //     } catch (e){
    //       console.error(e);
    //     }
    //   });
    // });
    step('remove', function (done) {
        profile.remove()
        when(() => !model.connected, done)
    })

})