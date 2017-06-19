import model from '../src/model/model';
import searchStore from '../src/store/searchStore';
import {expect} from 'chai';
import {when, spy} from 'mobx';

describe('search', function () {
  // temporary disable it
  // step("search", async function(done) {
  //   try {
  //     const data = await searchStore.search("alic");
  //     expect(data.hits.length).to.be.equal(1);
  //     expect(data.hits[0].handle).to.be.equal("alice");
  //     done();
  //   } catch (e){
  //     console.error(e);
  //   }
  //
  //
  //
  // });
});
