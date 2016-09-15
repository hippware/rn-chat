import SearchStore from '../src/store/search';
import {expect} from 'chai';
import {when, spy} from 'mobx';
//import NavigationStore from '../src/Scene';

// function scene(target, key, descriptor){
//   target.addScene(key, descriptor.value);
//   console.log("TARGET:", target);
//   console.log("KEY:", key);
//
//   console.log("DESC:", descriptor);
//   return descriptor;
// }
//
// function attach(func){
//   console.log(func);
// }
// const nav = new NavigationStore();
// class NavigationView extends NavigationStore {
//
// }
// const view = new NavigationView();
// nav.promo.view = (...args)=>console.log("ARGS!!!", ...args);
// nav.promo(1,2,3);
//
// nav.profileDetail.view =  (navState)=>console.log("ARGS!!!", navState);
// nav.state.a = [];
// nav.current = nav.current.a;
// nav.current.push([1,2,3])
// console.log(nav.state);
// const a = "AAA";
// console.log(typeof a);
//console.log(NavigationStore.scenes['promo'].bind(obj)());

describe("search", function() {
  step("search", async function(done) {
    const searchStore = new SearchStore();
    const data = await searchStore.search("aksono");

    console.log(data);
    done();



  });
});
