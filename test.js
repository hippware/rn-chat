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
}
function clone(obj) {
  if (Array.isArray(obj)){
    return obj.map(x=>clone(x));
  }
  if(obj == null || typeof(obj) != 'object') {
    return obj;
  }
  var temp = new obj.constructor();
  
  for(var key in obj) {
    
    if (obj.hasOwnProperty(key)) {
      if (key != 'state') {
        temp[key] = clone(obj[key]);
      }
    }
  }
  
  return temp;
}
const scene = {leftButtons:[{a:1}]};
const leftButtons = scene.leftButtons;
const newScene = clone(scene);
const target = merge({leftButtons}, newScene);
target.leftButtons[0] = {a:2}
console.log("CLONE:", scene.leftButtons);
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
