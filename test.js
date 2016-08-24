import model from './src/model/model';
import Profile from './src/model/Profile';
import event from './src/store/event';
import {when} from 'mobx';
function merge(target, source) {
  
  /* Merges two (or more) objects,
   giving the last one precedence */
  
  if ( typeof target !== 'object' ) {
    target = {};
  }
  
  for (var property in source) {
    
    if ( source.hasOwnProperty(property) ) {
      
      var sourceProperty = source[ property ];
      
      if ( typeof sourceProperty === 'object' ) {
        target[ property ] =merge( target[ property ], sourceProperty );
        continue;
      }
      
      target[ property ] = sourceProperty;
      
    }
    
  }
  
  for (var a = 2, l = arguments.length; a < l; a++) {
    merge(target, arguments[a]);
  }
  
  return target;
};
console.log(merge({leftButtons:[{a:1,b:2, c:4}]}, {leftButtons:[{c:3}]}));
    event.start();
    model.clear();
    model.events.clear();
    const profile = new Profile("User1");
    profile.isFollower = true;
    model.friends.add(profile);
    when(()=>model.events.list.length === 1, ()=>{
      console.log(model.events._list[0].event);
      event.finish();
      model.clear();
      
    });

// import test from './test/setup';
// import statem from './gen/state';
// import {when, autorun} from 'mobx';
// import {testDataNew} from './test/support/testuser';
// import SocketSCXMLListener from './src/SocketSCXMLListener';
// const testUser = testDataNew(2);
// const listener = new SocketSCXMLListener();
//
// statem.start();
// when(()=>statem.promoScene.active, ()=> {
//   setTimeout(()=>statem.promoScene.signIn(testUser));
// });
//
// when(()=>statem.signUpScene.active, ()=> {
//   setTimeout(()=>statem.signUpScene.register({handle:'test111'}));
// });
//
// when(()=>statem.drawerTabs.active, ()=> {
//   setTimeout(()=>statem.cubeBar.chatsContainer());
// });
//
// when(()=>statem.chatsContainer.active, ()=> {
//   setTimeout(()=>statem.cubeBar.drawerTabs());
//
//   when(()=>statem.drawerTabs.active, ()=> {
//     setTimeout(()=>statem.cubeBar.chatsContainer());
//
//     when(()=>statem.homeContainer.active, ()=> {
//       setTimeout(()=>statem.cubeBar.drawerTabs());
//     });
//   });
// });
//
