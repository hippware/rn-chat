import test from './test/setup';
import statem from './gen/state';
import {when, autorun} from 'mobx';
import {testDataNew} from './test/support/testuser';
import SocketSCXMLListener from './src/SocketSCXMLListener';
const testUser = testDataNew(2);
const listener = new SocketSCXMLListener();

statem.start();
when(()=>statem.promoScene.active, ()=> {
  setTimeout(()=>statem.promoScene.signIn(testUser));
});

when(()=>statem.signUpScene.active, ()=> {
  setTimeout(()=>statem.signUpScene.register({handle:'test111'}));
});

when(()=>statem.drawerTabs.active, ()=> {
  setTimeout(()=>statem.cubeBar.chatsContainer());
});

when(()=>statem.chatsContainer.active, ()=> {
  setTimeout(()=>statem.cubeBar.drawerTabs());
  
  when(()=>statem.drawerTabs.active, ()=> {
    setTimeout(()=>statem.cubeBar.chatsContainer());
    
    when(()=>statem.homeContainer.active, ()=> {
      setTimeout(()=>statem.cubeBar.drawerTabs());
    });
  });
});

