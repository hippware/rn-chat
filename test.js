import test from './test/setup';
import RootStore from './src/store/root';
import constitute from './thirdparty/constitute';
import createState, {Statem} from './gen/state';
import {when, autorun} from 'mobx';
import {testDataNew} from './test/support/testuser';
import SocketSCXMLListener from './src/SocketSCXMLListener';
const testUser = testDataNew(2);
//var i = rl.createInterface(process.stdin, process.stdout, null);
const a = {a:1,b:2};
const b = {...a};
const listener = new SocketSCXMLListener();
const root = constitute(RootStore);
const statem: Statem = createState({...root, listener});

statem.start();

global.statem = statem;

when(()=>statem.isIn("PromoScene"), ()=>{
  //statem.success(testUser);
  statem.promoScene.login({user:'30d5853c-3886-11e6-9b7c-0ed7e4a33b15', password:'$T$pbCrIXXsgy5lU50d2jcjwfErjo8yugmMdZWW45UqwfA=',
  host:'testing.dev.tinyrobot.com'})
//   statem.promoScene.login({user:'54f02430-2ca7-11e6-a1b9-0e3188b5612', password:'$T$3Qmc6UELHnBC+iVo13NJSjJAbDKydX997fiKs/VOAUM=',
//     host:'staging.dev.tinyrobot.com'})
//  statem.promoScene.login({user:'7f1f07e0-295e-11e6-8b41-0e304c5d7319', password:'$T$7ZIqZoNZU1qRSmzZjKNmi+7+punN07RYNTTlV+hEyXU=',
//    host:'staging.dev.tinyrobot.com'})
});

when(()=>statem.isIn("DrawerTabs"), ()=>{
  statem.drawerTabs.push();
});

when(()=>statem.isIn("HomeScene"), ()=>{
  statem.homeDefault.def2();
});

when(()=>statem.isIn("HomeSceneDefault2"), ()=>{
  statem.homeDefault2.def3();
});

when(()=>statem.isIn("FriendsSceneDefault"), ()=>{
  statem.friendsSceneDefault.pop();
});

// when(()=>statem.isIn("ChatsScene"), ()=>{
//   statem.cubeBar.drawerTabs();
// });

