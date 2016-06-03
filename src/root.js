import RootStore from './store/RootStore';
import constitute from 'constitute';
import {spy, useStrict} from 'mobx';

const store: RootStore = constitute(RootStore);

export default store;
//useStrict(true);
//spy(c => c.type === 'action' && console.log("ACTION:", c.name, store.model.chats.toJSON()));