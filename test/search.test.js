import SearchStore from '../src/store/SearchStore';
import {expect} from 'chai';
import {when, spy} from 'mobx';
import NavigationStore from '../src/Scene';

function scene(target, key, descriptor){
  target.addScene(key, descriptor.value);
  console.log("TARGET:", target);
  console.log("KEY:", key);

  console.log("DESC:", descriptor);
  return descriptor;
}

function attach(func){
  console.log(func);
}
const nav = new NavigationStore();
nav.promo.view = (...args)=>console.log("ARGS!!!", ...args);
nav.promo(1,2,3);
nav.state.a = [];
nav.current = nav.current.a;
nav.current.push([1,2,3])
console.log(nav.state);

//console.log(NavigationStore.scenes['promo'].bind(obj)());

// describe("search", function() {
//   step("search", async function(done) {
//     const searchStore = new SearchStore();
//     const data = await searchStore.search("aksono");
//
//     console.log(data);
//
//
//
//   });
// });
